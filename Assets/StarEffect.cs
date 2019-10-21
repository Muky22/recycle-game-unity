using System;
using DG.Tweening;
using UnityEngine;
using Random = UnityEngine.Random;

public class StarEffect : MonoBehaviour
{
    private void Start()
    {
        Vector3 res = Camera.main.ScreenToWorldPoint(new Vector3(Screen.width, Screen.height, 0));
        float borderedWidth = res.x + 1.0f;
        
        float rand = Random.Range(0f, 1f);
        bool isRight = rand > 0.5f;
        
        Vector3 startPos = new Vector3(0,0, 93);
        Vector3 endPos = new Vector3(0,0, 93);

        float randomY = Random.Range(-1.5f, 2.5f);
        float randomEndY = randomY - Random.Range(1f, 4f);
        
        if (isRight)
        {
            startPos = new Vector3(-borderedWidth, randomY, 93);
            endPos = new Vector3(borderedWidth, randomEndY, 93);
        }
        else
        {
            startPos = new Vector3(borderedWidth, randomY, 93);
            endPos = new Vector3(-borderedWidth, randomEndY, 93);
        }

        transform.position = startPos;
        transform.DOKill();
        transform.DOMove(endPos, 1f).OnComplete(() => { Destroy(this.gameObject); });
    }
}
