"use strict";

function onNext()
{
    var code = document.getElementById("code");
    var tree = generate(1);
    var str = print(tree, ["x","y","t"]);
    code.textContent = str;
}

function speedTest()
{
    var start = Date.now();
    var end   = Date.now();
    var time  = end - start;
}
