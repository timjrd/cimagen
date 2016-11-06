"use strict";

function precompute(img, width, height, abortOnInvalid)
{
    var data = [];

    var invalid = false;
    
    var min = Number.MAX_VALUE;
    var max = - Number.MAX_VALUE;
    
    for (var x = 0; x < width && ! (invalid && abortOnInvalid); x++)
        for (var y = 0; y < height && ! (invalid && abortOnInvalid); y++)
    {
        var xf = (x / (width  - 1)) * 2 - 1;
        var yf = - ((y / (height - 1)) * 2 - 1);

        var value = img.compiledExpr( img.coordSystem.fromCartesian(xf,yf) );

        if (! isFinite(value))
        {
            invalid = true;
            value = 0;
        }

        if (value < min)
            min = value;
        if (value > max)
            max = value;

        data[y * width + x] = value;
    }

    return {
        data:data,
        min:min,
        max:max,
        invalid:invalid
    };
}
