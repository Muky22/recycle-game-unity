using DG.Tweening;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CollidersMovement : MonoBehaviour
{
    bool canAnim = true;
   
    
    private void OnTriggerStay2D(Collider2D collision)
    {
       
        if (Drag.isDragging == false && canAnim == true)
        {
            canAnim = false;
            RotateScript.canLevi = false;
            Vector2 colliderScale = new Vector2(GetComponent<BoxCollider2D>().size.x, GetComponent<BoxCollider2D>().size.x);
            collision.GetComponent<BoxCollider2D>().size = colliderScale;

            RotateScript.canSetLeviToFalse = false;
            Transform item = collision.transform.GetChild(0).GetComponent<Transform>();
            item.DOScale(new Vector3(colliderScale.x, colliderScale.y, colliderScale.x), 1f);
            collision.transform.DOMoveX(transform.position.x, 1f).OnComplete(() =>
            {
                collision.transform.DOMoveY(transform.position.y - 2, 3f);
            });
        }
    }
}
