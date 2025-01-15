/// <reference path="startScene.ts" />
let game: Game;
let music: {
  mystery: p5.SoundFile;
};

class Game {
  activeScene: Scene;

  constructor(initialScreen: Scene) {
    this.activeScene = initialScreen;
  }

  public changeActiveScreen(scene: Scene): void {
    this.activeScene = scene; // switch to new screen
  }

  public update() {
    this.activeScene.update();
  }

  public draw() {
    this.activeScene.draw();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  startScene = new StartScene();
  game = new Game(startScene);

  textFont(kavoonFont);
}

function preload() {
  music = {
    mystery: loadSound("/assets/music/mystery.mp3"),
  };
  cloudImg = loadImage("assets/images/cloud.svg");
  snowflakeImg = loadImage("assets/images/snowflake.svg");
  platformImg = loadImage("assets/images/platformStart.svg");
  kavoonFont = loadFont("assets/Font(s)/Kavoon-Regular.ttf");
  player1Img = loadImage("assets/images/greenPlayerRight.svg");
  player2Img = loadImage("assets/images/yellowPlayerLeft.svg");
}

function draw() {
  background(135, 206, 250); // Blå bakgrund
  game.update();
  game.draw();
  /*  StartScene.draw(); */
}
