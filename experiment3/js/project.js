// project.js - purpose and description here
// Author: Nick Tung
// Date:  1/29/24

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

//mouse-gnereated ripple logic created almost entirely from ChatGPT
let ripples = [];
let speed = 0; 

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  // background(30, 70, 105);

  if (mouseIsPressed) {
    let mouseRipple = new Ripple(mouseX, mouseY);
    mouseRipple.alpha = 0; 
    ripples.push(mouseRipple);
  }
  
  let x = 300 + sin(speed)*100;
  let y = 300 + cos(speed)*100;
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

