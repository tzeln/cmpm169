// sketch.js - This piece uses ripples to generate a pattern amongst a chaos of other ripples – mouse-input makes the pattern fade.
// There may be a name for this pattern, but I am not well-educated enough to know it.

// Author: Nick Tung
// Date: 1/29/24

//mouse-gnereated ripple logic created almost entirely from ChatGPT
let ripples = [];
let speed = 0; 
let canvasContainer;

// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
}

function draw() {
  background(255);
  // background(30, 70, 105);

  if (mouseIsPressed) {
    let mouseRipple = new Ripple(mouseX, mouseY);
    mouseRipple.alpha = 0; 
    ripples.push(mouseRipple);
  }
  
  let x = canvasContainer.width()/2 + sin(speed)*100;
  let y = canvasContainer.height()/2 + cos(speed)*100;
  let genRipple = new Ripple(x, y);
  ripples.push(genRipple);
    

  
  speed += 1;
  let g = 50;
  for (let i = ripples.length - 1; i >= 0; i--) {
    ripples[i].update();
    ripples[i].display(g);
    if (ripples[i].isFinished()) {
      ripples.splice(i, 1); 
      ripples.splice(i, 2);
      let newRipple = new Ripple(random(width), random(height));
      ripples.push(newRipple);
    }
    g += 5;
  }
}

class Ripple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = 200; 
    this.expandRate = 3; 
    this.alpha = 255; 
  }
  
  update() {
    this.radius += this.expandRate;
    this.alpha -= 5;
  }
  
  display(x) {
    noFill();
    stroke(30, x, 160, this.alpha);
    ellipse(this.x, this.y, this.radius * 2);
  }
  
  isFinished() {
    return this.radius >= this.maxRadius || this.alpha <= 0;
  }
}
