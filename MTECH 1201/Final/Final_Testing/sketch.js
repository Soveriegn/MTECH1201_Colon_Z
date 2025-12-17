// ------------------------------------------------------------//
// Example Code to generate sound using oscillator and envelope
// ------------------------------------------------------------//
//Notes:This code creates a triangle wave oscillator that plays different MIDI notes each time the canvas is clicked.
// The frequency of the oscillator is set based on the MIDI note values defined in the midiNotes array.
// An envelope is applied to control the amplitude of the sound when a note is played.
//Taken from p5.js sound library examples.
// Integrate with the code below to create buttons for play and stop functionality and checking frequency of wav file,
// I created foir project.

// let osc;
// let env;
// let midiNotes = [60, 64, 67, 72];
// let noteIndex = 0;
// let midiVal, freq;

// function setup() {
//   let cnv = createCanvas(100, 100);
//   cnv.mousePressed(startSound);
//   osc = new p5.TriOsc();
//   env = new p5.Envelope();
// }

// function draw() {
//   background(220);
//   text('tap to play', 10, 20);
//   if (midiVal) {
//     text('MIDI: ' + midiVal, 10, 40);
//     text('Freq: ' + freq, 10, 60);
//   }
// }

// function startSound() {
//   // see also: userStartAudio();
//   osc.start();

//   midiVal = midiNotes[noteIndex % midiNotes.length];
//   freq = midiToFreq(midiVal);
//   osc.freq(freq);
//   env.ramp(osc, 0, 1.0, 0);

//   noteIndex++;
// }

// ------------------------------------------------------------//
// Example Code to load and play a sound file
// ------------------------------------------------------------//
//Notes: Make play only happen once after button press. if play is pressed again while sound is playing it should,
//restart the sound from beginning. Stop will all together stop the sound.

// Working Code to play and stop a sound file
  // function preload() {  
  //   let mySound;
  //   // let mySound =  loadSound('Drum_Bass_Test.wav')
  // }

  // function setup() {
  //   mySound = loadSound('Drum_Bass_Test.wav')
  //   createCanvas(100, 100);
  //   //Buttons for Play and Stop
  // let startButton = createButton('Play');
  // let stopButton = createButton('Stop');

  // startButton.mousePressed(startMusic);
  // stopButton.mousePressed(stopMusic);
  // }

  // function startMusic() {
  //   mySound.play();
  // }

  // function stopMusic() {
  //   mySound.stop();
  // }

  // function draw() {
  //   //Background(220);
  // }

  // // function mousePressed() {
  // //   mySound.play();
  // // }