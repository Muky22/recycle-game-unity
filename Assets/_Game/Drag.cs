using DG.Tweening;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Drag : MonoBehaviour
{
    private void OnMouseDrag()
    {
        Vector2 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
        transform.position = mousePos;
        RotateScript.canLevi = false;
    }

    private void OnMouseUp()
    {
        RotateScript.canAnim = true;
        RotateScript.canLevi = true;
    }


    void GetLine()
    {
        Debug.Log("plast");
    }
}
