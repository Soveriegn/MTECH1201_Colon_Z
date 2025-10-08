function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(100, 50);

  noStroke();
  stroke(0, 0, 255);
  line(0, 0, mouseX, mouseY);
  //ellipse(mouseX, mouseY, 50, 50);
  triangle(mouseX, mouseY - 25, mouseX - 25, mouseY + 25, mouseX + 25, mouseY + 25);

  console.log(mouseX, mouseY);
}
