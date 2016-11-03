"use strict";

function precompute(expr, layout, coordSystem, abortOnInvalid)
{
    var data = [];

    var invalid = false;
    
    var min = Number.MAX_VALUE;
    var max = - Number.MAX_VALUE;
    
    for (var y = 0; y < layout.height && ! (invalid && abortOnInvalid); ++y)
        for (var x = 0; x < layout.width && ! (invalid && abortOnInvalid); ++x)
    {
        var xf = (x / (layout.width  - 1)) * 2 - 1;
        var yf = (y / (layout.height - 1)) * 2 - 1;

        var value = expr( coordSystem.fromCartesian(xf,yf) );

        if (! isFinite(value))
        {
            invalid = true;
            value = 0;
        }

        if (value < min)
            min = value;
        if (value > max)
            max = value;

        data[y * layout.width + x] = value;
    }

    return {
        data:data,
        min:min,
        max:max,
        invalid:invalid
    };
}
