// sketch.js - experiment 2 coded contents here 
// Author: Nick 
// Date: Jan 22, 2024

let canvasContainer;

// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    background(20, 20, 100);
    noStroke();
    let gridSize = 50;
    let boxSize = 50;
    let totalSize = gridSize * boxSize;
    translate(-totalSize / 2, -totalSize / 2); 
  
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        push();
        translate(x * boxSize, y * boxSize);
        let rotationX = map(mouseY, 0, height, -PI, PI);
        let rotationY = map(mouseX, 0, width, -PI, PI);
  
        rotateX(rotationX);
        rotateY(rotationY);
        genBox(x * boxSize, y * boxSize);
        pop();
      }
    }
}

function genBox(x, y) {
    let rainbowColor = getRGB(x, y);
    fill(rainbowColor);
    for (let i = 0; i < 10; i+=3) {
      rotateX(frameCount * 0.01+i);
      rotateY(frameCount * 0.01+i);
    }
    box(30);
  }

  function getRGB(x, y) {
    let hue = map(x + y, 0, 45, 0, 360); 
    hue = hue % 360; 
    return color('hsb(' + hue + ', 80%, 100%)');
  }

// mousePressed() function is called once after every time a mouse button is pressed
// function mousePressed() {
//     code to run when mouse is pressed
// }