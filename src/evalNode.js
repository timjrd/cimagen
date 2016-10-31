"use strict";

function evalNode(node, variables)
{
    if (node.constantValue !== null)
    {
        return node.constantValue;
    }
    else if (node.variableIndex !== null)
    {
        return variables[node.variableIndex];
    }
    else
    {
        return node.operator.function_( evalNode(node.leftOperand, variables),
                                        (node.rightOperand === null) ? null : evalNode(node.rightOperand, variables) );
    }
}

