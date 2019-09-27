using UnityEngine;
using DG.Tweening;

public class RotateScript : MonoBehaviour
{
    public float speed,leviTime;

    public float yVal;

    public Ease ease;

    public static bool canLevi = true;
    public static bool canAnim = true;

    
    void Update()
    {
        SetPosToParentPos();
        Rotation();
        if (canLevi == true && canAnim == true)
        {
            canAnim = false;
            Levitation(canLevi);
        }

        if (canLevi == false)
        {
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
            transform.position = transform.parent.transform.position;
        }
    }
}
