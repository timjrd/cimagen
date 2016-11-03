"use strict";

var BLUE_GRADIENT = [ [12,44,132],
                      [34,94,168],
                      [29,145,192],
                      [65,182,196],
                      [127,205,187],
                      [199,233,180],
                      [237,248,177],
                      [255,255,217] ];

function draw(preData, canvas)
{
    var width  = canvas.width;
    var height = canvas.height;
    var ctx = canvas.getContext('2d');
    var imageData = ctx.getImageData(0, 0, width, height);
    var data = imageData.data;

    var min = preData.min;
    var max = preData.max;
    
    if (max === min)
        max = min + 1;
    
    for (var y = 0; y < height; ++y)
        for (var x = 0; x < width; ++x)
    {
        var preDataIndex = y * width + x;
        var index = (y * width + x) * 4;

        var value = (preData.data[preDataIndex] - min) / (max - min);

        var color = gradient(value, BLUE_GRADIENT);
        
        data[index]     = color[0]; // red
        data[index + 1] = color[1]; // green
        data[index + 2] = color[2]; // blue
        data[index + 3] = 255;      // alpha
    }

    ctx.putImageData(imageData, 0, 0);
}

function gradient(x, steps)
{
    var pos = x * (steps.length - 1);
    
    var fromColor = steps[ Math.floor(pos) ];
    var toColor   = steps[ Math.ceil(pos)  ];

    var stepX = pos - Math.floor(pos);
    
    var red   = (toColor[0] - fromColor[0]) * stepX + fromColor[0];
    var green = (toColor[1] - fromColor[1]) * stepX + fromColor[1];
    var blue  = (toColor[2] - fromColor[2]) * stepX + fromColor[2];
    
    return [red,green,blue];
}
