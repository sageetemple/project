function draw(x, y, r) {
    var canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI, false);
    ctx.lineWidth=2;
    ctx.strokeStyle='black';
    ctx.stroke();

    //alert("" + r + "");
    if(r > 10)
    {
        draw(x + r, y, r/2);
        draw(x - r, y, r/2);
        draw(x, y-r, r/2);
        draw(x, y+r, r/2);
    }
}
