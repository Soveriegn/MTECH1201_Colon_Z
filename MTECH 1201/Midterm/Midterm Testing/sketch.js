// Game configuration
// Define constants for game settings and colors
const CONFIG = {
  STATES: { START: 'start', PLAY: 'play', GAMEOVER: 'gameover' },
  BUTTON: { WIDTH: 220, HEIGHT: 56 },
  OBSTACLE: {
    MIN_SIZE: 10,
    MAX_SIZE: 100,
    MIN_GAP: 4,
    INITIAL_COUNT: 30,
    INCREMENT: 2
  },
  SAFE_ZONE: { RADIUS: 150 },
  GOAL: { SIZE: 80 },
  PLAYER: {
    SPEED: 8,
    SIZE: 100
  },
  COLORS: {
    GOAL: {
      FILL: [135, 206, 235],   // sky blue
      STROKE: [255, 215, 0]    // gold
    },
    OVERLAY: [255, 100, 0],     // orange
    BORDER: [255, 255, 255]    // white
  },
  BORDER: {
    THICKNESS: 5
  }
};

// Game state variables
const gameState = {
  mode: CONFIG.STATES.START,
  player: {
    x: 0,
    y: 0,
    rotation: 0
  },
  obstacles: {
    positions: [],  // Array of {x, y, d} objects
    count: CONFIG.OBSTACLE.INITIAL_COUNT
  },
  goal: {
    x: 0,
    y: 0
  },
  score: {
    hits: 0,
    goals: 0,
    lastHits: false,
    hitTime: 0,  // frameCount when last hit occurred
    flashDuration: 30  // number of frames the flash lasts
  }
};

// UI element placeholders
const ui = {
  wasp: null,
  startScreen: null,
  gameOverScreen: null,
  overlay: null,
  buttons: {
    play: { x: 0, y: 0, w: CONFIG.BUTTON.WIDTH, h: CONFIG.BUTTON.HEIGHT },
    replay: { x: 0, y: 0, w: CONFIG.BUTTON.WIDTH, h: CONFIG.BUTTON.HEIGHT }
  }
};

// Preload assets
function preload() {
  ui.wasp = loadImage("wasp.png");
  angleMode(DEGREES);
}

// Setup function
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Initialize game state
  gameState.player.x = width/8;
  gameState.player.y = height/2;
  gameState.goal.x = width * 7/8;
  gameState.goal.y = height/2;
  
  // Initialize User Interface overlay
  ui.overlay = createGraphics(width, height);
  ui.overlay.background(...CONFIG.COLORS.OVERLAY);
  
  // Initialize screens
  initScreens();

  // Initialize game variables and obstacles
  initGame();
}

// Main draw loop - game state management
function draw() {
  // Clear the screen based on game mode
  // and draw appropriate elements

    //Game Sart Screen
  switch(gameState.mode) {
    case CONFIG.STATES.START:
      drawStartScreen();
      break;
    // Main Gameplay
    case CONFIG.STATES.PLAY:
      drawGameScreen();
      updateGame();
      break;
    //Game Over Screen
    case CONFIG.STATES.GAMEOVER:
      background(20);
      imageMode(CORNER);
      image(ui.gameOverScreen, 0, 0);
      break;
  }
}

// Draw the start screen
function drawStartScreen() {
  background(20);
  imageMode(CORNER);
  image(ui.startScreen, 0, 0);
}

function drawGameScreen() {
  // Draw base game elements
  background(50);
  
  // Set default drawing style
  noFill();
  stroke(255);
  strokeWeight(1);
  
  // Draw goal
  drawGoal();
  
  // Draw obstacles
  gameState.obstacles.positions.forEach(drawObstacle);
  
  // Draw player
  drawPlayer();
  
  // Draw lives
  drawLives();
  
  // Draw border last so it's always on top - Container for gameplay area
  drawBorder();
  
  // Draw hit flash effect if recently hit - Same logic as in previous code but with time, not frames
  if (gameState.score.hitTime > 0) {
    const timeSinceHit = frameCount - gameState.score.hitTime;
    //Logic for hit flash effect duration (Not tied to frame rate - uses frame count difference and works half the time)
    if (timeSinceHit < gameState.score.flashDuration) {
      // Calculate flash opacity (starts at 100%, fades to 0%) - gives damage effect
      const flashAlpha = map(timeSinceHit, 0, gameState.score.flashDuration, 200, 0);
      push();
      fill(255, 0, 0, flashAlpha);
      noStroke();
      rect(0, 0, width, height);
      
      /// Flash text effect - displays "Ouch!" in center of screen
      // Draw "OBSTACLE!" text
      textAlign(CENTER, CENTER);
      textSize(30);
      fill(255);
      text("OUCH!", width/2, height/2);
      pop();
    } else {
      //Attempted to have hit time flash but keep score and broke code - resetting hit time to 0 after flash duration ficxed it
      gameState.score.hitTime = 0; // Reset hit time when flash is done
    }
  }
}

//Game border drawing function
function drawBorder() {
  push();
  stroke(...CONFIG.COLORS.BORDER);
  strokeWeight(CONFIG.BORDER.THICKNESS);
  noFill();
  rect(0, 0, width, height);
  pop();
}

//Life bar drawing function - Semi functional - displays remaining lives as wasp icons
function drawLives() {
  const iconSize = 30;  // Size of each life icon
  const padding = 10;   // Padding from screen edges
  const spacing = 5;    // Space between icons
  
  imageMode(CENTER);
  for (let i = 0; i < 3 - gameState.score.hits; i++) {
    const x = padding + iconSize/2 + (iconSize + spacing) * i;
    const y = height - padding - iconSize/2;
    image(ui.wasp, x, y, iconSize, iconSize);
  }
  
  // Reset imageMode for other drawings
  imageMode(CENTER);
}

function handleCollision() {
  gameState.score.hits++;
  gameState.score.hitTime = frameCount; // Record when hit occurred
  gameState.score.lastHits = true;
  
  // Only transition to game over if all lives are lost
  if (gameState.score.hits >= 3) {
    gameState.mode = CONFIG.STATES.GAMEOVER;
  }
}

function updateGame() {
  // Check goal collision
  if (dist(gameState.player.x, gameState.player.y, gameState.goal.x, gameState.goal.y) < CONFIG.GOAL.SIZE/2) {
    levelUp();
    return;
  }
  
  // Update player
  updatePlayer();
  
  // Check obstacle collisions
  const hit = checkObstacleCollisions();
  
  // Only count new hits, not continuous collision
  if (hit && !gameState.score.lastHits) {
    handleCollision();
  }
  
  // Update hit state for next frame
  gameState.score.lastHits = hit;
}

function drawGoal() {
  push();
  stroke(...CONFIG.COLORS.GOAL.STROKE);
  strokeWeight(3);
  fill(...CONFIG.COLORS.GOAL.FILL);
  ellipse(gameState.goal.x, gameState.goal.y, CONFIG.GOAL.SIZE);
  pop();
}



function drawObstacle(obstacle) {
  ellipse(obstacle.x, obstacle.y, obstacle.d);
}

function checkObstacleCollisions() {
  return gameState.obstacles.positions.some(obs => 
    dist(gameState.player.x, gameState.player.y, obs.x, obs.y) < obs.d/2
  );
}

function updatePlayer() {
  const { SPEED } = CONFIG.PLAYER;
  let dx = 0, dy = 0;
  
  // Horizontal movement
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) dx += SPEED;
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) dx -= SPEED;
  
  // Vertical movement
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) dy -= SPEED;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) dy += SPEED;
  
  // Calculate new position
  const newX = gameState.player.x + dx;
  const newY = gameState.player.y + dy;
  
  // Check border collision
  const halfSize = CONFIG.PLAYER.SIZE / 2;
  const borderPadding = CONFIG.BORDER.THICKNESS;
  
  if (newX - halfSize < borderPadding || 
      newX + halfSize > width - borderPadding || 
      newY - halfSize < borderPadding || 
      newY + halfSize > height - borderPadding) {
    // Border collision occurred
    if (!gameState.score.lastHits) {
      handleCollision();
    }
    // Don't update position on collision
    return;
  }
  
  // No collision, update position
  gameState.player.x = newX;
  gameState.player.y = newY;
  gameState.score.lastHits = false;
  
  // Update rotation
  if (dx || dy) {
    gameState.player.rotation = atan2(dy, dx);
  }
}

function drawPlayer() {
  imageMode(CENTER);
  push();
  translate(gameState.player.x, gameState.player.y);
  rotate(gameState.player.rotation);
  image(ui.wasp, 0, 0, CONFIG.PLAYER.SIZE, CONFIG.PLAYER.SIZE);
  pop();
}

function moveWasp(){
  //Depriecated Code - Wasp movement with WASD and Arrow Keys not orienting properly due to rotation logic adjusting for diagonal sprite not aligned with P5js orientation -
  // In P5js right = 0, down = 90, left = 180, up = 270
  //Also no movement speed variable for consistent speed in diagonal movement

  // //Added movement controls WASD in addition to arrow keys
  //   // Right - D or Right Arrow
  //   if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
  //     //xLoc +=4;
  //     rotation = 0
  //   }
  //   // Left - A or Left Arrow
  //   if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){
  //     //xLoc -=4;
  //     rotation = 180
  //   }
  //   // Up - W or Up Arrow
  //     if(keyIsDown(UP_ARROW) || keyIsDown(87)){
  //     //yLoc -=4;
  //     rotation = 270
  //   }
  //   // Down - S or Down Arrow
  //   if(keyIsDown(DOWN_ARROW) || keyIsDown(83)){
  //     //yLoc +=4;
  //     rotation = 90
  //   }
  //   // Diagonal Movement - W + D & Up + Right (Northeast)
  //   if(keyIsDown(RIGHT_ARROW) || keyIsDown(68) && keyIsDown(UP_ARROW) || keyIsDown(87)){
  //     rotation = -45
  //   }
  //   // Diagonal Movement - S + D & Down + Right (Southeast)
  //   if(keyIsDown(RIGHT_ARROW) || keyIsDown(68) && keyIsDown(DOWN_ARROW) || keyIsDown(83)){
  //     rotation =  45
  //   }
  //   // Diagonal Movement - W + A & Up + Left (Northwest)
  //   if(keyIsDown(LEFT_ARROW) || keyIsDown(65) && keyIsDown(UP_ARROW) || keyIsDown(87) ){
  //     rotation = -135
  //   }
  //   // Diagonal Movement - S + A & Down + Left (Southwest)
  //   if(keyIsDown(LEFT_ARROW) || keyIsDown(65) && keyIsDown(DOWN_ARROW) || keyIsDown(83) ){
  //     rotation = 135
  //   }
  let moveSpeed = 8;

  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    xLoc += moveSpeed;
    rotation = 0;
}

if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    xLoc -= moveSpeed;
    rotation = 180;
}

if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    yLoc -= moveSpeed;
    rotation = 270;
}

if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    yLoc += moveSpeed;
    rotation = 90;
}

// Diagonal Movement
if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && (keyIsDown(UP_ARROW) || keyIsDown(87))) {
    rotation = 315; // Northeast
}

if ((keyIsDown(RIGHT_ARROW) || keyIsDown(68)) && (keyIsDown(DOWN_ARROW) || keyIsDown(83))) {
    rotation = 45; // Southeast
}

if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && (keyIsDown(UP_ARROW) || keyIsDown(87))) {
    rotation = 225; // Northwest
}

if ((keyIsDown(LEFT_ARROW) || keyIsDown(65)) && (keyIsDown(DOWN_ARROW) || keyIsDown(83))) {
    rotation = 135; // Southwest
}
}

function displayWasp(x, y, r){

  imageMode(CENTER);
  push()
    translate(x, y);
    rotate(r)
    image(wasp,0 ,0 ,100,100)
  pop()
  
}


function mousePressed(){
  // If we're on the start screen, transition to the game on the first click.
  if (gameState.mode === CONFIG.STATES.START) {
    // require clicking the Play button to begin
    if (isPointInRect(mouseX, mouseY, ui.buttons.play)) {
      gameState.mode = CONFIG.STATES.PLAY;
    }
    return;
  }

  if (gameState.mode === CONFIG.STATES.GAMEOVER) {
    // replayBtn coords are relative to the canvas
    if (isPointInRect(mouseX, mouseY, ui.buttons.replay)) {
      resetGame();
      gameState.mode = CONFIG.STATES.START;
    }
    return;
  }
}


// Reset game variables to initial state (as if the page was refreshed)
function resetGame(){
  // Reset game state
  gameState.score.goals = 0;
  gameState.score.hits = 0;
  gameState.score.lastHits = false;
  gameState.score.hitTime = 0;
  gameState.obstacles.count = CONFIG.OBSTACLE.INITIAL_COUNT;
  
  // reinitialize game variables and obstacles
  initGame();

  // recreate overlay graphic
  ui.overlay = createGraphics(width, height);
  ui.overlay.background(...CONFIG.COLORS.OVERLAY);

  // redraw screens
  initScreens();
}

// Helper: test point inside rect
function isPointInRect(px, py, r){
  return px >= r.x && px <= r.x + r.w && py >= r.y && py <= r.y + r.h;
}

// Initialize or reset the arrays/positions used by the game
function initGame() {
  // Reset game state
  gameState.obstacles.positions = [];
  gameState.player.x = width/8;
  gameState.player.y = height/2;
  gameState.player.rotation = 0;
  gameState.score.lastHits = false;
  
  placeObstacles();
}

function placeObstacles() {
  const { MIN_SIZE, MAX_SIZE, MIN_GAP } = CONFIG.OBSTACLE;
  const maxAttempts = 1000;
  
  for (let i = 0; i < gameState.obstacles.count; i++) {
    let placed = false;
    let attempts = 0;
    let d = random(MIN_SIZE, MAX_SIZE);
    
    while (!placed && attempts < maxAttempts) {
      const obstacle = {
        x: random(d/2, width - d/2),
        y: random(d/2, height - d/2),
        d: d
      };
      
      if (isValidObstaclePosition(obstacle)) {
        gameState.obstacles.positions.push(obstacle);
        placed = true;
      } else {
        attempts++;
        if (attempts % 200 === 0) {
          d = max(MIN_SIZE, d - 5);
          obstacle.d = d;
        }
      }
    }
    
    if (!placed) {
      // Fallback: place with minimum size at random position
      gameState.obstacles.positions.push({
        x: random(MIN_SIZE/2, width - MIN_SIZE/2),
        y: random(MIN_SIZE/2, height - MIN_SIZE/2),
        d: MIN_SIZE
      });
    }
  }
}

function isValidObstaclePosition(obstacle) {
  const { MIN_GAP } = CONFIG.OBSTACLE;
  const borderPadding = CONFIG.BORDER.THICKNESS;
  
  // Check if too close to border
  const radius = obstacle.d/2 + MIN_GAP;
  if (obstacle.x - radius < borderPadding || 
      obstacle.x + radius > width - borderPadding ||
      obstacle.y - radius < borderPadding || 
      obstacle.y + radius > height - borderPadding) {
    return false;
  }
  
  // Check start zone
  if (dist(obstacle.x, obstacle.y, gameState.player.x, gameState.player.y) < 
      CONFIG.SAFE_ZONE.RADIUS + obstacle.d/2) {
    return false;
  }
  
  // Check goal zone
  if (dist(obstacle.x, obstacle.y, gameState.goal.x, gameState.goal.y) < 
      (CONFIG.GOAL.SIZE + obstacle.d)/2 + MIN_GAP) {
    return false;
  }
  
  // Check other obstacles
  return !gameState.obstacles.positions.some(other => {
    const minDist = (obstacle.d + other.d)/2 + MIN_GAP;
    return dist(obstacle.x, obstacle.y, other.x, other.y) < minDist;
  });
}

// Create and draw the start and game-over graphics
function initScreens(){
  ui.startScreen = createGraphics(width, height);
  ui.gameOverScreen = createGraphics(width, height);
  drawStartGraphics(ui.startScreen);
  drawGameOverGraphics(ui.gameOverScreen);
}

function drawStartGraphics(buf){
  buf.background(20, 30, 60);
  buf.textAlign(CENTER, CENTER);
  buf.fill(255);
  buf.textSize(64);
  // Title uses the same size/placement as the Game Over title for consistency
  // compute title position
  const titleY = buf.height/2 - 60;
  buf.text('Bee Game', buf.width/2, titleY);
  // wasp image above title with ~0.25in padding (approx 24px at 96dpi)
  const imgH = 80;
  const padding = 24; // pixels
  const imgX = buf.width/2 - imgH/2;
  const imgY = titleY - padding - imgH; // place image above title with padding
  if (ui.wasp) buf.image(ui.wasp, imgX, imgY, imgH, imgH);

  // draw Play button centered under the title
  ui.buttons.play.x = buf.width/2 - CONFIG.BUTTON.WIDTH/2;
  ui.buttons.play.y = buf.height/2;
  buf.noStroke();
  buf.fill(40, 160, 80);
  buf.rect(ui.buttons.play.x, ui.buttons.play.y, CONFIG.BUTTON.WIDTH, CONFIG.BUTTON.HEIGHT, 8);
  buf.fill(255);
  buf.textSize(22);
  buf.text('Play', buf.width/2, ui.buttons.play.y + CONFIG.BUTTON.HEIGHT/2);
}

function levelUp() {
  gameState.score.goals++;
  gameState.obstacles.count += CONFIG.OBSTACLE.INCREMENT;
  initGame();
}



function drawGameOverGraphics(buf){
  buf.background(30, 20, 40);
  buf.textAlign(CENTER, CENTER);
  buf.fill(255);
  buf.textSize(64);
  buf.text('Game Over', buf.width/2, buf.height/2 - 60);

  // center the replay button
  ui.buttons.replay.x = buf.width/2 - CONFIG.BUTTON.WIDTH/2;
  ui.buttons.replay.y = buf.height/2;
  
  // Add score text below the button with padding
  buf.textSize(28);
  buf.text('Goals Reached: ' + gameState.score.goals, buf.width/2, ui.buttons.replay.y + CONFIG.BUTTON.HEIGHT + 40);

  buf.fill(200, 40, 40);
  buf.noStroke();
  buf.rect(ui.buttons.replay.x, ui.buttons.replay.y, CONFIG.BUTTON.WIDTH, CONFIG.BUTTON.HEIGHT, 8);
  buf.fill(255);
  buf.textSize(22);
  buf.text('Replay', buf.width/2, ui.buttons.replay.y + CONFIG.BUTTON.HEIGHT/2);
}


