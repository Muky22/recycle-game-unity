using SocketIO;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

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

        socket.On("autoAuthRes", (data) =>
        {
            Debug.Log(data);
        });
    }

    public void Login()
    {
        Dictionary<string, string> data = new Dictionary<string, string>();
        data["devId"] = SystemInfo.deviceUniqueIdentifier;
        data["nick"] = PlayerPrefs.GetString("nick", "Anonymous");
        socket.Emit("autoAuth", new JSONObject(data));
    }
}
