let startL = -100;
let startR = 100;
let startC = 100;
let startCU = 0;
let startRU = 0;
let startLU = 0;
let startLM;
let startCML;
let startRM;
let startCMR;
let startCDR;
let startCDL;
let startRD;
let startLD;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if(startR >= 0) {
    startLM = map(startL, -100, 0, -100, -71);
    startRM = map(startR, 0, 100, 71, 100);
    startCMR = map(startC, 0, 100, -71, 0);
    startCML = map(startC, 0, 100, -71, 0);
    startCDR = -10;
    startCDL = -10;
    startRD = map(startRU, 0, 100, 0, -10);
    startLD = 0;
    startL+=2;
    startR-=2;
    startC-=2;
    startCU+=2;
    startRU+=2;
    startLU+=2;
  }

  if(startR < 0 && startR >= -100) {
    startLM = map(startL, 0, 100, 71, 100);
    startRM = map(startR, 0, -100, 71, 0);
    startCMR = map(startC, 0, -100, -71, -100);
    startCML = map(startC, 0, -100, 71, 0);
    startCDR = map(startCU, 0, 100, 0, -10);
    startCDL = -10;
    startRD = -10;
    startLD = 0;
    startL+=2;
    startR-=2;
    startC-=2;
    startCU-=2;
    startRU-=2;
    startLU-=2;
  }

  if(startR < -100 && startR >= -200) {
    startLM = map(startL, 100, 200, 100, 71);
    startRM = map(startR, -100, -200, 0, -71);
    startCMR = map(startC, -100, -200, -100, -71);
    startCML = map(startC, -100, -200, 0, -71);
    startCDR = 0;
    startCDL = -10;
    startRD = -10;
    startLD = map(startLU, 0, 100, 0, -10);
    startL+=2;
    startR-=2;
    startC-=2;
    startCU+=2;
    startRU+=2;
    startLU+=2;
  }

  if(startR < -200 && startR >= -300) {
    startLM = map(startL, 200, 300, 71, 0);
    startRM = map(startR, -200, -300, 71, 100);
    startCMR = map(startC, -200, -300, 71, 0);
    startCML = map(startC, -200, -300, -71, -100);
    startCDL = map(startCU, 0, 100, 0, -10);
    startCDR = -10;
    startRD = 0;
    startLD = -10;
    startL+=2;
    startR-=2;
    startC-=2;
    startCU-=2;
    startRU-=2;
    startLU-=2;
  }

  if(startR < -300) {
    startL = -100;
    startR = 100;
    startC = 100
    startRU = 0;
    startCU = 0;
    startLU = 0;
  }

  push();
  translate(windowWidth/2, windowHeight/2);
  background(255);
  fill(240);
  triangle(startCML, startCDL, startLM, startLD, 0, -195);
  triangle(startCMR, startCDR, startRM, startRD, 0, -195);
  fill(210);
  triangle(startCML, startCDL, startLM, startLD, 0, 200);
  triangle(startCMR, startCDR, startRM, startRD, 0, 200);
  pop();
}