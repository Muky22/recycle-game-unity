using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class ProfileScript : MonoBehaviour
{
    public TextMeshProUGUI levelText;
    public TextMeshProUGUI questsText;
    public TextMeshProUGUI glassText;
    public TextMeshProUGUI plasticText;
    public TextMeshProUGUI ewasteText;
    public TextMeshProUGUI paperText;
    public TextMeshProUGUI mixedText;
    public TextMeshProUGUI metalText;
    public TextMeshProUGUI masterText;
    
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void SetStats(String level, String quests, String glass, String plastic, String ewaste, String paper, String mixed, String metal, String master)
    {
        levelText.text = level;
        questsText.text = quests;
        glassText.text = glass;
        plasticText.text = plastic;
        ewasteText.text = ewaste;
        paperText.text = paper;
        mixedText.text = mixed;
        metalText.text = metal;
        masterText.text = master;
    }
}
