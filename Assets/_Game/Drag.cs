using DG.Tweening;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Drag : MonoBehaviour
{
    Vector2 mouseStartPos,dragObjStartPos;
    public static bool isDragging = false;

    bool wasDragging = false;

    public LayerMask layerM;
    
    
    private void Update()
    {
       
        if (Input.GetMouseButtonDown(0))
        {
            
            mouseStartPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            RaycastHit2D hit = Physics2D.Raycast(mouseStartPos, new Vector3(0,-0.5f,0),layerM);
            Debug.DrawRay(mouseStartPos, new Vector3(0, -0.5f, 0));
            if (hit.collider != null)
            {
                if (hit.collider.tag == "Item")
                {
                    isDragging = true;
                    dragObjStartPos = transform.position;
                    wasDragging = true;
                    RotateScript.canLevi = false;
                }
            }
          
        }
        else if (Input.GetMouseButtonUp(0))
        {
            if (wasDragging == true)
            {
                wasDragging = false;
                RotateScript.canAnim = true;
                RotateScript.canLevi = true;
                RotateScript.canSetLeviToFalse = true;

               
            }
            isDragging = false;
           
        }
        
        if (isDragging)
        {
           
            Vector2 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
           
            Vector2 dir = mousePos - mouseStartPos;
            transform.position = dragObjStartPos + dir;

        }
    }
}
