"use strict";

var THUMB_SIZE = 60;
var THUMB_MARGIN = 5;
var THUMB_BATCH = 5;
var THUMB_PAGES_MORE = 1.5

var GALLERY_MIN_SCROLL_BOTTOM = 200;

var Gallery = null;
var GalleryGenerated = null;

var AddingThumbs = false;

function initGallery()
{
    Gallery = document.getElementById("gallery");
    GalleryGenerated = document.getElementById("galleryGenerated");
   
    Gallery.onscroll = onGalleryScroll;

    addThumbPages(THUMB_PAGES_MORE);
}

function getScrollBottom()
{
    return Gallery.scrollHeight - Gallery.clientHeight - Gallery.scrollTop;
}

function onGalleryScroll()
{
    if (getScrollBottom() < GALLERY_MIN_SCROLL_BOTTOM)
        addThumbPages(THUMB_PAGES_MORE);
}

function onGalleryResize()
{
    if (Gallery.scrollHeight - Gallery.clientHeight < GALLERY_MIN_SCROLL_BOTTOM)
        addThumbPages(THUMB_PAGES_MORE);
}

function addThumbPages(n)
{
    if (! AddingThumbs)
    {
        AddingThumbs = true;
        
        var w = Math.floor( Gallery.clientWidth  / (THUMB_SIZE + THUMB_MARGIN*2) );
        var h = Math.floor( Gallery.clientHeight / (THUMB_SIZE + THUMB_MARGIN*2) );

        addThumbs(w * h * n);
    }
}

function addThumbs(n)
{
    if (n <= 0)
    {
        AddingThumbs = false;
        
        if (getScrollBottom() < GALLERY_MIN_SCROLL_BOTTOM)
            addThumbPages(THUMB_PAGES_MORE);
    }
    else
    {
        for (var i = 0; i < THUMB_BATCH; i++)
        {
            var thumb = document.createElement("canvas");
            thumb.setAttribute("width", THUMB_SIZE);
            thumb.setAttribute("height", THUMB_SIZE);
            
            var image_preData = generateValidImage();
            draw(image_preData[1], image_preData[0].gradient, thumb);
            
            GalleryGenerated.appendChild(thumb);
        }

        window.setTimeout(addThumbs, 0, n - THUMB_BATCH);
    }
}

function generateValidImage()
{
    var img   = null;
    var preData = null;

    do
    {
        var expr = evalConstantParts( generate() );
        if (expr != null)
        {
            img = image(expr, compile(expr), randomElement(COORD_SYSTEMS), randomElement(GRADIENTS));
            preData = precompute(img, THUMB_SIZE, THUMB_SIZE, true);
        }
    }
    while (expr === null || preData.invalid || preData.min === preData.max)

    return [img,preData];
}
