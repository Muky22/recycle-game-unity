using DG.Tweening;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class Drag : MonoBehaviour
{
    public GameManager GM;

    float startPosX;
    bool isDragging = false;
    bool canDrag = true;

    private void Update()
    {
        DragControll();
    }

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
                    startPosX = hit.collider.transform.position.x;
                }
                else
                {
                    return;
                }
            }
            else if (Input.GetMouseButtonUp(0))
            {
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

    private void OnTriggerEnter2D(Collider2D collision)
    {
        
        if (collision.gameObject.layer == 4)
        {
            if (collision.transform.tag == transform.tag)
            {
                AfterTrigger(transform.tag);
                
            }
            else
            {
                AfterBadSeparate();
                
            }
        }
    }

    void AfterTrigger(string tag)
    {
        if (tag == "Green") //glass
        {
            TypeHolder.Glass++;
        }else if(tag == "Yellow") // plast
        {
            TypeHolder.Plastic++;
        }
        else if (tag == "Red") // electro
        {
            TypeHolder.Electro++;
        }
        else if (tag == "Blue") // paper
        {
            TypeHolder.Paper++;
        }
        else if (tag == "Black") //mixed
        {
            TypeHolder.Mixed++;
        }
        else if (tag == "Orange") // metal
        {
            TypeHolder.Metal++;
        }
        Destroy(transform.GetChild(1).gameObject);
        GM.AddXp();
        GM.ChooseItem();
        transform.DOKill();
        transform.position = Vector2.zero;
        transform.localScale = new Vector3(1, 1, 1);
        canDrag = true;
    }

    void AfterBadSeparate()
    {
        Destroy(transform.GetChild(1).gameObject);
        GM.SetValues();
        GM.ChooseItem();
        transform.DOKill();
        transform.position = Vector2.zero;
        transform.localScale = new Vector3(1, 1, 1);
        canDrag = true;
        if (GM.level > 2)
        {
            GM.level--;
            GM.SetValues();
            GM.expRequired /= 2;
            GM.DoXpBarFill();
        }
    }

    private bool IsPointerOverUiObject()
    {
        PointerEventData eventDataCurrPos = new PointerEventData(EventSystem.current);
        eventDataCurrPos.position = new Vector2(Input.mousePosition.x, Input.mousePosition.y);
        List<RaycastResult> results = new List<RaycastResult>();
        EventSystem.current.RaycastAll(eventDataCurrPos, results);
        return results.Count > 0;
    }
}
