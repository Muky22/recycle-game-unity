using UnityEngine;
using DG.Tweening;

public class RotateScript : MonoBehaviour
{
    public float speed,leviTime;

    public float yVal;

    Ease ease;

    public static bool canLevi = true;
    public static bool canAnim = true;

    public static bool canSetLeviToFalse = true;

    private void Start()
    {
        ease = Ease.Linear;
        speed = 100;
        yVal = 0.55f;
        leviTime = 0.75f;
    }

    void Update()
    {
        SetPosToParentPos();
        Rotation();
        if (canLevi == true && canAnim == true)
        {
            canAnim = false;
            Levitation(canLevi);
        }

        if (canLevi == false && canSetLeviToFalse == true)
        {
            canSetLeviToFalse = false;
            transform.DOKill();
        }
    }
    
    void Levitation(bool on_Off)
    {
        if (on_Off == true)
        {
            transform.DOMoveY(transform.position.y + yVal, leviTime).SetEase(ease).OnComplete(() =>
            {
                transform.DOMoveY(transform.position.y - yVal, leviTime).SetEase(ease).OnComplete(() =>
                {
                    Levitation(canLevi);
                });
            });
        }
    }

    void Rotation()
    {
        transform.Rotate(new Vector3(0, 1, 0) * speed * Time.deltaTime);
    }

    void SetPosToParentPos()
    {
        if (canLevi == false)
        {
            transform.position = Vector3.Lerp(transform.position, transform.parent.transform.position,0.1f) ;
        }
    }
}
