function setup() {
  createCanvas(400, 400);


}

function draw() {
  background(220);

  if (x > width) {
    xV = -xV;
  }
  if (y > height) {
    yV = -yV;
  }
  if (x < 0) {
    xV = -xV;
  }
  if (y < 0) {
    yV = -yV;
  }

  // Update position by velocity each frame (If you keep x alone it will only move in the x direction)
  x = x + xV;
  y = y + yV;

  circle(x, y, 20);
}
