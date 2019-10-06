using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Utils : MonoBehaviour
{
    internal static void SetTimeout(MonoBehaviour obj, Func<bool> p, float time)
    {
        obj.StartCoroutine(RunAfter(p, time));
    }

    private static IEnumerator RunAfter(Func<bool> p, float time)
    {
        yield return new WaitForSeconds(time);
        p();
    }
}
