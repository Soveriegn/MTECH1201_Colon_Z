let col, col1, col2, col3;
let x = 100, y = 100; 
let r = 0;
let diameter = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  col1 = color(255, 0, 0);
  col2 = color(0, 255, 0);
  col3 = color(0, 0, 255);
  noStroke();

}

function draw() {
  background(0);

  background(255, 50);

  let i =  map(x, 0, width, 0, 1);
  let j =  map(y, 0, height, 0, 1);

  let colA = lerpColor(col1, col2, i);
  let colB = lerpColor(col, col3, j);

  fill(col);

  Push();
  translate(x, y);
  rotate(r);
  ellipse(0, 0, diameter, diameter);
  translate(100, 0);
  ellipse(0, 0, 25);
  Pop();

  if (x > width - diameter / 2){
    xV - -xV;
  }
  if (x < diameter / 2){
    xV = -xV;
  }
}
