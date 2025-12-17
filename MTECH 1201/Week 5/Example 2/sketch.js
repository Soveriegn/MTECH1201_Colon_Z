

let wasp;

let xLoc, yLoc, rotatation

let obstacleXLocs = [];
let obstacleYLocs = [];
let obstacleDs = [];

function preload(){
  wasp = loadImage("wasp.png")
  print(wasp);
  angleMode(DEGREES)
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  imageMode(CENTER);
  noFill();
  stroke(255);
  noFill();

for(let i = 0; i < 10; i++){
  obstacleXLocs[i] = random(width);
  obstacleYLocs[i] = random(height);
  obstacleDs[i] = random(50, 200);
}

  xLoc = width/8;
  yLoc = height/2;
  rotation = 0;
}


function draw(){
 background(50);
 noFill();

obstacle(obstacleXLocs[i], obstacleYLocs[I], obstacleDs[i]);
 
moveWasp();
displayWasp(xLoc, yLoc, rotation);

function obstacle(x, y, d){
  ellipse(x, y, d);

  if(dist(xLoc, yLoc, x, y) < d/2){
  
    //background(255,100,0)
    textSize(30)
    //fill(255,100,0)
    text("Danger, wasp!", width/2, 100)
 }
}

function moveWasp(){
  if(keyIsDown(RIGHT_ARROW == true)){
    xLoc = xLoc += 4;
 }
  if(keyIsDown(LEFT_ARROW == true)){
    xLoc = xLoc -= 4;
    rotation = 180;
 }
  if(keyIsDown(UP_ARROW == true)){
      yLoc = yLoc -= 4;
      rotation = 90;
  }
  if(keyIsDown(DOWN_ARROW == true)){
      yLoc = yLoc -=4;
      rotation = 270;
  }

  if(keyIsDown(RIGHT_ARROW) == true && keyIsDown(UP_ARROW) == true){
    rotation = -45;
  }
  if(keyIsDown(LEFT_ARROW) == true && keyIsDown(DOWN_ARROW) == true){
    rotation = 45;
  }
  if(keyIsDown(LEFT_ARROW) == true && keyIsDown(UP_ARROW) == true){
    rotation = -135;
  } 
  if(keyIsDown(LEFT_ARROW) == true && keyIsDown(DOWN_ARROW) == true){
    rotation = -225;
  }
}

 function displkayWasp(x,y,r){
 push()
  translate(x, y)
  rotate(r)
  image(wasp,0 ,0 ,100,100)
 pop()
 }
return('wasp');

  

}


function mousePressed(){
  
}

//Create graphics object is for layering and setting up different canvases that handle different things differently
