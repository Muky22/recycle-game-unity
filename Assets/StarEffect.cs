using DG.Tweening;
using UnityEngine;

public class StarEffect : MonoBehaviour
{
    public Vector3 pos;

    private void Start()
    {
        transform.DOMove(pos, 1f);
    }
}
