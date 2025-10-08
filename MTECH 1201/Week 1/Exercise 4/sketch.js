//Variable outside of functions are global
//Variables inside of functions are local
let col, col2, col3;
///let col;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  strokeWeight(4);
  noFill();

  col1 = color("#851400");
  col2 = color("#00e2f2");
}
//called a function
function draw() {
  //background(0); - This will make the circle leave a trail
  //Anything that is going to change over time goes in draw
  //Anything that is static and not changing goes in setup
  //Setup only runs once
  //Draw loops over and over again
  //Written Function Code also any time you want anything changed over time its going to be in draw not setup. Setup only loops once.
  //Grey Background
  //background(220);

  //Black Background

  //Red Circle Color
  //fill(255, 0, 0);

    //Green Circle Color
    //fill(0, 255, 0);
    //Adding devision to functions will slow it down depending on the number

    //Mapping the color to the mouse position - Theses are variables so they can be used in the color function
  //let R = map(mouseX, 0, width, 0, 255);
  //let B = map(mouseX, 0, width, 255, 0);

  //col = color(R, 0, B);

let i = map(mouseX, 0, width, 0, 1);
  
col = lerpColor(col1, col2, i);

  //console.log(R);

  //Blue Circle Color

  stroke(col);
  line(pmouseX, pmouseY, mouseX, mouseY);

  filter(BLUR, 1);
  //fill(col);
  //Draw Circle at Mouse Position
  //ellipse(mouseX, mouseY, 150);
}
