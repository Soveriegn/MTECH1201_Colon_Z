//works like CSS setting up variables for colors, sizes, speeds, etc.

// Game configuration
// Define constants for game settings and colors to be called throughout the code
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

// Game state variables - tracks current mode, player position, obstacles, goal, and score
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
    flashDuration: 60  // number of frames the flash lasts
  }
};

// UI element placeholders - will hold images and button positions
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

  let mySound = loadSound('Beehave.wav');
}

// Setup function
function setup() {
  createCanvas(windowWidth, windowHeight);

  mySound = loadSound('Beehave.wav');

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
  
  // Draw wasp icons for remaining lives
  imageMode(CENTER);
  for (let i = 0; i < 3 - gameState.score.hits; i++) {
    const x = padding + iconSize/2 + (iconSize + spacing) * i;
    const y = height - padding - iconSize/2;
    image(ui.wasp, x, y, iconSize, iconSize);
  }
  
  // Reset imageMode for other drawings
  imageMode(CENTER);
}

// Handle collision with obstacle
function handleCollision() {
  gameState.score.hits++;
  gameState.score.hitTime = frameCount; // Record when hit occurred to check against flash duration and hopefully not have multiple hits register at once
  gameState.score.lastHits = true;
  
  // Only transition to game over if all lives are lost
  if (gameState.score.hits >= 3) {
    gameState.mode = CONFIG.STATES.GAMEOVER;
  }
}

// Update game state during gameplay for transitions
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

// Draw the goal area
function drawGoal() {
  push();
  stroke(...CONFIG.COLORS.GOAL.STROKE);
  strokeWeight(3);
  fill(...CONFIG.COLORS.GOAL.FILL);
  ellipse(gameState.goal.x, gameState.goal.y, CONFIG.GOAL.SIZE);
  pop();
}


// Draw a single obstacle
function drawObstacle(obstacle) {
  ellipse(obstacle.x, obstacle.y, obstacle.d);
}

// Check for collisions between player and obstacles
function checkObstacleCollisions() {
  return gameState.obstacles.positions.some(obs => 
    dist(gameState.player.x, gameState.player.y, obs.x, obs.y) < obs.d/2
  );
}

// Update player position based on input and check border collisions
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
  
  // Check border collision - Still needs work to prevent sticking to border and costing additrional lives lost like with obstacles
  const halfSize = CONFIG.PLAYER.SIZE / 2;
  const borderPadding = CONFIG.BORDER.THICKNESS;
  
  // Border collision detection - prevent moving out of bounds
  if (newX - halfSize < borderPadding || 
      newX + halfSize > width - borderPadding || 
      newY - halfSize < borderPadding || 
      newY + halfSize > height - borderPadding) {
    // Border collision occurs - handle as obstacle collision
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
  
  // Update rotation if moving - Player faces movement direction because previous code broke movement due to angle issues
  if (dx || dy) {
    gameState.player.rotation = atan2(dy, dx);
  }
}

// Draw the player (wasp sprite)
function drawPlayer() {
  imageMode(CENTER);
  push();
  translate(gameState.player.x, gameState.player.y);
  rotate(gameState.player.rotation);
  image(ui.wasp, 0, 0, CONFIG.PLAYER.SIZE, CONFIG.PLAYER.SIZE);
  pop();
}

function moveWasp(){
// Wasp movement variables
  let moveSpeed = 8;

  // Current wasp position and rotation for movement
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

// Diagonal movement handling
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

// Wasp display function
function displayWasp(x, y, r){

  imageMode(CENTER);
  push()
    translate(x, y);
    rotate(r)
    image(wasp,0 ,0 ,100,100)
  pop()
  
}

//Transitions between screens and game statesd
// Handles mouse presses for UI buttons
function mousePressed(){
  // If we're on the start screen, transition to the game on the first click
  if (gameState.mode === CONFIG.STATES.START) {
    // require clicking the Play button to begin
    if (isPointInRect(mouseX, mouseY, ui.buttons.play)) {
      gameState.mode = CONFIG.STATES.PLAY;
      mySound.play();
    }
    return;
  }

  // If we're on the game over screen, reset the game on click
  if (gameState.mode === CONFIG.STATES.GAMEOVER) {
    // Rplay button coordinates are relative to the canvas so it is proportional depdending on screen size
    if (isPointInRect(mouseX, mouseY, ui.buttons.replay)) {
      mySound.stop();
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
  
  // Reinitialize game variables and obstacles
  initGame();

  // Recreate overlay graphic
  ui.overlay = createGraphics(width, height);
  ui.overlay.background(...CONFIG.COLORS.OVERLAY);

  // Redraw screens
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
  
  // Place obstacles
  placeObstacles();
}

// Place obstacles randomly while ensuring valid positions
function placeObstacles() {
  const { MIN_SIZE, MAX_SIZE, MIN_GAP } = CONFIG.OBSTACLE;
  const maxAttempts = 1000;
  
  // Place each obstacle
  for (let i = 0; i < gameState.obstacles.count; i++) {
    let placed = false; // Flag to track if obstacle was placed
    let attempts = 0; // Number of attempts to place this obstacle
    let d = random(MIN_SIZE, MAX_SIZE); // Start with random size
    
    // Try to place the obstacle
    while (!placed && attempts < maxAttempts) {
      const obstacle = {
        x: random(d/2, width - d/2), // Ensure obstacle is fully within canvas
        y: random(d/2, height - d/2), 
        d: d
      };
      
      // Validate position
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

// Validate obstacle position against borders, start zone, goal zone, and other obstacles
function isValidObstaclePosition(obstacle) {
  const { MIN_GAP } = CONFIG.OBSTACLE;
  const borderPadding = CONFIG.BORDER.THICKNESS;
  
  // Check if too close to border to decrement lives
  const radius = obstacle.d/2 + MIN_GAP;
  if (obstacle.x - radius < borderPadding || 
      obstacle.x + radius > width - borderPadding ||
      obstacle.y - radius < borderPadding || 
      obstacle.y + radius > height - borderPadding) {
    return false;
  }
  
  // Check start zone so does not overlap with obstacles
  if (dist(obstacle.x, obstacle.y, gameState.player.x, gameState.player.y) < 
      CONFIG.SAFE_ZONE.RADIUS + obstacle.d/2) {
    return false;
  }
  
  // Check goal zone so it does not overlap with obstacles
  if (dist(obstacle.x, obstacle.y, gameState.goal.x, gameState.goal.y) < 
      (CONFIG.GOAL.SIZE + obstacle.d)/2 + MIN_GAP) {
    return false;
  }
  
  // Check other obstacles so they do not overalp with each other
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
 // Draw the start screen graphics
function drawStartGraphics(buf){
  buf.background(20, 30, 60);
  buf.textAlign(CENTER, CENTER);
  buf.fill(255);
  buf.textSize(64);
  // Title uses the same size/placement as the Game Over title for consistency
  // compute title position
  const titleY = buf.height/2 - 60;
  buf.text('"Bee" have', buf.width/2, titleY);
  // Wasp image that sits above title - Attempted to use noise and have bee move but it broke gamepolay movement
  const imgH = 80;
  const padding = 24; // pixels
  const imgX = buf.width/2 - imgH/2;
  const imgY = titleY - padding - imgH; // place image above title with padding
  if (ui.wasp) buf.image(ui.wasp, imgX, imgY, imgH, imgH); // draw wasp image if loaded

  // Draw Play button centered under the title
  ui.buttons.play.x = buf.width/2 - CONFIG.BUTTON.WIDTH/2;
  ui.buttons.play.y = buf.height/2;
  buf.noStroke();
  buf.fill(40, 160, 80);
  buf.rect(ui.buttons.play.x, ui.buttons.play.y, CONFIG.BUTTON.WIDTH, CONFIG.BUTTON.HEIGHT, 8);
  buf.fill(255);
  buf.textSize(22);
  buf.text('Play', buf.width/2, ui.buttons.play.y + CONFIG.BUTTON.HEIGHT/2);
}

// Level up function - increase difficulty and reset game state
function levelUp() {
  gameState.score.goals++;
  gameState.obstacles.count += CONFIG.OBSTACLE.INCREMENT;
  initGame();
}


// Draw the game over screen
function drawGameOverGraphics(buf){
  buf.background(30, 20, 40);
  buf.textAlign(CENTER, CENTER);
  buf.fill(255);
  buf.textSize(64);
  buf.text('Game Over', buf.width/2, buf.height/2 - 60);

  // Center the replay button
  ui.buttons.replay.x = buf.width/2 - CONFIG.BUTTON.WIDTH/2;
  ui.buttons.replay.y = buf.height/2;
  
  // Added score text below the button with padding
  buf.textSize(28);
  buf.text('Goals Reached: ' + gameState.score.goals, buf.width/2, ui.buttons.replay.y + CONFIG.BUTTON.HEIGHT + 40);

  buf.fill(200, 40, 40);
  buf.noStroke();
  buf.rect(ui.buttons.replay.x, ui.buttons.replay.y, CONFIG.BUTTON.WIDTH, CONFIG.BUTTON.HEIGHT, 8);
  buf.fill(255);
  buf.textSize(22);
  buf.text('Replay', buf.width/2, ui.buttons.replay.y + CONFIG.BUTTON.HEIGHT/2);
}


