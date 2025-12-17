let xLoc = [];
let yLoc = [];

letnumSegments = 80;

function setup() {
  createCanvas(windowWidth, windowHeight);
  

  for(let i = 0; i < numSegments; i++) {
    xLoc[i] = (width/2);
    yLoc[i] = (height/2);
  }

  console.log(xLoc);

}

let count = 0;

function draw() {
background(255)

// xLoc(numSegments - 1) = mouseX;
// yLoc(numSegments - 1) = mouseY;

// xloc[numSegments - 1] = random(width);
// yLoc[numSegments - 1] = random(height);


    xLoc[i] = xloc[i + 1];
    yLoc[i] = yLoc[i + 1];

    let diameter = map(i, 0, 80, numSegments, 25, 5);

    ellipse(xLoc[i], yLoc[i], 50);
  }

function mopusePressed() {
}