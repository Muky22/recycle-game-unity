using DG.Tweening;
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
    
    public BoxCollider2D[] col;
    public GameObject[] bins;
    
    [Header("Canvas_Lvl_Bar")]
    public TextMeshProUGUI lvlText, lvlText_2, lvlText_3;
    [Header("Canvas_Exp_Lvl")]
    public Image expBar;
    public int level = 1;
    public float currExp = 0;
    public float expRequired = 50;

    [Header("Items")]
    public GameObject[] Items;

    [Header("Menu")]
    public CanvasGroup MenuOBJ,Profile,LeaderB,Compare,About;

    private void Start()
    {
        ChooseItem();
        SetCollidersPos();
        SetValues();
    }

    public void ChooseItem()
    {
        if (DragOBJ.transform.childCount < 3)
        {
            Drag.canClick = true;
            int randIndex = Random.Range(0, Items.Length);
            GameObject item = Instantiate(Items[randIndex]);

            item.transform.SetParent(DragOBJ.transform);
            item.SetActive(true);

            item.AddComponent<RotateScript>();

            item.transform.rotation = DragOBJ.transform.GetChild(0).transform.rotation;
            item.transform.localScale = DragOBJ.transform.GetChild(0).transform.localScale;
            item.transform.position = Vector3.zero;

            DragOBJ.transform.tag = item.transform.tag;
        }
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

    void XpBar()
    {
        if (currExp >= expRequired)
        {
            expBar.fillAmount = 0;
            level++;
            currExp -= expRequired;
            expRequired *= 2;
            SetValues();
            DoXpBarFill();
        }
    }

    public void DoXpBarFill()
    {
        expBar.DOKill();
        expBar.DOFillAmount(currExp / expRequired,0.5f).OnComplete(()=> 
        {
            XpBar();
        });
    }

    public void AddXp()
    {
        currExp += 100;
        DoXpBarFill();
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
        if (arrow.transform.eulerAngles.z + 180 <= 360)
        {
            Vector3 angle = arrow.transform.eulerAngles;
            angle.z += 180;
            arrow.transform.DORotate(angle, .25f);
        }

        if (arrow.transform.eulerAngles.z + 180 >= 360)
        {
            Vector3 angle = arrow.transform.eulerAngles;
            angle.z -= 180;
            arrow.transform.DORotate(angle, .25f);
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
            col[i].size = new Vector2(xSize, ySize);
            col[i].transform.position = new Vector2(leftX,leftY+col[i].size.y/2);

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
            GMO.transform.localScale = new Vector3(1, 1, 1);
            GMO.transform.DOPunchScale(GMO.transform.localScale, 0.18f);
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
            if (CG.transform.name != "Menu")
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
            if (CG.transform.name == "Menu")
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
                GM.SetActive(true);
                DragOBJ.SetActive(false);
                binObj.SetActive(false);
                return true;
            }, 0.2f);
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
                GM.SetActive(false);
                DragOBJ.SetActive(true);
                binObj.SetActive(true);
                return true;
            }, 0.2f);
            
        }
    }
}
