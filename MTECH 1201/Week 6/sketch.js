let col, col1, col2;
let button1, button2;

function setup() {

  button1 = createButton('Change Background to Light');
  button1.position(20, 20);
  button1.mousePressed(changeBGLight);

  button2 = createButton('Change Background to Dark');
  button2.position(250, 20);
  button2.mousePressed(changeBGDark);

  function changeBGLight() {
    background(225);
  }

  function changeBGDark() {
    background(0);
  }
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  
}
