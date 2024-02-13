// sketch.js - purpose and description here
// Author: Nick Tung    
// Date: 2/12/24
// beginning reference (was initially a 1-1 copy!): https://www.youtube.com/watch?v=R1tfyVyU0hg&list=PLwUlLzAS3RYow0T9ZXB0IomwB-DyBRTfm&index=6
// changes made: custom canvas sized, altered certain function parameters (like RGB), mouse integration corresponds to viewing angle as well as perceived perlin strength (I think)

let isMouseOver = false;

function setup() {
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
    canvas.parent("canvas-container");
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width, canvasContainer.height);
    });
    angleMode(DEGREES);
    noiseDetail(1);
}

function draw() {
    background(0);

    // moves the scene back along the z-axis and rotates for visibility
    translate(0, 0, -300);
    let rotationX = map(mouseY, 0, height, 0, 360);
    let rotationY = map(mouseX, 0, width, 0, 360);
    rotateX(rotationX);
    rotateY(rotationY);

    var w = 30; // w stores the size (width) of each box in the scene
    var start = frameCount / 100; // used to animate noise pattern; changes slightly based on each incr frame
    var xoff = 0; // used as the X offset for the perlin noise function

    // iterates over the width of the canvas
    for (var x = -700; x <= 700; x+=w) {
        yoff = 0; // sets Y offset for the perlin noise function
        
        // iterates over the height of the canvas
        for (var y = -700; y <= 700; y+=w) {
            var h = map(noise(xoff + start, yoff + start)*2, 0, 1, -200, 0); // uses Perlin noise and xoff + yoff to generate a height value between -100 and 100
    
            // creates gradient based on x, y, and h (height)
            // translates current box to position and draws given found specifications w, w, h
            var r = map(x, -width/2, width/2, 0, 255);
            var g = map(y, -height/2, height/2, 255, 0);
            var b = map(h, -200, 0, 0, 255);
            push();
            fill(r, g, b);
            translate(x, y, map(mouseX, 0, h, -200, 0));
            // translate(x, y, -h/2);
            box(w, w, h);
            pop()
            yoff += 0.06;
        }
        xoff += 0.06;
    }
}