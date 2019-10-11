using UnityEngine;
using DG.Tweening;

public class RotateScript : MonoBehaviour
{
    public float speed, leviTime;

    public static bool canLevi = true;
    public static bool canKillTransform = false;

    public float yVal;
   
    private void Start()
    {
        speed = 100;
        yVal = 0.55f;
        leviTime = .8f;
    }
    
    void Update()
    {
        Rotation();
        Levitation();
    }

    void Levitation()
    {
        if (canLevi == true)
        {
            canLevi = false;
            transform.DOMoveY(yVal, leviTime).SetEase(Ease.Linear).OnComplete(() =>
            {
                transform.DOMoveY(0, leviTime).SetEase(Ease.Linear).OnComplete(() =>
                {
                    canLevi = true;
                });
            });
        }
        else
        {
            if (canKillTransform == true)
            {
                canKillTransform = false;
                transform.DOKill();
            }
        }
    }
    
    
    void Rotation()
    {
        transform.Rotate(new Vector3(0, 1, 0) * speed * Time.deltaTime);
    }
   
}
