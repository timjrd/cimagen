"use strict";

function print(node)
{
    if (node.constantValue !== null)
    {
        if (node.specialConstant !== null)
            return node.specialConstant.name;
        else
            return node.constantValue.toString();
    }
    else if (node.variableIndex !== null)
    {
        return "$" + node.variableIndex.toString();
    }
    else
    {
        var left = " " + print(node.leftOperand);
        var right;
        if (node.rightOperand !== null)
            right = " " + print(node.rightOperand);
        else
            right = "";
        
        return "(" + node.operator.name + left + right + ")";
    }
}

function print_(x)
{
    return print(x);
}
