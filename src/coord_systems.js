"use strict";

var COORD_SYSTEMS = [

    { name:"cartesian", frequency:100/100, fromCartesian:function(x,y)
      {
          return [x,y];
      }},
    
    { name:"polar", frequency:60/100, fromCartesian:function(x,y)
      {
          return [ Math.sqrt(x*x + y*y),
                   Math.atan2(y,x) ];
      }},

    { name:"polar sinus", frequency:100/100, fromCartesian:function(x,y)
      {
          return [ Math.sqrt(x*x + y*y),
                   Math.sin( Math.atan2(y,x) ) ];
      }}
    
];
