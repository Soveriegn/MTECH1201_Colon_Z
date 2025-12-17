
// let graphic;

// let gameState = "START";

// function setup() {
//   describe(
//     'Black canvas with a very dark grey rectangle in the middle. When the cursor is hovered over the canvas, a white circle follows the cursor in the black areas of the canvas, but not over the dark grey rectangle.'
//   );
//   createCanvas(windowWidth, windowHeight);


//   graphic = createGraphics(windowWidth, windowHeight);
// }

// function draw() {
//   if (gameState === "START") {
//     startScreen();
//   } else if (gameState === "TRANSITION") {
//     gameScreen();
//   } else if (gameState === "GAME") {
//     gameScreen();
//   } else if (gameState === "END") {
//     endScreen();
//   }


 
//   background(0, 12);


//   fill(255);
//   noStroke();
//   ellipse(mouseX, mouseY, 30, 30);


//   graphic.background(51);

//   graphic.noFill();


//   graphic.stroke(255);

//   graphic.ellipse(mouseX + 0, mouseY + 0, 30, 30);


//   image(graphic, 0, 0);
// }


let wasp;
let xLoc, yLoc, rotation;

let obstacleXLocs = []
let obstacleYLocs = []
let obstacleDs = []

let numObstacles = 30
let crossedObstacle = false;
let pCrossedObstacle = false; 

let count = 0;

let g

function preload(){
  wasp = loadImage("wasp.png")
  print(wasp);
  angleMode(DEGREES)
  
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  noFill()
  stroke(255)

  g = createGraphics(width, height);
  g.background(255,100,0)

  for(let i = 0; i<numObstacles; i++){
    obstacleXLocs[i] = random(width)
    obstacleYLocs[i] = random(height)
    obstacleDs[i] = random(10,100) //Increase amount over time, and limit per stage
  }

  print(obstacleXLocs)

  xLoc = width/8
  yLoc = height/2
  rotation = 0
}


function draw(){


 crossedObstacle = false;

 background(50)
 
for(let i = 0; i<numObstacles; i++){
  obstacle(obstacleXLocs[i], obstacleYLocs[i], obstacleDs[i])
}
 moveWasp()
 displayWasp(xLoc, yLoc, rotation);

 if(crossedObstacle == true){
   imageMode(CORNER);
   textSize(30)
   fill(255)
   image(g,0,0)
   text("obstacle!", width/2, 100)
   noFill()
 }


 if(pCrossedObstacle == false && crossedObstacle == true){
   count++
   print(count)
 }
 

 if(count>3){
   imageMode(CORNER);
   textSize(30)
   fill(255)
   image(g,0,0)
   text("game over", width/2, 100)
  noLoop()
 }




 pCrossedObstacle = crossedObstacle;
 
 
}


function obstacle(x, y, d){

  ellipse(x, y, d)


  if(dist(xLoc,yLoc, x,y) < d/2){
    crossedObstacle = true;  
    // background(255,100,0)
 }
 

 

}

function moveWasp(){
  //Dev Note: Cant I create a variable that associates WASD with ARROW_UP, ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT

  // Update x and y if a key is pressed.
  // if (keyIsPressed === true) {
  //   if (key === 'w') {
  //     yLoc -= 1;
  //   } else if (key === 's') {
  //     yLoc += 1;
  //   } else if (key === 'a') {
  //     xLoc -= 1;
  //   } else if (key === 'd') {
  //     xLoc += 1;
  //   }
  // }

  //Dev Notes: Code Not Working. Was but amalgamating the two different codes together for movement from Arrows to WASD did not work. 
  // Update x and y if a key is pressed.
  if (keyIsPressed === true) {
    if (keyIsDown(key === 'w') === true) {
      yLoc-=4;
      rotation = 270
    } 
    else if (keyIsDown(key === 's') === true) {
      yLoc+=4;
      rotation = 90
    } 
    else if (keyIsDown(key === 'a') === true){
      xLoc-=4;
      rotation = 180
    } 
    else if (keyIsDown(key === 'd') ){
      xLoc+=4;
      rotation = 0
    }
    if(keyIsDown(key === 'D') == true && keyIsDown(key === 'W') === true){
      rotation = -45;
    }
    if(keyIsDown(key === 'D') === true && keyIsDown(key === "S") === true){
      rotation =  45;
    }
    if(keyIsDown(key === 'A') === true && keyIsDown(key === 'W') === true){
      rotation = -135;
    }
    if(keyIsDown(key === 'A') === true && keyIsDown(key === "S") === true){
      rotation = - 225;
    }

  }
// Working Movement Code: Arrow Keys

    // if(keyIsDown(RIGHT_ARROW) === true){
    //   xLoc+=4;
    //   rotation = 0
    // }
    // if(keyIsDown(LEFT_ARROW) === true){
    //   xLoc-=4;
    //   rotation = 180
    // }
    //   if(keyIsDown(UP_ARROW) === true){
    //   yLoc-=4;
    //   rotation = 270
    // }
    // if(keyIsDown(DOWN_ARROW) === true){
    //   yLoc+=4;
    //   rotation = 90
    // }

    // if(keyIsDown(RIGHT_ARROW) === true && keyIsDown(UP_ARROW) === true){
    //   rotation = -45
    // }

    // if(keyIsDown(RIGHT_ARROW) === true && keyIsDown(DOWN_ARROW) === true){
    //   rotation =  45
    // }

    // if(keyIsDown(LEFT_ARROW) === true && keyIsDown(UP_ARROW) === true){
    //   rotation = -135
    // }
    // if(keyIsDown(LEFT_ARROW) === true && keyIsDown(DOWN_ARROW) === true){
    //   rotation = - 225
    // }

}
function displayWasp(x, y, r){

  imageMode(CENTER);

  // pass the x, y coordinates and the rotation in the argument
  push()
    translate(x, y);
    rotate(57+r)
    image(wasp,0 ,0 ,100,100)
  pop()
  
}


function mousePressed(){

}





 