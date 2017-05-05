var angle = PI / 4;

var slider;

function setup(){
    createCanvas(400,400);
    slider = createSlider(0,TW0_PI, PI/4);
}
function draw() {
    background(51);
    angle = slider.value();
    stroke(225);
    translate(200,height);
    branch(100);
}
function branch(len){

    line(0, 0, 0, - len);
    translate(0,-len);
    rotate(angle);
    if(len < 4) {
        branch(len * 0.67);
    }
    line(0, 0, 0, -len * 0.67);
}