// sketch.js - Experiment 4
// Author: Nick Tung
// Date: 2/5/24

let img;
let sound;
let canvasContainer;

function preload() {
    img = loadImage('data/uni_the_strongest.jpg');
    sound = loadSound('data/cat_meow.mp3');
}

function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(img.width(), img.height());
    });
    image(img, 0, 0);
}
  
function draw() {
    background(255);
    noStroke();
    for (let y = 0; y < img.height; y += 5) { 
        for (let x = 0; x < img.width; x += 5) { 
            let pixel = img.get(x, y);
            let greyscale = round(red(pixel) * 0.222 + green(pixel) * 0.707 + blue(pixel) * 0.071);
            let thickness = map(greyscale, 0, 255, 20, 1); 
            textSize(thickness);
            if (thickness < 10) {
                text(':>', x, y);
            } else {
                text(':3', x, y);
            }
        }    
    }
    frameRate(60);
}

function mousePressed() {
    sound.play();
}