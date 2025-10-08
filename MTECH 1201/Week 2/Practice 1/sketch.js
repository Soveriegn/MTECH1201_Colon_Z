function setup() {
  // Canvas Properties
  createCanvas(windowWidth, windowHeight);
  background(100);

  //UI Element: Program Shelf
  fill(150)
  rect(5, 5, 360, 50, 50, 50);
  fill(0, 255, 0);
  rect(10, 10, 60, 40, 50, 50);

  //UI Element: Main Tool Shelf
  fill(150)
  rect(0, 600, 1440, 100, 50, 50);
  fill(0, 255, 0);
  //UI Element: Main Tool Locations - Will need tags for tool name and clarity of tool function
  ellipse(50, 650, 80, 80); //Ellipse
  ellipse(150, 650, 80, 80);//Square
  ellipse(250, 650, 80, 80);//Triangle
  ellipse(350, 650, 80, 80);//Rectangle
  ellipse(450, 650, 80, 80);//Circle - Change is easy from ellipse
  ellipse(550, 650, 80, 80);//Quad
  //UX Element: Seperation of 2D Primitive Shapes from 2D Point Primitives (i.e. arc, point, line)
  ellipse(650, 650, 80, 80);//Point
  ellipse(750, 650, 80, 80);//Line
  ellipse(850, 650, 80, 80);//Arc
  //UX Element: Seperation of 3D Primitive Shapes
  ellipse(950, 650, 80, 80);//
  ellipse(1050, 650, 80, 80);//
  ellipse(1150, 650, 80, 80);//
  ellipse(1250, 650, 80, 80);//
  //UX Element: Seperation of Primitives from expandable tool bar
  rect(1310, 610, 120, 80, 50, 50);
}

function draw() {

}
