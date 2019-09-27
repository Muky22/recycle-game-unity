using DG.Tweening;
using UnityEngine;

public class GameManager : MonoBehaviour
{
    public GameObject binObj,arrow;
    public float showBinYValue,showTime;
    bool showBin = false;
    bool canAnim = true;

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
}
