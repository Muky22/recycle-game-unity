using System;
using SocketIO;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using DG.Tweening;
using TMPro;
using UnityEngine;
using static GameManager;

public class SocketScript
{
    private static SocketScript i = null;

    public static SocketScript GetInstance()
    {
        if(i == null)
        {
            i = new SocketScript();
        }

        return i;
    }

    private SocketIOComponent socket = null;


    private GameManager GM;
    private int lastLevelAnimated = -1;

    public SocketScript()
    {
        GM = Camera.main.GetComponent<GameManager>();
        
        GameObject go = GameObject.Find("SocketIO");
        socket = go.GetComponent<SocketIOComponent>();
        socket.On("connect", (data) =>
        {
            Debug.Log("Connected");
            SocketScript.GetInstance().Login();
        });

        socket.On("autoAuthRes", (data) =>
        {
            string nick = data.data["nick"].ToString();
            PlayerPrefs.SetString("nick", nick);

            socket.Emit("requestItem");
            
            
            socket.Emit("getNick");
            socket.Emit("getHash");
        });
        
        socket.On("getNickRes", (data) =>
        {
            string nick = data.data["nick"].ToString().Replace("\"", "");
            GM.nickText.text = nick;
        });
        
        socket.On("getHashRes", (data) =>
        {
            string hash = data.data["hash"].ToString().Replace("\"", "");
            GM.hashText.text = "#" + hash;
        });

        socket.On("initXpChange", (data) =>
        {
            Debug.Log(data);
            GM.perc = int.Parse(data.data["perc"].ToString()) / 100f;
            GM.DoXpBarFill();
        });

        socket.On("xpChange", (data) =>
        {
            Debug.Log(data);
            GM.perc = int.Parse(data.data["perc"].ToString()) / 100f;
            GM.DoXpBarFill();
        });

        socket.On("initLevelChange", (data) =>
        {
            // GameManager.level = data.data[""]
            GM.level = int.Parse(data.data["level"].ToString());
            GM.SetValues();

            lastLevelAnimated = int.Parse(data.data["level"].ToString());
        });

        socket.On("levelChange", (data) =>
        {
            // GameManager.level = data.data[""]
            GM.level = int.Parse(data.data["level"].ToString());
            GM.SetValues();
            
            int level = int.Parse(data.data["level"].ToString());

            if (level != lastLevelAnimated)
            {
                lastLevelAnimated = level;

                GameObject GMO = GM.levelHexagonObj;
                
                
                GMO.transform.DOKill();
                GMO.transform.localScale = new Vector3(1f, 1f, 1f);
                GMO.transform.DOScale(new Vector3(1.4f, 1.4f, 1.4f), 0.1f).OnComplete(() =>
                {
                    GMO.transform.DOScale(new Vector3(1f, 1f, 1f), 0.2f);
                });
            }
        });

        socket.On("requestItemRes", (data) =>
        {
            string tag = data.data["item"].ToString().Replace("\"", "");

            foreach (ItemV2 item in GM.Items)
            {
                if (item.tag.Equals(tag))
                {
                    GameObject objToSpawn = item.obj;
                    GM.ChooseItem(objToSpawn);

                    break;
                }
            }

            GM.itemText.transform.DOScale(new Vector3(0f, 0f, 0f), 0.2f).OnComplete(() =>
                {
                    GM.itemText.GetComponent<TextMeshProUGUI>().text = FirstLetterToUpper(tag).Replace("_", " ");

                    GM.itemText.transform.DOScale(new Vector3(1f, 1f, 1f), 0.4f);
                });
        });

        socket.On("answerItemRes", (data) =>
        {

            socket.Emit("requestItem");
        });

        socket.On("globalQuestChanged", (data) =>
        {
            int progress = int.Parse(data.data["progress"].ToString());
            progress = progress > 1000000 ? 1000000 : progress;

            GM.questNumb.text = progress + "/1 000 000";
            GM.questPerc.text = Mathf.Round(((progress / 1000000f) * 100)).ToString() + "%";
            GM.globalQuestFillBar.fillAmount = progress / 1000000f;
        });

        socket.On("getGlobalQuestRes", (data) =>
        {
            Debug.Log(data);
            
            var nfi = (NumberFormatInfo)CultureInfo.InvariantCulture.NumberFormat.Clone();
            nfi.NumberGroupSeparator = " ";
            Double total = Double.Parse(data.data["progress"].ToString());
            string formatted = total.ToString("#,0", nfi);
            
            GM.questNumb.text =  formatted + " / 1 000 000";
            GM.questPerc.text = Mathf.Round(((int.Parse(data.data["progress"].ToString()) / 1000000f) * 100)).ToString() + "%";
            GM.globalQuestFillBar.fillAmount = int.Parse(data.data["progress"].ToString()) / 1000000f;
        });
    }

    public void Login()
    {
        Dictionary<string, string> data = new Dictionary<string, string>();
        data["devId"] = SystemInfo.deviceUniqueIdentifier;
        data["nick"] = PlayerPrefs.GetString("nick", "Anonymous");
        socket.Emit("autoAuth", new JSONObject(data));
    }

    public void answerItem(string answer)
    {
        Dictionary<string, string> data = new Dictionary<string, string>();
        data["answer"] = answer;
        socket.Emit("answerItem", new JSONObject(data));
    }

    public void OpenGlobalQuest()
    {
        socket.Emit("getGlobalQuest");
        socket.Emit("enableGlobalQuest");
    }

    public void CloseGlobalQuest()
    {
        socket.Emit("disableGlobalQuest");
    }
    
    public string FirstLetterToUpper(string str)
    {
        if (str == null)
            return null;

        if (str.Length > 1)
            return char.ToUpper(str[0]) + str.Substring(1);

        return str.ToUpper();
    }
}
