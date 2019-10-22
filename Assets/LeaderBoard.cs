using System;
using TMPro;
using UnityEngine;

[Serializable]
public class Types
{
    public string TypeName;
    public int[] scores;
}

public class LeaderBoard : MonoBehaviour
{
    public Types[] types;
    public TextMeshProUGUI[] hexaValue;
    int index = 0;

    public TextMeshProUGUI Title;
    
    public void Next()
    {
        index++;
        LoadCurrentType(index);
    }

    public void Previous()
    {
        index--;
        LoadCurrentType(index);
    }

    void LoadCurrentType(int i)
    {
        Title.text = types[i].TypeName;
        for (int x = 0; x < hexaValue.Length; x++)
        {
            hexaValue[x].text = types[i].scores[x].ToString();
        }
    }
}
