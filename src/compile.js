"use strict";

function compile(node)
{
    var node_ = evalConstantParts(node);
    if (node_ === null)
    {
        return null;
    }
    else
    {
        var expression = compile_(node_);
        return new Function("variables", "return " + expression + ";");
    }
}

function compile_(node)
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
        var left  = compile_(node.leftOperand);
        var right = (node.rightOperand === null) ? "" : compile_(node.rightOperand);
        
        return "(" + node.operator.jsexpr.replace(/\$0/g, left).replace(/\$1/g, right) + ")";
    }
}

function evalConstantParts(node)
{
    try
    {
        var copy = copyNode(node);
        
        var res = evalConstantParts_(copy, {value:false});
        if (res !== null)
        {
            copy = emptyNode();
            copy.constantValue = res;
        }

        return copy;
    }
    catch (e)
    {
        return null;
    }
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
            var value = operatorFunction(node.operator)(left,right);

            if (! isFinite(value))
                throw "broken value";
            
            return value;
        }
    }
}

