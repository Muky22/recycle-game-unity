using System.Collections;
using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;
using UnityEngine.UI;

public class AnswerEffectScript : MonoBehaviour
{
    public GameObject canvas;

    public Image img;
    // Start is called before the first frame update
    void Start()
    {
        canvas.SetActive(true);
    }

    public void ShowCorrect()
    {
        img.color = new Color(0f, 1f, 0f, 0f);
        img.DOKill();
        img.DOColor(new Color(0f, 1f, 0f, 0.1f), 0.5f).OnComplete(() =>
        {
            img.DOKill();
            img.DOColor(new Color(0f, 1f, 0f, 0.0f), 0.3f);
        });
    }
    
    public void ShowWrong()
    {
        img.color = new Color(1f, 0f, 0f, 0f);
        img.DOKill();
        img.DOColor(new Color(1f, 0f, 0f, 0.1f), 0.5f).OnComplete(() =>
        {
            img.DOKill();
            img.DOColor(new Color(1f, 0f, 0f, 0.0f), 0.3f);
        });
    }
}
