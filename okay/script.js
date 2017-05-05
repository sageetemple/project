
    var x = document.getElementById("canvas");
    canvas = x.getContext("2d");

    var y, z;
    var a, b;
    /*
    z -> z^2+C
    z=y+zi
    C=a+bi
    z^2+C=(y+zi)*(y+zi)+a+bi
         =yy+zizi+2yzi+a+bi
         =yy+zizi+i(2yz+b)+a
         =(y^2+(zi)^2 + a) + i(2yz+b)
     */
    y=0; z=0; a=0; b=0;

    var iterate = function () {
        var tmp = y * y - z * z + a;
        //assign temporary variable so that x doesn't keep changing before gets y
        y = 2 * y * z + b;
        x = tmp;
        //once we find y need to reset to temp var so that can recalculate
    };

    var iterateABunch=function(n)
    {
        for (var i = 0; i < n; i++) {
            iterate();
        }
    };
    //iterates n times

    var drawXY = function () {
        point(200 + y * 100, 200 - z * 100);
    };

    var drawAB=function(){
        point(200 + a * 100, 200 - b * 100);
    };

    var iterateAndDraw = function (n) {
        for (var i = 0; i < n; i++) {
            iterate();
            drawXY()
        }
    };

    var seriesDiverges=function(n){
        for(var i=0;i<n;i++){
            iterate();
            if(x*x+y*y>4.0){
                return true;
            }
        }
        return false;
    };

    textSize(20);
    fill(0, 0, 0);

    var textXY = function (ypos, zpos) {
        text("(" + x + ", " + y + ")", ypos, zpos);
    };

    a=-2;
    b=-2;
    var stillDrawing=true;
    var draw =function() {
        if (stillDrawing) {
            for (var i = 0; i < 100; i++) {
                a = a + 0.01;
                if (a >= 2) {
                    a = -2;
                    b += 0.1;
                }
                if (b >= 2) {
                    stillDrawing = false
                }
                x = 0;
                y = 0;
                if (seriesDiverges(40)) {
                    drawAB();

                }
            }
        }
    };


window.addEventListener("load", draw, false);
