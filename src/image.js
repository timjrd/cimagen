"use strict";

function image(expr, compiledExpr, coordSystem)
{
    return {
        expr: expr,
        compiledExpr: compiledExpr,
        coordSystem: coordSystem
    };
}

// function imageString(img)
// {
//     return JSON.stringify({
//         expr: print(img.expr),
//         coordSystem: img.coordSystem.name
//     });
// }

// function readImage(str)
// {
//     var object = JSON.parse(str);
// }
