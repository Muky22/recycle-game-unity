using DG.Tweening;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public GameObject binObj,arrow;
    public float showBinYValue,showTime;
    bool showBin = false;
    bool canAnim = true;

    public BoxCollider2D[] col;
    public GameObject[] bins;

    private void Start()
    {
        SetCollidersPos();
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
            col[i].transform.position = new Vector2(leftX,leftY);

            bins[i].transform.position = new Vector2( col[i].transform.position.x,bins[i].transform.position.y);
            leftX += xSize;
        }
    }
}
