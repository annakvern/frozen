let game: Game; // the game starts here
let changedScene: boolean = false;
const canvasWidth = 1440 * 0.67;
const canvasHeight = 1024 * 0.67;
let canvas: p5.Renderer;

function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  centerCanvas();
  
  frameRate(60);

  let startScene = new StartScene(null as unknown as Game);
  game = new Game(startScene);
  startScene = new StartScene(game);
  game.changeActiveScreen(startScene);


  textFont(kavoonFont);
}

function centerCanvas() {
  const x = (windowWidth - canvasWidth) / 2;
  const y = (windowHeight - canvasHeight) / 2; 
  canvas.position(x, y)
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
  music = {
    mystery: loadSound("/assets/music/mystery.mp3"),
  };
  cloudImg = loadImage("assets/images/cloudNew.svg");
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