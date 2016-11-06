"use strict";

function random(min, max)
{
  return Math.random() * (max - min) + min;
}

function randomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomElement(array)
{
    var r = Math.random();
    var suitable = [];
    
    for (var i = 0; i < array.length; i++)
        if (r <= array[i].frequency)
            suitable.push(array[i]);

    var r2 = randomInt(0, suitable.length);
    return suitable[r2];
}
