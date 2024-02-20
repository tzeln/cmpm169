// sketch.js - thorns 
// Author: Nick Tung
// Date: 2/19/24

let axiom = "AACAEAAACAEAAAACEAAAACEAAAACEAEEEDDDDEEECEDECECEEECECEADDADAACACEAACCDECACDECAACDCEAADACACACBABBABDDADEEABADACADABDACABEEACADCADABBCDBDBCBDECADBCABDBCBABBEBCBABDCBABDCACBDACBABABABDBCABDCBDBABBEBBABCCBDEBBDBACBEBCEBDBCABBDABADBCaCACBADBEBACBDBAEBADBCAEBCBDCBAEBEBEBEBABDCBAEBABDCBEBBCBEABBABACBDBAACACBDBAAEAEAEBADBCAAACAAEADCAAEADBCADBaCBABEABBDCBEABDBCAEBCABDCABEBABAAACBBCBCBCBDDDEABCEBAADBABC"; 
let sentence = axiom;
let len = 10; 
let angle = 70;
let iterations = 10; 

function generate() {
    let nextSentence = "";
    for (let i = 0; i < sentence.length; i++) {
        let current = sentence.charAt(i);
        if (current === "A") {
            nextSentence += "BA";
        } else if (current == "B") {
            nextSentence += "AC"
        } else if (current == "C") {
            nextSentence += "E";
        } else if (current == "D") {
            nextSentence += "E";
        } else {
            nextSentence += current;
        }
    }
    sentence = nextSentence;
    turtle();
}

function turtle() {
    background(0);
    resetMatrix();
    translate(width/3, height/4);
    rotate(angle);
    stroke(2);
    for (let i = 0; i < sentence.length; i++) {
        let current = sentence.charAt(i);
        if (current === "A") {
            stroke(180, 250, random(255)); 
            line(0, 0, 0, -len);
            translate(0, -len);
        } else if (current == "B") {
            rotate(angle);
        } else if (current == "C") {
            rotate(-angle);
        } else if (current == "D") {
            rotate(-angle/2);
        } else if (current == "E") {
            rotate(angle/2);
        }
    }
}


function setup() {
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
    background(255);
    for (let i = 0; i < iterations; i++) {
        generate();
    }
}

