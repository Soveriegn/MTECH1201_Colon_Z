//Author: Zachary Colon
//Date: 2024-02-01
//Description: This is a simple drawing program that allows the user to draw lines on the canvas. The color of the line changes based on the mouse position and movement.
//Notes: Reference and Examples helped me find something I wanted to do. Rather than free right I switched it to show single line from classroom exercises
function setup() {
  //Canvas size - Could not do windowWidth and windowHeight because of the line thickness - Copilot taught me that
  createCanvas(800, 800);

}

function draw() {
  triangle(0, 350, 350, 200, 450, 350);
  //Background color set to black to show the color changes better
  background(0, 0, 0);
  //Stroke Weight is the thickness of the line
  strokeWeight(25);
  // If you add this to code it did something cool but weird and I do not get it. 
  stroke();
  circle(mouseX, mouseY, 200, 200, 150, 50);
  //line thickness
  line(0, 0, mouseX, mouseY);
  //Setting color mode to HSB so I can use hue, saturation, and brightness to set the color of the line based on mouse position and movement.
  colorMode(HSB);
}
//Function that draws a line when the mouse is dragged. The color of the line changes based on mouse position.
function mouseDragged() {
  let lineHue = mouseX - mouseY;
  stroke(lineHue, 90, 90);
  line(pmouseX, pmouseY, mouseX, mouseY);
}
