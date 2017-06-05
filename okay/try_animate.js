var canvas = document.getElementById("canvas");
canvas.width = 600;
canvas.height = 600;
ctx = canvas.getContext("2d");
var $canvas = $("#canvas");
var canvasOffset = $canvas.offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

var counter = 1;
var PI2 = Math.PI * 2;
var iw, ih;
var mapLeft, mapTop, mapWidth, mapHeight;
var focusX, focusY, focusX1, focusY1;
var scale;

var map=new Image();
map.onload=start;
map.src="http://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg";
map.addEventListener("load", function(){ctx.drawImage(map, 0,0,iw,mapLeft,mapTop,mapWidth,mapHeight)}, false);


function start(){
    iw=map.width;
    ih=map.height;

    //initialize
    mapLeft=0;
    mapTop=0;
    scale=1.00;

    setFocus(iw/2*scale,ih/2*scale);

    setScale(scale);

    drawMap();

    $("#canvas").mousedown(function(e){handleMouseDown(e);});

    canvas.addEventListener('DOMMouseScroll', handleScroll, false);
    canvas.addEventListener('mousewheel', handleScroll, false);
}

function setScale(newScale){
    scale=newScale;
    mapWidth=parseInt(iw*scale); // the key the user will press which is inputted as a string is converted into an integer so can treat as such in the rest of the code
    mapHeight=parseInt(ih*scale);
    mapLeft=parseInt(focusX-focusX1*scale);
    mapTop=parseInt(focusY-focusY1*scale);
    drawMap();
}

function setFocus(mx,my){
    //mx,my is scaling point
    focusX=mx;
    focusY=my;
    //convert scaled focus to an unscaled point
    focusX1=parseInt((mx-mapLeft)/scale);
    focusY1=parseInt((my-mapTop)/scale);
    drawMap();
}

function drawMap(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.save();
    map.addEventListener("load", function () {ctx.drawImage(map, 0,0,iw,mapLeft,mapTop,mapWidth,mapHeight)}, false);
    dot(ctx,focusX,focusY,"red");
    ctx.restore();
}

function dot(ctx,x,y,fill){
    ctx.beginPath();
    ctx.arc(x,y,4,0,PI2);
    ctx.closePath();
    ctx.fillStyle=fill;
    ctx.fill();
    ctx.lineWidth=2;
    ctx.stroke();
}

function handleScroll(e){
    e.preventDefault();
    e.stopPropagation();

    var delta=e.wheelDelta?e.wheelDelta/30:e.detail?-e.detail:0;
    if (delta){
        counter+=delta;
        setScale(1+counter/100);
    }
}

function handleMouseDown(e){
    e.preventDefault();
    e.stopPropagation();
    mouseX=parseInt(e.clientX-offsetX);
    mouseY=parseInt(e.clientY-offsetY);
    setFocus(mouseX,mouseY);
    drawMap();
}
 window.addEventListener("load", start, false);
