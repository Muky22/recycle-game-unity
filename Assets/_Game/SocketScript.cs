using SocketIO;
using System.Collections;
using System.Collections.Generic;
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

    public SocketScript()
    {
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
        });

        socket.On("initXpChange", (data) =>
        {
            Debug.Log(data);
            Camera.main.GetComponent<GameManager>().perc = int.Parse(data.data["perc"].ToString()) / 100f;
            Camera.main.GetComponent<GameManager>().AddXp();
        });

        socket.On("xpChange", (data) =>
        {
            Debug.Log(data);
            Camera.main.GetComponent<GameManager>().perc = int.Parse(data.data["perc"].ToString()) / 100f;
            Camera.main.GetComponent<GameManager>().AddXp();
        });

        socket.On("initLevelChange", (data) =>
        {
            // GameManager.level = data.data[""]
            Camera.main.GetComponent<GameManager>().level = int.Parse(data.data["level"].ToString());
            Camera.main.GetComponent<GameManager>().SetValues();
            Debug.Log(data.data["level"].ToString());
        });

        socket.On("levelChange", (data) =>
        {
            // GameManager.level = data.data[""]
            Camera.main.GetComponent<GameManager>().level = int.Parse(data.data["level"].ToString());
            Camera.main.GetComponent<GameManager>().SetValues();
            Debug.Log(data.data["level"].ToString());
        });

        socket.On("requestItemRes", (data) =>
        {
            string tag = data.data["item"].ToString().Replace("\"", "");

            foreach (ItemV2 item in Camera.main.GetComponent<GameManager>().Items)
            {
                if (item.tag.Equals(tag))
                {
                    GameObject objToSpawn = item.obj;
                    Camera.main.GetComponent<GameManager>().ChooseItem(objToSpawn);

                    break;
                }
            }
        });

        socket.On("answerItemRes", (data) =>
        {
            Debug.Log(data);

            socket.Emit("requestItem");
        });

        socket.On("globalQuestChanged", (data) =>
        {
            Debug.Log(data);
            GameManager GM = Camera.main.GetComponent<GameManager>();

            int progress = int.Parse(data.data["progress"].ToString());
            progress = progress > 1000000 ? 1000000 : progress;

            GM.questNumb.text = progress + "/1 000 000";
            GM.questPerc.text = Mathf.Round(((progress / 1000000f) * 100)).ToString() + "%";
            GM.globalQuestFillBar.fillAmount = progress / 1000000f;
        });

        socket.On("getGlobalQuestRes", (data) =>
        {
            Debug.Log(data);
            GameManager GM = Camera.main.GetComponent<GameManager>();
            GM.questNumb.text = data.data["progress"].ToString() + "/1 000 000";
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

        Debug.Log("Server " + answer);
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
}
