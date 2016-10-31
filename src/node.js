"use strict";

function emptyNode()
{
    return {
        constantValue:null,
        specialConstant:null,
        // OR
        variableIndex:null,
        // OR
        operator:null,
        leftOperand:null,
        rightOperand:null,
    }; 
}

function specialConstantNode(c)
{
    var node = emptyNode();
    node.constantValue   = c.value;
    node.specialConstant = c;
    return node;
}

function constantNode(x)
{
    var node = emptyNode();
    node.constantValue = x;
    return node;
}

function variableNode(i)
{
    var node = emptyNode();
    node.variableIndex = i;
    return node;
}

function operatorNode(op, left, right)
{
    var node = emptyNode();
    node.operator = op;
    node.leftOperand  = left;

    if (op.argc === 2)
        node.rightOperand = right;
    else
        node.rightOperand = null;
    
    return node;
}

function copyNode(node)
{
    if (node === null)
        return null;
    else
    {
        var newNode = emptyNode();

        newNode.constantValue   = node.constantValue;
        newNode.specialConstant = node.specialConstant;
        newNode.variableIndex   = node.variableIndex;
        newNode.operator        = node.operator;

        newNode.leftOperand     = copyNode( node.leftOperand  );
        newNode.rightOperand    = copyNode( node.rightOperand );
        
        return newNode;
    }
}
