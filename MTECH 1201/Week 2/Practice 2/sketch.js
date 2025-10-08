//Variables
  //Declared Variables
    let shape1;
    let shape2;
    let shape3;
    let shape4;

//Function Setup and Draw
  //Canvas Creation and Object Initialization
  function setup() {
    createCanvas(windowHeight, windowWidth);
    shape1 = new Draggable(100, 100, 50, 50);
    shape2 = new Draggable(150, 100, 50, 50);
    shape3 = new Draggable(200, 100, 50, 50);
    shape4 = new Draggable(250, 100, 50, 50);
  }

  //Draw Loop - Repeatedly executes the lines of code contained inside its block until the program is stopped or noLoop() is called.
  function draw() {
    background(255);
    shape1.over();
    shape1.update();
    shape1.show();
    shape2.over();
    shape2.update();
    shape2.show();
    shape3.over();
    shape3.update();
    shape3.show();
    shape4.over();
    shape4.update();
    shape4.show();

  stroke(0, 0, 255);
  line(0, 0, mouseX, mouseY);
  noStroke();
  ellipse(mouseX, mouseY, 50, 50);

  }
//Functions for Mouse Interaction
  //Mouse Pressed Function
  function mousePressed() {
    shape1.pressed();
    shape2.pressed();
    shape3.pressed();
    shape4.pressed();
  }

  //Mouse Released Function
  function mouseReleased() {
    shape1.released();
    shape2.released();
    shape3.released();
    shape4.released();
  }