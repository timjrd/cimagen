"use strict";

var OPERATORS = [

    { name:"add", frequency:100/100, argc:2, jsexpr:"$0 + $1" },

    { name:"sub", frequency:75/100, argc:2, jsexpr:"$0 - $1" },

    { name:"mul", frequency:60/100, argc:2, jsexpr:"$0 * $1" },

    { name:"div", frequency:60/100, argc:2, jsexpr:"$0 / $1" },

    
    /* 
       Functions in Math
    */

    { name:"abs", frequency:5/100, argc:1, jsexpr:"Math.abs($0)" },

    { name:"acos", frequency:5/100, argc:1, jsexpr:"Math.acos($0)" },

    { name:"acosh", frequency:1/100, argc:1, jsexpr:"Math.acosh($0)" },

    { name:"asin", frequency:5/100, argc:1, jsexpr:"Math.asin($0)" },

    { name:"asinh", frequency:1/100, argc:1, jsexpr:"Math.asinh($0)" },

    { name:"atan", frequency:5/100, argc:1, jsexpr:"Math.atan($0)" },

    { name:"atanh", frequency:1/100, argc:1, jsexpr:"Math.atanh($0)" },

    { name:"cbrt", frequency:5/100, argc:1, jsexpr:"Math.cbrt($0)" },

    { name:"cos", frequency:30/100, argc:1, jsexpr:"Math.cos($0)" },

    { name:"cosh", frequency:2/100, argc:1, jsexpr:"Math.cosh($0)" },

    { name:"exp", frequency:10/100, argc:1, jsexpr:"Math.exp($0)" },

    { name:"log", frequency:10/100, argc:1, jsexpr:"Math.log($0)" },

    { name:"pow", frequency:10/100, argc:2, jsexpr:"Math.pow($0,$1)" },

    { name:"sin", frequency:30/100, argc:1, jsexpr:"Math.sin($0)" },

    { name:"sinh", frequency:2/100, argc:1, jsexpr:"Math.sinh($0)" },

    { name:"sqrt", frequency:20/100, argc:1, jsexpr:"Math.sqrt($0)" },

    { name:"tan", frequency:30/100, argc:1, jsexpr:"Math.tan($0)" },

    { name:"tanh", frequency:2/100, argc:1, jsexpr:"Math.tanh($0)" }
    
];


function getOperator(name)
{
    for (var i = 0; i < OPERATORS.length; i++)
        if (OPERATORS[i].name === name)
            return OPERATORS[i];

    return null;
}

function operatorFunction(operator)
{
    return new Function("$0", "$1", "return (" + operator.jsexpr + ");");
}
