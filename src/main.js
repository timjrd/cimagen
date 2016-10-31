"use strict";

var ANIMATION_DURATION = 1;

var Node     = null;
var Compiled = null;

var Canvas = null;

// var StartTime  = null;
// var IntervalId = null;

function init()
{
    Canvas = document.getElementById("canvas");
    
    onNew();
}

function onNew()
{
    Node = generate(0);
    Compiled = compileNode(Node);
    
    var code = document.getElementById("code");
    var str = print(Node);
    code.value = str;

    drawFrame(Canvas, null, Compiled, 0);
    
    // if (IntervalId !== null)
    //     window.clearInterval(IntervalId);

    // StartTime = Date.now() / 1000;
    // IntervalId = window.setInterval(tick, 1000/30);
}

function onRead()
{
    var textarea = document.getElementById("code");
    
    Node = readNode( textarea.value );
    Compiled = compileNode(Node);

    drawFrame(Canvas, null, Compiled, 0);
}

// function tick()
// {
//     var now = Date.now()/1000;

//     if (now - StartTime > ANIMATION_DURATION)
//         StartTime = now;

//     var t = (now - StartTime) / ANIMATION_DURATION;
    
//     drawFrame(Canvas, null, Compiled, t);
// }
