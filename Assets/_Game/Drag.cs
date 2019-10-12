using DG.Tweening;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class Drag : MonoBehaviour
{
    public GameManager GM;

    public Color alpha;
   
    List<GameObject> lineHitColors = new List<GameObject>();
    GameObject oldLine;

    private Boolean isDragging = false;
    private float dragInitPosX;
    private float force = 1.2f;

    private int lastI = -1;
    
    private void Update()
    {
        DragControl();
    }

    void DragControl()
    {
        if (Input.GetMouseButtonDown(0))
        {
            // once, left click
            float currentPosY = Camera.main.ScreenToWorldPoint(Input.mousePosition).y;
            float currentPosX = Camera.main.ScreenToWorldPoint(Input.mousePosition).x;
            float screenWidth = (Camera.main.ScreenToWorldPoint(new Vector2(Screen.width, Screen.height)).x);
            float leftEdge = screenWidth * -1f;
            
            if (GM.hasItem && !IsPointerOverUiObject())
            {
                isDragging = true;
                dragInitPosX = Camera.main.ScreenToWorldPoint(Input.mousePosition).x;

                GM.currentItem.transform.DOScale(new Vector3(
                        GM.finalScale.x * 0.6f,
                        GM.finalScale.x * 0.6f,
                        GM.finalScale.x * 0.6f),
                    1.5f);
            }
            
        }
        
        
        if (isDragging)
        {
            if (Input.GetMouseButton(0))
            {
                // is holding left
                float currentPosX = Camera.main.ScreenToWorldPoint(Input.mousePosition).x;
                float diff = currentPosX - dragInitPosX;
                diff *= force;

                float screenWidth = (Camera.main.ScreenToWorldPoint(new Vector2(Screen.width, Screen.height)).x) * 2;
                float lineWidth = screenWidth / 6f;

                float leftEdge = (screenWidth/2f) * -1f;
                
                for (int i = 0; i < 6; i++)
                {
                    if (diff >= leftEdge + lineWidth * i && diff <= leftEdge + lineWidth * (i + 1f))
                    {
                        // correct line

                        if (lastI == -1 || lastI != i)
                        {
                            if (lastI != -1)
                            {
                                GameObject lastObj = GM.col[lastI];
                                lastObj.GetComponent<SpriteRenderer>().DOKill();
                                lastObj.GetComponent<SpriteRenderer>().DOFade(0f, 0.2f);
                            }
                            
                            lastI = i;

                            GameObject obj = GM.col[i];
                            obj.GetComponent<SpriteRenderer>().DOKill();
                            obj.GetComponent<SpriteRenderer>().DOFade(0.2f, 0.4f);

                            GM.currentItem.transform.DOMove(new Vector3(
                                obj.transform.position.x,
                                GM.currentItem.transform.position.y,
                                GM.currentItem.transform.position.z
                            ), 0.4f);

                        }
                        
                        break;
                    }
                }
            }
            else
            {
                // no longer holding left
                isDragging = false;

                if (lastI != -1)
                {
                    GameObject lastObj = GM.col[lastI];
                    lastObj.GetComponent<SpriteRenderer>().DOKill();
                    lastObj.GetComponent<SpriteRenderer>().DOFade(0f, 0.3f);

                    GameObject itemToDestroy = GM.currentItem;

                    GM.currentItem.transform.DOMoveY(-6f, 0.5f).OnComplete(() => { Destroy(itemToDestroy); });
                    
                   
                    String tag = "bug";

                    switch (lastI)
                    {
                        case 0:
                            tag = "Green";
                            break;
                        case 1:
                            tag = "Yellow";
                            break;
                        case 2:
                            tag = "Red";
                            break;
                        case 3:
                            tag = "Blue";
                            break;
                        case 4:
                            tag = "Black";
                            break;
                        case 5:
                            tag = "Orange";
                            break;
                    }
                            
                    SocketScript.GetInstance().answerItem(tag);
                    GM.hasItem = false;
                }
            }
        }
    }

    bool IsPointerOverUiObject()
    {
        PointerEventData eventDataCurrPos = new PointerEventData(EventSystem.current);
        eventDataCurrPos.position = new Vector2(Input.mousePosition.x, Input.mousePosition.y);
        List<RaycastResult> results = new List<RaycastResult>();
        EventSystem.current.RaycastAll(eventDataCurrPos, results);
        return results.Count > 0;
    }

    /*
void DragControll()
{
    if (!IsPointerOverUiObject() && canDrag == true)
    {
       
        if (Input.GetMouseButtonDown(0))
        {
            Vector2 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            RaycastHit2D hit = Physics2D.Raycast(mousePos, new Vector3(0, -0.01f, 0), 0.5f);
         
            if (hit.collider != null)
            {
                RotateScript.canLevi = false;
                RotateScript.canKillTransform = true;
                startPosX = hit.collider.transform.position.x;
            }
            else
            {
                return;
            }
        }
        else if (Input.GetMouseButtonUp(0))
        {
            canClick = false;
            if (isDragging == false)
            {
                canDrag = false;
                transform.DOMoveX(startPosX, 0.5f).OnComplete(() =>
                {
                   
                    MoveTowardsY();
                });
            }
            else
            {
                Vector2 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
                RaycastHit2D hit = Physics2D.Raycast(mousePos, new Vector3(0, -0.01f, 0), 0.5f);
                isDragging = false;
                if (hit.collider != null)
                {
                    transform.DOKill();
                    canDrag = false;
                    transform.DOMoveX(hit.collider.transform.position.x, 0.5f).OnComplete(() =>
                    {
                       
                        MoveTowardsY();
                    });
                }
            }

        }

        if (Input.GetMouseButton(0))
        {
            Vector2 mousePos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            RaycastHit2D hit = Physics2D.Raycast(mousePos, new Vector3(0, -0.01f, 0), 0.5f);
            ShowBgLine(hit);
            if (hit.collider != null)
            {
                float distance = mousePos.x - startPosX;
                if (distance < 0)
                {
                    distance *= -1;
                }
                if (distance > 0.1f)
                {
                    isDragging = true;
                    
                    transform.DOKill();
                    transform.DOMoveX(hit.collider.transform.position.x, 0.5f);
                }

            }

        }
        
    }
    
  
}


void MoveTowardsY()
{
    transform.DOKill();
    transform.DOScale(new Vector3(0.2f, 0.2f, 0.2f),0.4f);
    transform.DOMoveY(-5, 0.7f);
}


void OnTriggerEnter2D(Collider2D collision)
{
    if (collision.gameObject.layer == 4)
    {
        SocketScript.GetInstance().answerItem(collision.transform.tag);

        Destroy(transform.GetChild(1).gameObject);
        transform.DOKill();
        transform.position = Vector2.zero;
        transform.localScale = new Vector3(1, 1, 1);
        RotateScript.canLevi = true;
        RotateScript.canKillTransform = false;
        canDrag = true;
       
    }
}




    
void ShowBgLine(RaycastHit2D hit)
{
    if (hit.collider != null)
    {
        if (oldLine != hit.transform.gameObject && oldLine != null)
        {
         
            canFadeBgLine = true;
        }
    }
    

    if (hit.collider != null && hit.transform.gameObject.layer == 8 && canFadeBgLine == true)
    {
        canFadeBgLine = false;
        oldLine = hit.transform.gameObject;
        SpriteRenderer sprite = hit.transform.GetChild(0).GetComponent<SpriteRenderer>();
        Color col = sprite.color;
        sprite.DOColor(new Color(sprite.color.r, sprite.color.g, sprite.color.b, alpha.a),.5f);
        if (!lineHitColors.Contains(hit.transform.gameObject))
        {
          
            oldLine = hit.transform.gameObject;
            lineHitColors.Add(hit.transform.gameObject);
        }
    }

}*/
}
