using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using ZXing;

public class CameraScirpt : MonoBehaviour
{
    static WebCamTexture backCam;
    private Rect screenRect;
    public TextMeshProUGUI text;

 
    public void StartCam()
    {
        if (backCam == null)
            backCam = new WebCamTexture();

        GetComponent<Renderer>().material.mainTexture = backCam;

        if (!backCam.isPlaying)
            backCam.Play();
    }

    public void StopCam()
    {
        if (backCam.isPlaying)
            backCam.Stop();
    }

    void OnGUI()
    {
        // drawing the camera on screen
        GUI.DrawTexture(screenRect, backCam, ScaleMode.ScaleToFit);
        // do the reading — you might want to attempt to read less often than you draw on the screen for performance sake
        try
        {
            IBarcodeReader barcodeReader = new BarcodeReader();
            // decode the current frame
            var result = barcodeReader.Decode(backCam.GetPixels32(), backCam.width, backCam.height);
            if (result != null)
            {
                text.text = result.Text;
            }
        }
        catch (Exception ex) { Debug.LogWarning(ex.Message); }
    }
}
