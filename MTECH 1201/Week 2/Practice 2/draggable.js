class Draggable {
  constructor(x, y, w, h) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x; // Location of ellipse X
    this.y = y; // Location of ellipse Y
    this.w = w; // Width of ellipse
    this.h = h; // Height of ellipse
    this.offsetX = 0; // Mouseclick offset X
    this.offsetY = 0; // Mouseclick offset Y
  }

    over() { // Is mouse over object
      if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
        this.rollover = true;
      } else {
        this.rollover = false;
      }
}

    update() { // Adjust location if being dragged
      if (this.dragging) {
        this.x = mouseX + this.offsetX;
        this.y = mouseY + this.offsetY;
      }
    }

    show() { // Draw the ellipse
      stroke(0);
        if (this.dragging) {
            fill(50);
        } else if (this.rollover) {
            fill(100);
        } else {
            fill(175, 200);
        }
      ellipse(this.x, this.y, this.w, this.h);
    }

    pressed() { // Did I click on the elipses?
      if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
        this.dragging = true;
        // If so, keep track of relative location of click to corner of rectangle
        this.offsetX = this.x - mouseX;
        this.offsetY = this.y - mouseY;
      }
    }

    released() { // Quit dragging
      this.dragging = false;
    }
}