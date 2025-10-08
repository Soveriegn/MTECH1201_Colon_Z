let col, col2, col3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  strokeWeight(4);
  noFill();

  col1 = color(100, 200, 0);
  col2 = color(255, 10, 50);
}
function draw() {

  // col1 = color(100 + random(50, -50), 200 + random(50, -50), 0 + random(50, -50));
  // col2 = color(255 + random(50, -50), 75 + random(50, -50), 130 + random(50, -50));

let x = mouseX + random(10,-10);
let y = mouseY + random(-10,10);  

let i = map(mouseX, 0, width, 0, 1);
  
col = lerpColor(col1, col2, i);

  stroke(col);

  ellipse(x, y, 24);
  //ellipse(random(width), random(height), 24);
  //line(pmouseX, pmouseY, mouseX, mouseY);

}

