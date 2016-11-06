"use strict";

var ANIMATION_DURATION = 1;

var Expr         = null;
var CompiledExpr = null;

var Canvas = null;


function init()
{
    window.onresize = onResize;
    
    initGallery();
}

function onResize()
{
    onGalleryResize();
}

function onNew()
{
    Expr = null;
    CompiledExpr = null;
    while (CompiledExpr === null)
    {
        Expr = generate(0);
        CompiledExpr = compile(Expr);
    }
    
    var code = document.getElementById("code");
    code.value = print(Expr);

    var preData = precompute(CompiledExpr, Canvas.width, Canvas.height, getCoordSystem("polar sinus"), false);
    draw(preData, Canvas);
}

function onRead()
{
    var textarea = document.getElementById("code");
    
    Expr = read( textarea.value );
    CompiledExpr = compile(Expr);

    var preData = precompute(CompiledExpr, Canvas.width, Canvas.height, getCoordSystem("polar sinus"), false);
    draw(preData, Canvas);
}
