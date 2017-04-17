"use strict";

var ViewerImage    = null;
var ViewerViewport = null;
var ViewerCanvas   = null;

function initViewer()
{
    ViewerViewport = document.getElementById("viewerViewport");
    ViewerCanvas   = document.getElementById("viewerCanvas");
}

function focusViewer()
{
    onViewerResize();
    document.getElementById("pages").className = "pages focused-2";
}

function unfocusViewer()
{
    ViewerImage = null;
    focusGallery();
}

function setViewerImage(image)
{
    ViewerImage = image;
}

function onViewerResize()
{
    var width  = ViewerViewport.clientWidth;
    var height = ViewerViewport.clientHeight;
    
    ViewerCanvas.setAttribute("width" , width);
    ViewerCanvas.setAttribute("height", height);

    if (ViewerImage !== null)
    {
        var preData = precompute(ViewerImage, width, height, false);
        draw(preData, ViewerImage.gradient, ViewerCanvas);
    }
}
