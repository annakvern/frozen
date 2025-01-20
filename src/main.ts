let game: Game; // the game starts here

function setup() {
  createCanvas(1440, 1024);
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
  backgroundImgL1 = loadImage("assets/images/bgLevel1.png");
  platform = loadImage("assets/images/platform.svg");
  snowman = loadImage("assets/images/snowman.svg");
  trampoline = loadImage("assets/images/trampoline.svg");
  teleport = loadImage("assets/images/teleport.svg");
  playerYellow = loadImage("assets/images/yellowPlayerLeft.svg");
  playerGreen = loadImage("assets/images/greenPlayerRight.svg");
  playerKeysYellow = loadImage("assets/images/playerKeysYellow.svg");
  playerKeysGreen = loadImage("assets/images/playerKeysGreen.svg");
  playerInstruction1img = loadImage("assets/images/yellowPlayerLeft.svg");
  playerInstruction2img = loadImage("assets/images/greenPlayerRight.svg");
  soundOnimg = loadImage("assets/images/soundOn.svg");
  podiumYellowImg = loadImage("assets/images/podiumYellowWinner.svg");
  podiumGreenImg = loadImage("assets/images/podiumGreenWinner.svg");
}

function draw() {
  game.update();
  game.draw();
}
