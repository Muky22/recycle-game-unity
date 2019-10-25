using DG.Tweening;
using System;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

[Serializable]
public class Board
{
    public string boardName;
    public List<Player> players;
}

[Serializable]
public class Player
{
    public string nick;
    public int score;
}

public class LeaderBoard : MonoBehaviour
{
    public List<Board> boards = new List<Board>();
    public TextMeshProUGUI[] hexaValue,scoreText;
    int index = 0;

    public TextMeshProUGUI Title;

    

    public void LoadLeaderboardStats()
    {
        SocketScript.GetInstance().GetLeaderboard();
    }
   

    public void SetDataToFields(SocketIO.SocketIOEvent dataLB)
    {

        foreach (JSONObject board in dataLB.data["boards"].list)
        {
            String boardTitle = board["title"].str;

            Board b = new Board();
            b.boardName = boardTitle;
            b.players = new List<Player>();

            foreach (JSONObject player in board["players"].list)
            {
                String playerNick = player["nick"].str;
                int playerVal = (int) player["value"].n;

                Player p = new Player();
                p.nick = playerNick;
                p.score = playerVal;

                b.players.Add(p);
            }
            boards.Add(b);
        }
        LoadCurrentBoard(0);
    }

    public void Next()
    {
        if (index < boards.Count - 1)
        {
            index++;
            LoadCurrentBoard(index);
        }
       
    }

    public void Previous()
    {
        if (index > 0)
        {
            index--;
            LoadCurrentBoard(index);
        }
    }

    void LoadCurrentBoard(int i)
    {
        Title.text = boards[i].boardName;
        for (int x = 0; x < hexaValue.Length; x++)
        {
            hexaValue[x].text = boards[i].players[x].nick;
            scoreText[x].text = boards[i].players[x].score.ToString();
        }
    }
}
