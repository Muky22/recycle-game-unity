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
                            tag = "glass";
                            break;
                        case 1:
                            tag = "plastic";
                            break;
                        case 2:
                            tag = "organic";
                            break;
                        case 3:
                            tag = "paper";
                            break;
                        case 4:
                            tag = "mixed";
                            break;
                        case 5:
                            tag = "metal";
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

}
