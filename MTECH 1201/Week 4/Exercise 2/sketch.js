function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  translate(100, 100); // Moves canvas origin to (100, 100)
  ellipse(0, 0, 50); // Moves elipse to top-left corner

  push(); // Isolates the following transformations
    translate(100, 100); 
    ellipse(0, 0, 50); 
    translate(100, 100); 
    ellipse(0, 0, 50); 
    translate(100, 100); 
    ellipse(0, 0, 50); 
    translate(100, 100); 
    ellipse(0, 0, 50); 
    translate(100, 100); 
    ellipse(0, 0, 50); 
  pop();// Restores the previous transformation state

}

function mousePressed() {
}