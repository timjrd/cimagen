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


function readNode(str)
{
    return readNode_(str, {value:0});
}

function readNode_(str, pos)
{
    ignoreSpaces(str, pos);
    
    var c = str.charAt(pos.value);

    if (c === "(")
    {
        pos.value++;
        return readOperator(str, pos);
    }
    else if (c === "$")
    {
        pos.value++;
        return readVariable(str, pos);
    }
    else if ( isLetter(c) )
    {
        return readSpecialConstant(str, pos);
    }
    else
    {
        return readConstant(str, pos);
    }
}

function readOperator(str, pos)
{
    ignoreSpaces(str, pos);
    
    var name = readToken(str, pos);

    var left = readNode_(str, pos);

    ignoreSpaces(str, pos);

    var right;
    if (str.charAt(pos.value) !== ")")
        right = readNode_(str, pos);
    else
        right = null;
    
    ignoreSpaces(str, pos);
    pos.value++;
    
    var op = getOperator(name);
    return operatorNode(op, left, right);
}

function readVariable(str, pos)
{
    var token = readToken(str, pos);
    return variableNode(Number.parseInt(token));
}

function readSpecialConstant(str, pos)
{
    var constant = getConstant( readToken(str, pos) );
    return specialConstantNode(constant);
}

function readConstant(str, pos)
{
    var token = readToken(str, pos);
    return constantNode(Number.parseFloat(token));
}

function readToken(str, pos)
{
    var token = "";
    while( pos.value < str.length && str.charAt(pos.value) !== ")" && (! isSpace(str.charAt(pos.value))) )
    {
        token += str.charAt(pos.value);
        pos.value++;
    }

    return token;
}

function ignoreSpaces(str, pos)
{
    while( pos.value < str.length && isSpace(str.charAt(pos.value)) )
        pos.value++;
}

function isLetter(c)
{
    return (("a" <= c && c <= "z")
            || ("A" <= c && c <= "Z"));
}

function isDigit(c)
{
    return ("0" <= c && c <= "9");
}

function isSpace(c)
{
    return (c.length > 0 && c.trim().length === 0);
}
