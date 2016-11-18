"use strict";

function getElement(arr, name)
{
    for (var i = 0; i < arr.length; i++)
        if (arr[i].name === name)
            return arr[i];

    return null;
}
