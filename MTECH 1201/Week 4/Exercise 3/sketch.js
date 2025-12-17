function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

let r = 0;
let x = 0, y = 0;
let xV = 1, yV = 1, rV = 1;

function draw() {
  background(220);

  translate(100, 100); // Moves canvas origin to (100, 100)
  ellipse(0, 0, 50); // Moves elipse to top-left corner

  //push(); // Isolates the following transformations
    // translate(100, 100); 
    // ellipse(0, 0, 50); 
    // translate(100, 100); 
    // ellipse(0, 0, 50); 
    // translate(100, 100); 
    // ellipse(0, 0, 50); 
    // translate(100, 100); 
    // ellipse(0, 0, 50); 
    // translate(100, 100); 
    // ellipse(0, 0, 50); 
  //pop();// Restores the previous transformation state

  //Functions accumulate on top of eachother and are applied in order. Duplicate transformations will compound. 
  translate (width/2, height/2);
  rotate(r);
  line(0, 0, 200, 0);
  
  push ();
    r ++;

    x++

    y++;
  pop ();

}

function mousePressed() {
  //xV = -xV;
  //yV = -yV;

  xV = -xV;
  yV = -yV;
  rV = -rV;

}
//Say translate before rotate if you want object to stay at origin and rotate around vs the whole canvas rotating around the origin