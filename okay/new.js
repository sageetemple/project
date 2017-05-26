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
                var tempImaginaryComponent=2*realComponentOfResult*imaginaryComponentofResult+y;
                realComponentOfResult=tempRealComponent;
                imaginaryComponentofResult=tempImaginaryComponent;
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
window.onload = function() {
    var ctx = canvas.getContext('2d');
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
    var lastX = canvas.width / 2;
    var lastY = canvas.height / 2;
    var dragStart, dragged;

    canvas.addEventListener('mousedown', function (evt) {
        document.body.style.mozUserSelect =
            document.body.style.webkitUserSelect =
                document.body.style.userSelect = 'none';
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragStart =
            ctx.transformedPoint(lastX, lastY);
        dragged = false;
    }, false);

    canvas.addEventListener('mousemove', function (evt) {
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragged = true;
        if (dragStart) {
            var pt = ctx.transformedPoint(lastX, lastY);
            ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
            redraw();
        }
    }, false);

    canvas.addEventListener('mouseup', function (evt) {
        dragStart = null;
        if (!dragged) zoom(evt.shiftKey ? -1 : 1); //shift click to zoom out
    }, false);

    var scaleFactor = 1.1;
    var zoom = function (clicks) {
        var pt = ctx.transformedPoint(lastX, lastY);
        ctx.translate(pt.x, pt.y);
        var factor = Math.pow(scaleFactor, clicks);
        ctx.scale(factor, factor);
        ctx.translate(-pt.x, -pt.y);
        redraw(); //click to zoom in
    };
    var handleScroll = function (evt) {
        var delta = evt.wheelDelta ? //the change in the scroll
        evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
        if (delta) zoom(delta); //use mousewheel to zoom in and out
        return evt.preventDefault() && false; //get rid of scroll default (normally scroll through page)
    };
    canvas.addEventListener('DOMMouseScroll', handleScroll, false);

    canvas.addEventListener('mousewheel', handleScroll, false);
};

function trackTransforms(ctx){
    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg'); //svg=scalar vector graphics; object oriented vector drawing system; makes animation easier
    var xform=svg.createSVGMatrix(); //can manipulate vectors more easily through the matrix
    ctx.getTransform = function(){return xform; };
    var savedTransforms = [];
    var save = ctx.save;
    ctx.save = function () {
        savedTransforms.push(xform.translate(0, 0));
        return save.call(ctx);
    };
    var restore=ctx.restore;
    ctx.restore=function(){
        xform=savedTransforms.pop();
        restore.call(ctx);
    };
    var scale = ctx.scale;
    ctx.scale=function(sx,sy){
        xform=xform.scaleNonUniform(sx,sy);
        return scale.call(ctx,sx,sy);
    };
    var rotate=ctx.rotate;
    ctx.rotate=function(radians){
        xform=xform.rotate(radians*180/Math.PI);
        return rotate.call(ctx,radians);
    };
    var translate=ctx.translate=function(dx,dy){
        xform=xform.translate(dx,dy);
        return translate.call(ctx,dx,dy);
    };
    var transform = ctx.transform = function(a,b,c,d,e,f){
        var m2=svg.createSVGMatrix();
        m2.a=a;m2.b=b;m2.c=c;m2.d=d;m2.e=e;m2.f=f;
        xform=xform.multiply(m2);
        return transform.call(ctx,a,b,c,d,e,f);
    };
    var setTransform=ctx.setTransform;
    ctx.setTransform=function(a,b,c,d,e,f){
        xform.a=a;
        xform.b=b;
        xform.c=c;
        xform.d=d;
        xform.e=e;
        xform.f=f;
        return setTransform.call(ctx,a,b,c,d,e,f);
    };
    var pt=svg.createSVGPoint();
    ctx.transformedPoint=function(x,y){
        pt.x=x; pt.y=y;
        return pt.matrixTransform(xform.inverse());
    }
}
