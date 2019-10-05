using DG.Tweening;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Drag : MonoBehaviour
{
    Vector2 mouseStartPos,dragObjStartPos;
    public static bool isDragging = false;

    bool wasDragging = false;

    public LayerMask layerM,collidersLayer;
    
    
    private void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
           
            Vector2 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            RaycastHit2D hit = Physics2D.Raycast(mousePos, new Vector3(0, -0.01f, 0), 0.5f);

            if (hit.collider != null)
            {
                
                Debug.Log(hit.collider.transform.name);
                transform.DOScale(new Vector3(0.25f, 0.25f, 0.25f), 1f);
                mouseStartPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
                isDragging = true;
                dragObjStartPos = transform.position;
                wasDragging = true;
                RotateScript.canLevi = false;
            }
        }
        else if (Input.GetMouseButtonUp(0))
        {
            if (wasDragging == true)
            {
                wasDragging = false;
                /*
                RotateScript.canAnim = true;
                RotateScript.canLevi = true;
                RotateScript.canSetLeviToFalse = true;*/
                TowardsBin();


            }
            isDragging = false;
           
        }
        
        if (isDragging)
        {
            Vector2 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            RaycastHit2D hit = Physics2D.Raycast(mousePos, new Vector3(0, -0.01f, 0), 0.5f,collidersLayer);
      
            if (hit.collider != null)
            {
               
                transform.DOMoveX(hit.transform.position.x, 1f);
               
            }
            
        }

        
    }

    void TowardsBin()
    {
        transform.DOMoveY(-5, 1f);
    }
}
