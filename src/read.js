"use strict";

function read(str)
{
    var result;

    try
    {
        result = read_(str, {value:0});
    }
    catch(e)
    {
        console.log("read() parse error: " + e);
        result = null;
    }

    return result;
}

function read_(str, pos)
{
    ignoreSpaces(str, pos);

    if (pos.value >= str.length)
        throw parseError("unexpected end of string", null);
    
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

    var left = read_(str, pos);

    ignoreSpaces(str, pos);

    if (pos.value >= str.length)
        throw parseError("unexpected end of string", null);
    
    var right;
    if (str.charAt(pos.value) !== ")")
        right = read_(str, pos);
    else
        right = null;
    
    ignoreSpaces(str, pos);

    if (pos.value >= str.length)
        throw parseError("unexpected end of string", null);

    if (str.charAt(pos.value) === ")")
        pos.value++;
    else
        throw parseError("missing", ")");
    
    var op = getOperator(name);

    if (op === null)
        throw parseError("unknown operator", name);
    
    return operatorNode(op, left, right);
}

function readVariable(str, pos)
{
    var token = readToken(str, pos);
    var i = Number.parseInt(token);
    
    if (isNaN(i))
        throw parseError("invalid variable index", token);
    
    return variableNode(i);
}

function readSpecialConstant(str, pos)
{
    var token = readToken(str, pos);
    var constant = getConstant(token);
    
    if (constant === null)
        throw parseError("unknown special constant", token);
    
    return specialConstantNode(constant);
}

function readConstant(str, pos)
{
    var token = readToken(str, pos);
    var value = Number.parseFloat(token);

    if (isNaN(value))
        throw parseError("invalid constant value", token);
    
    return constantNode(value);
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

function parseError(msg, token)
{
    var token_ = (token === null) ? "" : " <" + token + ">";
    return msg + token_;
}
