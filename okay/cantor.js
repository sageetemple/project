function cantor(x, y, l){
    var c=document.getElementById("canvas");
    var ctx=c.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x,y);
    window.onload("lineDistance");
    ctx.lineTo(x,y);

    }

function lineDistance(pt1,pt2){
    var xs=0;
    var ys=0;
    xs=pt2.x-pt1.x;
    xs=xs * xs;
    ys=pt2.y-pt1.y;
    ys=ys*ys;
    return Math.sqrt(xs +ys);
}