let game: Game; // the game starts here
let changedScene: boolean = false;
const canvasWidth = 1024; // ~ * 0.7
const canvasHeight = 685; // ~ * 0.7
let canvas: p5.Renderer;

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  centerCanvas();

  frameRate(60);
  game = new Game();
  userStartAudio(); //Aktiverar ljudet efter en användargest

  textFont(kavoonFont);
}

function centerCanvas() {
  const x = (windowWidth - canvasWidth) / 2;
  const y = (windowHeight - canvasHeight) / 2;
  canvas.position(x, y);
}

function windowResized() {
  centerCanvas();
}

function draw() {
  game.update();
  game.draw();
}

function keyReleased() {
  changedScene = false;
}

function preload() {
  soundOnimg = loadImage("assets/images/soundOn.svg");
  music = {
    chase: loadSound("/assets/music/crazy-chase-126687.mp3"),
  };
  cloudImg = loadImage("assets/images/cloudNew.svg");
  snowflakeImg = loadImage("assets/images/snowflake.svg");
  platformImg = loadImage("assets/images/platformStart.svg");
  kavoonFont = loadFont("assets/Font(s)/Kavoon-Regular.ttf");
  greenRight = loadImage("assets/images/greenPlayerRight.svg");
  yellowLeft = loadImage("assets/images/yellowPlayerLeft.svg");
  yellowHalfSquish = loadImage("assets/images/yellowPlayerHalfSquish.svg");
  yellowSquish = loadImage("assets/images/yellowPlayerSquish.svg");
  yellowRight = loadImage("assets/images/yellowPlayerRight.svg");
  greenHalfSquish = loadImage("assets/images/greenPlayerHalfSquish.svg");
  greenSquish = loadImage("assets/images/greenPlayerSquish.svg");
  greenLeft = loadImage("assets/images/greenPlayerLeft.svg");
  backgroundImgL1 = loadImage("assets/images/bgLevel1.png");
  platform = loadImage("assets/images/platform.svg");
  icyPlatform = loadImage("assets/images/icyPlatform.svg");
  iciclePlatform = loadImage("assets/images/iciclePlatform.svg");
  icyIciclePlatform = loadImage("assets/images/icyIciclePlatform.svg");
  snowman = loadImage("assets/images/snowman.svg");
  trampoline = loadImage("assets/images/trampoline.svg");
  teleport = loadImage("assets/images/teleport.svg");
  playerKeysYellow = loadImage("assets/images/playerKeysYellow.svg");
  playerKeysGreen = loadImage("assets/images/playerKeysGreen.svg");
  playerInstruction1img = loadImage("assets/images/yellowPlayerLeft.svg");
  playerInstruction2img = loadImage("assets/images/greenPlayerRight.svg");
  soundOnimg = loadImage("assets/images/soundOn.svg");
  podiumYellowImg = loadImage("assets/images/podiumYellowWinner.svg");
  podiumGreenImg = loadImage("assets/images/podiumGreenWinner.svg");
}
