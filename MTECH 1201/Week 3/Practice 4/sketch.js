function setup() {
  //Canvas size is the size of the window
  createCanvas(windowWidth, windowHeight);
// Center the rectangle
  rectMode(CENTER);
// No fill for the rectangle
  noFill()
}
// Initial value for the sine function
let i = 10;

function draw() {
// Set the background to a light gray
  background(220);
// The width and height of the rectangle oscillate between 100 and 500
  let w = (1 + sin(i)) * 200 + 100;
  let h = (1 + cos(i)) * 200 + 100; 
  let w1 = (1 + sin(i+1)) * 200 + 100;
  let h1 = (1 + cos(i+1)) * 200 + 100;

  rect(width/2, height/2, w + 1, h + 1);
  rect(width/2, height/2, w1 + 1, h1 + 1);
  rect(width/2, height/2, w + 1, h + 1);
  rect(width/2, height/2, w1 , h1);


i += 0.05;


}
