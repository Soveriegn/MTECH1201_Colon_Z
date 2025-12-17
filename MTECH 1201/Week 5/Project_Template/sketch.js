// Code Attempt 1
  // let gameState = "start";
    // let transitionAlpha = 0;
    // let score = 0;

    // function setup() {
    //   createCanvas(windowWidth, windowHeight);
    //   textAlign(CENTER, CENTER);
    // }

    // function draw() {
    //   background(220);

    //   switch (gameState) {
    //     case "start":
    //       drawStartScreen();
    //       break;
    //     case "playing":
    //       drawGameScreen();
    //       break;
    //     case "gameover":
    //       drawGameOverScreen();
    //       break;
    //     case "transition":
    //       drawTransitionScreen();
    //       break;
    //   }
    // }

    // function startScreen() {
    //   fill(255);
    //   textSize(48);
    //   text("Welcome to the Game!", width / 2, height / 2 - 50);
    //   textSize(24);
    //   text("Click to Start", width / 2, height / 2 + 20);
    // }

    // function playGame() {
    //   fill(255);
    //   textSize(20);
    //   text("Score: " + score, width / 2, height / 2);
      
    //   // Game logic goes here
    //   //Example gameplay: increase score over time
    //   if (frameCount % 60 === 0) {
    //     increaseScore();
    //   }
    //   //Example condition to end game
    //   if (score >= 100) {
    //     gameState = "gameover";
    // }
    //   //score++;
    // }

    // function gameOverScreen() {
    //   fill(255, 0, 0);
    //   textSize(48);
    //   text("Game Over!", width / 2, height / 2 - 50);
    //   textSize(24);
    //   text("Final Score: " + score, width / 2, height / 2);
    //   text("Click to Restart", width / 2, height / 2 + 50);
    // }

    // function transitionScreen() {
    //   fill(0, transitionAlpha);
    //   rect(0, 0, width, height);
      
    //   if (transitionAlpha < 255) {
    //     transitionAlpha += 5;
    //   } else {
    //     gameState = "playing";
    //     transitionAlpha = 0;
    //   }
    // }

    // function changeState(next, target) {
    //   if (next === "transition") {
    //     gameState = "transition";
    //   } else {
    //     gameState = next;
    //   }
    // }

    // function mousePressed() {
    //   if (gameState === "start") {
    //     changeState("transition", "playing");
    //   } else if (gameState === "gameover") {
    //     score = 0;
    //     changeState("start");
    //   }
    // }

//log;

//Code Attempt 2
  // let gameState = "start";
  // let transitionAlpha = 0;
  // let score = 0;

  // function setup() {
  //   createCanvas(600, 400);
  //   textAlign(CENTER, CENTER);
  // }

  // function draw() {
  //   background(30);
    
  //   switch (gameState) {
  //     case "start":
  //       startScreen();
  //       break;
  //     case "play":
  //       playGame();
  //       break;
  //     case "over":
  //       gameOverScreen();
  //       break;
  //     case "transition":
  //       transitionScreen();
  //       break;
  //   }
  // }

  // function startScreen() {
  //   fill(255);
  //   textSize(32);
  //   text("Kasplat", width / 2, height / 2 - 40);
  //   textSize(20);
  //   text("Click to Start", width / 2, height / 2 + 20);
  // }

  // function playGame() {
  //   fill(255);
  //   textSize(20);
  //   text(`Score: ${score}`, width / 2, height / 2);
    
  //   // Example gameplay: increase score
  //   if (frameCount % 60 === 0) score++;

  //   // Dummy game over condition
  //   if (score > 100) {
  //     changeState("transition", "over");
  //   }
  // }

  // function gameOverScreen() {
  //   fill(255, 0, 0);
  //   textSize(32);
  //   text("Game Over", width / 2, height / 2 - 40);
  //   textSize(20);
  //   text("Click to Retry", width / 2, height / 2 + 20);
  // }

  // function transitionScreen() {
  //   background(0, transitionAlpha);
  //   transitionAlpha += 10;
    
  //   if (transitionAlpha >= 255) {
  //     transitionAlpha = 0;
  //     // targetState is stored in global variable
  //     gameState = targetState;
  //   }
  // }

  // let targetState = "";

  // function changeState(next, target) {
  //   if (next === "transition") {
  //     gameState = "transition";
  //     targetState = target;
  //   } else {
  //     gameState = next;
  //   }
  // }

  // function mousePressed() {
  //   if (gameState === "start") {
  //     changeState("transition", "play");
  //   } else if (gameState === "over") {
  //     score = 0;
  //     changeState("transition", "start");
  //   }
  // }

//log;

//Code Attempt 3
  // let gameState = "start";
  // let transitionAlpha = 0;
  // let score = 0;
  // let player, enemy;
  // let targetState = "";

  // function setup() {
  //   createCanvas(600, 400);
  //   textAlign(CENTER, CENTER);
  //   initGame();
  // }

  // function draw() {
  //   background(30);
    
  //   switch (gameState) {
  //     case "start":
  //       startScreen();
  //       break;
  //     case "play":
  //       playGame();
  //       break;
  //     case "over":
  //       gameOverScreen();
  //       break;
  //     case "transition":
  //       transitionScreen();
  //       break;
  //   }
  // }

  // function startScreen() {
  //   fill(255);
  //   textSize(32);
  //   text("My Game Title", width / 2, height / 2 - 40);
  //   textSize(20);
  //   text("Click to Start", width / 2, height / 2 + 20);
  // }

  // function initGame() {
  //   // Initialize player & enemy positions
  //   player = { x: 50, y: height / 2, size: 30, speed: 5 };
  //   enemy = { x: width + 50, y: random(50, height - 50), size: 40, speed: 5 };
  //   score = 0;
  // }

  // function playGame() {
  //   // Update score
  //   if (frameCount % 60 === 0) score++;

  //   // Move player
  //   if (keyIsDown(UP_ARROW)) player.y -= player.speed;
  //   if (keyIsDown(DOWN_ARROW)) player.y += player.speed;
  //   player.y = constrain(player.y, player.size / 2, height - player.size / 2);

  //   // Move enemy
  //   enemy.x -= enemy.speed;
  //   if (enemy.x < -enemy.size) {
  //     enemy.x = width + 50;
  //     enemy.y = random(50, height - 50);
  //     score += 10; // reward for dodging
  //   }

  //   // Draw player and enemy
  //   fill(0, 255, 0);
  //   ellipse(player.x, player.y, player.size);
  //   fill(255, 0, 0);
  //   ellipse(enemy.x, enemy.y, enemy.size);

  //   // Collision detection
  //   let d = dist(player.x, player.y, enemy.x, enemy.y);
  //   if (d < (player.size + enemy.size) / 2) {
  //     changeState("transition", "over");
  //   }

  //   // Draw score
  //   fill(255);
  //   textSize(18);
  //   text(`Score: ${score}`, width / 2, 30);
  // }

  // function gameOverScreen() {
  //   fill(255, 0, 0);
  //   textSize(32);
  //   text("Game Over", width / 2, height / 2 - 40);
  //   textSize(20);
  //   text(`Final Score: ${score}`, width / 2, height / 2);
  //   text("Click to Retry", width / 2, height / 2 + 40);
  // }

  // function transitionScreen() {
  //   background(0, transitionAlpha);
  //   transitionAlpha += 10;
  //   if (transitionAlpha >= 255) {
  //     transitionAlpha = 0;
  //     gameState = targetState;
  //     if (gameState === "play") initGame(); // reset game
  //   }
  // }

  // function changeState(next, target) {
  //   if (next === "transition") {
  //     gameState = "transition";
  //     targetState = target;
  //   } else {
  //     gameState = next;
  //   }
  // }

  // function mousePressed() {
  //   if (gameState === "start") {
  //     changeState("transition", "play");
  //   } else if (gameState === "over") {
  //     changeState("transition", "start");
  //   }
  // }

//log;


