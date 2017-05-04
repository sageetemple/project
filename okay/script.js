
function blah() {

    var x = document.getElementById("canvas");
    canvas = x.getContext("2d");

    var y, z, i, yt;
    var cy, cz;
    var color;

    
    /*
    z -> z^2+C
    z=y+zi
    C=cy+czi
    z^2+C=(y+zi)*(y+zi)+cy+czi
         =yy+zizi+2yzi+cy+czi
         =yy+zizi+i(2yz+cz)+cy
         =(y^2+(zi)^2 + cy) + i(2yz+cz)
     */

    /*for (x=0; x>200; x++)
    {
        for (y=0; y<200; y++)
        {
            i=0;
            cy=-2+y/50;
            cz=-2+z/50;
            zy=0;
            zz=0;

            do
            {
                yt=zy*zz;
                zy=zy*zy-zz*zz+cy;
                zz=2*yt+cz;
                i++;
            }
            while(i<255&&(zy*zy+zz*zz)<4);
            color=i.toString(16);
            canvas.beginPath();
            canvas.rect(y*4, z*4, 4, 4);
            canvas.fillStyle= "purple";
            canvas.fill();
        }}*/

}

window.addEventListener("load", blah, false);
