"use strict";

function compileNode(node)
{
    var expression = compileNode_(evalConstantParts(node));

    return new Function("variables", "return " + expression + ";");
}

function compileNode_(node)
{
    if (node.constantValue !== null)
    {
        return "(" + node.constantValue.toString() + ")";
    }
    else if (node.variableIndex !== null)
    {
        return "(variables[" + node.variableIndex.toString() + "])" ;
    }
    else
    {
        var left  = compileNode_(node.leftOperand);
        var right = (node.rightOperand === null) ? "" : compileNode_(node.rightOperand);
        
        return "(" + node.operator.jsexpr.replace(/\$0/g, left).replace(/\$1/g, right) + ")";
    }
}

function evalConstantParts(node)
{
    var copy = copyNode(node);
    
    var res = evalConstantParts_(copy);
    if (res !== null)
    {
        copy = emptyNode();
        copy.constantValue = res;
    }

    return copy;
}

function evalConstantParts_(node)
{
    if (node.constantValue !== null)
    {
        return node.constantValue;
    }
    else if (node.variableIndex !== null)
    {
        return null;
    }
    else
    {
        var left  = evalConstantParts_(node.leftOperand);
        var right = (node.rightOperand === null) ? null : evalConstantParts_(node.rightOperand);

        if (left === null || (right === null && node.rightOperand !== null))
        {
            if (left !== null)
            {
                node.leftOperand = emptyNode();
                node.leftOperand.constantValue = left;
            }
            else if (right !== null)
            {
                node.rightOperand = emptyNode();
                node.rightOperand.constantValue = right;
            }
            
            return null;
        }
        else
        {
            return operatorFunction(node.operator)(left,right);
        }
    }
}

