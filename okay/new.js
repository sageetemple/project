/**
 * Created by templetons0379 on 5/9/2017.
 */
    //create canvas
    var canvas=document.createElement("canvas");
    canvas.width=1500;
    canvas.height=1000;
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");

    function draw(){
        //Start drawing
        function checkIfBelongstoSet(x,y){
            var realComponentOfResult=x;
            var imaginaryComponentofResult=y;
            var max_iterations=25;
            for(var i=0; i<max_iterations; i++){
                var tempRealComponent=realComponentOfResult*realComponentOfResult-imaginaryComponentofResult*imaginaryComponentofResult+x;
                var tempImagineryComponent=2*realComponentOfResult*imaginaryComponentofResult+y;
                realComponentOfResult=tempRealComponent;
                imaginaryComponentofResult=tempImagineryComponent;
            }
            if(realComponentOfResult*imaginaryComponentofResult>5)
                return (i/max_iterations*100);
            return 0;
        }
        var magnificationFactor=500;
        var panX=1.4;
        var panY=1;
        for(var x=0; x<canvas.width; x++){
            for(var y=0; y<canvas.height; y++){
                var belongsToSet=
                    checkIfBelongstoSet(x/magnificationFactor-panX, y/magnificationFactor-panY);
                if(belongsToSet){
                    ctx.fillRect(x, y, 1, 1);
                }
                if(belongsToSet ==0){
                    ctx.fillStyle='#000';
                    ctx.fillRect(x, y, 1, 1);
                }
                else{
                    ctx.fillStyle='hsl(280,70%,40%)';
                    ctx.fillRect(x, y, 1, 1);
                }
            }
        }
    }
var frac=draw();
window.onload = function(){
    var ctx=canvas.getContext('2d');
    trackTransforms(ctx);

    function redraw() {
        //Clear entire canvas
        var p1 = ctx.transformedPoint(0, 0);
        var p2 = ctx.transformedPoint(canvas.width, canvas.height);
        ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        ctx.drawImage(frac, 0, 0);
    }
    redraw();
    var lastX=canvas.width/2;
    var lastY=canvas.height/2;
    var dragStart, dragged;

    canvas.addEventListener('mousedown', function(evt){
        document.body.style.mozUserSelect=
            document.body.style.webkitUserSelect=
                document.body.style.userSelect='none';
        lastX=evt.offsetX || (evt.pageX-canvas.offsetLeft);
        lastY=evt.offsetY || (evt.pageY-canvas.offsetTop);
        dragStart=
            ctx.transformedPoint(lastX, lastY);
        dragged=false;
    }, false);

    canvas.addEventListener('mousemove', function(evt){
        lastX=evt.offsetX || (evt.pageX-canvas.offsetLeft);
        lastY=evt.offsetY || (evt.pageY-canvas.offsetTop);
        dragged=true;
        if (dragStart){
            var pt=ctx.transformedPoint(lastX, lastY);
            ctx.translate(pt.x-dragStart.x, pt.y-dragStart.y);
            redraw();
        }
    }, false);

    canvas.addEventListener('mouseup', function(evt){
        dragStart=null;
        if (!dragged) zoom(evt.shiftKey ? -1:1);
    }, false);

    var scaleFactor=1.1;
    var zoom=function(clicks){
        var pt=ctx.transformedPoint(lastX,lastY);
        ctx.translate(pt.x, pt.y);
        
    }

}

