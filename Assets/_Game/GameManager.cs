using DG.Tweening;
using SocketIO;
using System;
using System.Collections;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    public GameObject DragOBJ;
    public GameObject binObj, arrow;
    public float showBinYValue, showTime;
    bool showBin = false;
    bool canAnim = true;
    
    public GameObject[] col;
    public GameObject[] bins;
    
    [Header("Canvas_Lvl_Bar")]
    public TextMeshProUGUI lvlText, lvlText_2, lvlText_3;
    [Header("Canvas_Exp_Lvl")]
    public Image expBar;
    public int level = 1;
    public float perc = 0;

    public TextMeshProUGUI questNumb, questPerc;
    public Image globalQuestFillBar;

    [Serializable]
    public struct ItemV2
    {
        public String tag;
        public GameObject obj;
    }
    public ItemV2[] Items;

   
    public GameObject currentItem;
    public Boolean hasItem = false;

    public Vector3 finalScale;

    public GameObject levelHexagonObj;

    public GameObject itemText;

    public TextMeshProUGUI nickText;
    public TextMeshProUGUI hashText;
    
    private void Start()
    {
        SetCollidersPos();
        SetValues();

        SocketScript.GetInstance();

    }

    public void ChooseItem(GameObject objToSpawn)
    {
            GameObject newObj = Instantiate(objToSpawn);

            newObj.transform.SetParent(DragOBJ.transform);
            newObj.SetActive(true);

            newObj.AddComponent<RotateScript>();

            newObj.transform.rotation = DragOBJ.transform.GetChild(0).transform.rotation;
            newObj.transform.localScale = DragOBJ.transform.GetChild(0).transform.localScale;
            newObj.transform.position = Vector3.zero;
            
            newObj.transform.position = new Vector3(
                newObj.transform.position.x,
                newObj.transform.position.y,
                50
            );

            finalScale = newObj.transform.localScale;
            
            newObj.transform.localScale= new Vector3(0f,0f,0f);
            newObj.transform.DOScale(finalScale, 0.3f);
            this.hasItem = true;
            
            currentItem = newObj;
    }

    public void SetValues()
    {
        if (level == 1)
        {
            expBar.fillAmount = 0;
        }
        
        lvlText.text = level.ToString();
        lvlText_2.text = (level + 1).ToString();
        lvlText_3.text = (level + 2).ToString();
    }

    public void DoXpBarFill()
    {
        expBar.DOKill();
        expBar.DOFillAmount(perc, 0.5f);
    }
   
    public void ShowBinArrow()
    {
        if (showBin == false)
        {
            if (canAnim == true)
            {
                canAnim = false;

                showBin = true;

                SetArrowRotation();
                arrow.transform.DOMoveY(arrow.transform.position.y + showBinYValue, showTime);
                binObj.transform.DOMoveY(binObj.transform.position.y + showBinYValue, showTime).OnComplete(()=> 
                {
                    canAnim = true;
                });
            }
        }
        else
        {
            if (canAnim == true)
            {
                canAnim = false;

                showBin = false;

                SetArrowRotation();

                arrow.transform.DOMoveY(arrow.transform.position.y - showBinYValue, showTime);
                binObj.transform.DOMoveY(binObj.transform.position.y - showBinYValue, showTime).OnComplete(()=> 
                {
                    canAnim = true;
                });
            }
        }
    }

    void SetArrowRotation()
    {
        if (arrow.transform.GetChild(1).transform.eulerAngles.z + 180 <= 360)
        {
            Vector3 angle = arrow.transform.GetChild(1).transform.eulerAngles;
            angle.z += 180;
            arrow.transform.GetChild(1).transform.DORotate(angle, .25f);
        }

        if (arrow.transform.GetChild(1).transform.eulerAngles.z + 180 >= 360)
        {
            Vector3 angle = arrow.transform.GetChild(1).transform.eulerAngles;
            angle.z -= 180;
            arrow.transform.GetChild(1).transform.DORotate(angle, .25f);
        }
    }
    
    void SetCollidersPos()
    {
        Vector3 val = Camera.main.ViewportToWorldPoint(transform.position);
        
        val.x = val.x * 2;
        val.y = val.y * 2;
       
        float leftX = val.x / 2;
        float leftY = val.y / 2;
        float xToSum = val.x / col.Length;
        leftX += (xToSum *-1) /2; 
        for (int i = 0; i < col.Length; i++)
        {
            float xSize = val.x/ col.Length;
            float ySize = val.y;
            xSize *= -1;
            ySize *= -1;
            // col[i].size = new Vector2(xSize, ySize);
            col[i].transform.position = new Vector2(leftX,leftY+ySize/2);
            col[i].transform.localScale = new Vector2(xSize, ySize);
            // col[i].transform.GetChild(0).transform.position += new Vector3(0, 0, 3);
            bins[i].transform.position = new Vector2( col[i].transform.position.x,bins[i].transform.position.y);
            leftX += xSize;
        }
    }
    
    // Buttony

    public void DoAnim(GameObject GMO)
    {
        if (GMO == null)
        {
            return;
        }
        else
        {
            GMO.transform.DOKill();
            GMO.transform.localScale = new Vector3(1f, 1f, 1f);
            GMO.transform.DOScale(new Vector3(1.2f, 1.2f, 1.2f), 0.1f).OnComplete(() =>
            {
                GMO.transform.DOScale(new Vector3(1f, 1f, 1f), 0.2f);
            });
        }
    }

    public void Close_Scene(CanvasGroup CG)
    {
        if (CG == null)
        {
            return;
        }
        else
        {
            if (CG.transform.name != "MenuCanvas")
            {
                Utils.SetTimeout(this, () =>
                {
                    CG.DOFade(0, 0.3f).OnComplete(() =>
                    {
                        CG.gameObject.SetActive(false);
                    });
                    return true;
                }, 0.2f);
            }
            else
            {
                Utils.SetTimeout(this, () =>
                {
                    CG.DOFade(0, 0.3f).OnComplete(() =>
                    {
                        CG.gameObject.SetActive(false);
                        DragOBJ.SetActive(true);
                        binObj.SetActive(true);
                    });
                    
                    return true;
                }, 0.2f);
            }
        }
    }

    public void Open_Scene(CanvasGroup CG)
    {
        if (CG == null)
        {
            return;
        }
        else
        {
            if (CG.transform.name == "MenuCanvas")
            {
                ///
                DragOBJ.SetActive(false);
                binObj.SetActive(false);
                CG.gameObject.SetActive(true);
                CG.DOFade(1, 0.3f);
            }
            else
            {
                Utils.SetTimeout(this, () =>
                {
                    CG.gameObject.SetActive(true);
                    CG.DOFade(1, 0.3f);
                    return true;
                }, 0.2f);
            }
        }
    }

    public void ShowQuest(GameObject GM)
    {
        if (GM == null)
        {
            return;
        }
        else
        {
            Utils.SetTimeout(this, () =>
            {
                GM.transform.GetChild(0).transform.localScale = Vector3.zero;
                GM.SetActive(true);
                GM.transform.GetChild(0).transform.DOScale(Vector3.one, 0.3f).SetEase(Ease.OutBack);
                DragOBJ.SetActive(false);
                binObj.SetActive(false);
                return true;
            }, 0.2f);
        }
    }
    public void QuestType(bool isGlobal)
    {
        if (isGlobal)
        {
            SocketScript.GetInstance().OpenGlobalQuest();
        }
        else
        {

        }
    }


    public void CloseQuestType(bool isGlobal)
    {
        if (isGlobal)
        {
            SocketScript.GetInstance().CloseGlobalQuest();
        }
        else
        {

        }
    }


    public void CloseQuest(GameObject GM)
    {
        if (GM == null)
        {
            return;
        }
        else
        {
            Utils.SetTimeout(this, () =>
            {
               
                GM.transform.GetChild(0).transform.DOScale(Vector3.zero, 0.2f).OnComplete(()=> 
                {
                    GM.SetActive(false);
                    DragOBJ.SetActive(true);
                    binObj.SetActive(true);
                });
               
                return true;
            }, 0.2f);
            
        }
    }
}
