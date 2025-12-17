let wasp;

function preload(){
  wasp = loadImage("wasp.png")
  print(wasp);
  angleMode(DEGREES)
  }

function setup(){
  createCanvas(windowWidth,windowHeight);
  imageMode(CENTER);
  noFill()
  stroke(255)
}


function draw(){
 background(50)
 noFill()

let x = width * noise(frameCount * 0.01)
let y = height * noise(frameCount * 0.01 + 10)
let r = 360 * noise(frameCount * 0.01, frameCount * 0.01 + 10)

if(dist(x, y, width/4, height/2) < 100){
  
    background(255, 100, 0)
    textSize(30)
    fill(255, 100, 0)
    text("Danger, Wasp!", width/2, 100)
  }
  ellipse(width/4, height/2, 200, 200)
  push()
    translate(x, y)
    rotate(r)
    image(wasp, 0 ,0 ,100, 100)
  pop()
}

function mousePressed(){  
}



// //My Code:
//   //Import photo 
//   let wasp; //Checked
//   // image takes time to load so we use preload function to load before setup and draw. it will load before setup and draw.
//   function preload() { //Checked
//     wasp = loadImage('wasp.png'); //Checked
//     print(wasp); //Checked
//     angleMode(DEGREES); //Checked 
//     //sets angle mode to degrees instead of radians
//   } //Checked
  
//   function setup() { //Checked
//     createCanvas(windowWidth, windowHeight); //Checked
//     imageMode(CENTER); // Checked //sets image mode to center so it draws from the center of the image. Put in Setup not draw to avoid resetting every frame.
//     noFill(); // Checked //no fill for shapes
//     stroke(255); // Checked //black stroke for shapes
//   }

//   function draw() { //Checked
//     background(50); //Checked //sets background to light grey
//     noFill(); //Checked //no fill for shapes

//     let x = width * noise(frameCount * 0.01); // Checked //noise function gives a number between 0 and 1 based on the number of milliseconds since the program started running. Multiplying by width gives a number between 0 and width.
//     let y = height * noise(frameCount * 0.01 + 10); // Checked //noise function gives a number between 0 and 1 based on the number of milliseconds since the program started running. Multiplying by height gives a number between 0 and height.
//     let r = 360 * noise(frameCount * 0.01, frameCount * 0.01 + 10); //Checked //noise function gives a number between 0 and 1 based on the number of milliseconds since the program started running. Multiplying by TWO_PI gives a number between 0 and TWO_PI.
    
//     if (dist(x, y, width/4, height/2) < 100) { //Fixed - Checked //if the distance between the noise x and y and the center of the canvas is less than 100
//       background (255, 100, 0); //Checked //change background to red
//       textSize(30); //Checked //set text size to 32);
//       fill(255, 100, 0); //Checked
//       text ("Danger! Wasp!", width/2, 100); //Checked //display text at center of canvas
//     } //Checked

//     ellipse (width/4, height/2, 200, 200); //Checked //draws a circle at the center of the canvas with a diameter of 100

//     push(); // Checked //saves the current state of the canvas
//     translate(x, y); //Checked //translates the canvas to the noise x and y
//     rotate(r); //Checked //rotates the canvas by r degrees
//     image(wasp, 0, 0, 100, 100); Checked //draws the image at mouseX and mouseY with width and height of 100
//     pop(); //Checked //restores the previous state of the canvas
//   } //Checked

//   function mousePressed () {
//   }

//   //Notes:
//   //print(milis()); Represents the number of milliseconds since the program started running
//   //modulo is the remainder of a division operation
//   //print(milis() % 1000); //prints the remainder of milliseconds divided by 1000
//   //print(floor(milis() / 1000)); //prints the number of seconds since the program started running

//   // if (millis() & 1000 == 0) {
//   //   xV = -xV;
//   //   yV = -yV;
//   //   rV = -rV;

