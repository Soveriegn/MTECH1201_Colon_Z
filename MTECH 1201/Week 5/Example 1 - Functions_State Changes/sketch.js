let wasp;

function preload(){
  wasp = loadImage("wasp.png")
  print(wasp);
  angleMode(DEGREES)
  
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  imageMode(CENTER);
  noFill()
  stroke(255)
}


function draw(){
 background(50)
//  noFill()

// let x = width * noise(frameCount* 0.01)
// let y = height * noise(frameCount*0.01 +10)
// let r = 360* noise(frameCount*0.01,frameCount*0.01 +10  )

// if(dist(x,y, width/4, height/2) < 100){
  
//     background(255,100,0)
//     textSize(30)
//     fill(255,100,0)
//     text("Danger, wasp!", width/2, 100)

//  }


//  ellipse(width/4, height/2, 200,200)
}

displayWasp(width & noise , 100, 0);
displayWasp(1200, 500, 187);

//Pass the x and y coordinates and rotation in the arguement
//Can create new function for different objects its more organized
function displayWasp(x, y){
  translate(x, y);
  image(wasp,0 ,0 ,100,100);
}


function mousePressed(){
  
}


