"use strict";

var CONSTANTS = [

    { name:"E" , frequency:1, value:Math.E },
    { name:"PI", frequency:1, value:Math.PI }

];

function getConstant(name)
{
    for (var i = 0; i < CONSTANTS.length; i++)
        if (CONSTANTS[i].name === name)
            return CONSTANTS[i];

    return null;
}
