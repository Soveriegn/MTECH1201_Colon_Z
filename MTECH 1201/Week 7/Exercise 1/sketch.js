let students = ['Alice', 'Bob', 'Charlie', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah'];

function setup() {
  createCanvas(windowWidth, windowRHeight);
  testSize(40)
  textAlign(CENTER, CENTER);
}

function draw() {
  background (255);
  text(students[0], width/2, height/2);
}

function mousePressed() {
  let index = floor(random(0)(students.length));

  //student = sttudents[index];
  students = students .splice(index, 1);

  console.log(students);
  }
//Array function  splice to lop off array elements that have already been cycled through
//NaN means not a number, usually from an invalid math operation
