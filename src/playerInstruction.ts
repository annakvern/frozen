let playerInstruction1img: p5.Image;
let playerInstruction2img: p5.Image;
let playerKeysYellow: p5.Image;
let playerKeysGreen: p5.Image;
let soundOnimg: p5.Image;
let soundOffimg: p5.Image;
let sound: p5.Image;
let playerInstruction: PlayerInstruction;

class PlayerInstruction implements Scene {
  private game: Game;
  private titlePosition: p5.Vector;
  private textPosition: p5.Vector;
  private player1Position: p5.Vector;
  private player2Position: p5.Vector;
  private playerKeysYellowPosition: p5.Vector;
  private playerKeysGreenPosition: p5.Vector;
  private playSoundPosition: p5.Vector;
  private isSoundOn: boolean;
  private isSoundOff: boolean;

  constructor(game: Game) {
    this.game = game;
    this.isSoundOn = true;
    this.isSoundOff = true;
    this.titlePosition = createVector(width / 2, 100);
    this.textPosition = createVector(width / 2, 200);
    this.player1Position = createVector(980, 300);
    this.player2Position = createVector(410, 300);
    this.playerKeysYellowPosition = createVector(970, 460);
    this.playerKeysGreenPosition = createVector(400, 460);
    this.playSoundPosition = createVector(
      windowWidth * 0.93,
      windowHeight * 0.86
    );
  }

  public update(): void {
    if (mouseIsPressed && this.playSound()) {
      this.playSound();
    }
    if (keyIsDown(32) && !changedScene) {
      changedScene = true;
      const factory = new LevelFactory(this.game);
      const gameBoard = factory.createGameBoard(this.game, 1);
      this.game.changeActiveScreen(gameBoard);
    }
  }

  public draw(): void {
    background(164, 210, 247);
    this.drawTitle();
    this.drawText();
    this.drawPlayer1();
    this.drawPlayer2();
    this.drawPlayerKeysYellow();
    this.drawPlayerKeysGreen();
    this.playSound();
  }

  private drawTitle() {
    push();
    fill("white");
    textSize(100);
    textAlign(CENTER, CENTER);
    text("READY?", this.titlePosition.x, this.titlePosition.y);
    textFont(kavoonFont);
    pop();
  }

  private drawText() {
    push();
    fill("white");
    let bounceText = sin(frameCount * 0.1) * 3; // "Press space" gungar upp och ner.
    textSize(20);
    textAlign(CENTER, CENTER);
    text(
      "Press space to get started",
      this.textPosition.x,
      this.textPosition.y + bounceText
    );
    text("You have 2 mins - Tag or DIE!", this.textPosition.x - 0, 630);
    textSize(40);
    text("Player 1", this.textPosition.x - 300, 250);
    text("Player 2", this.textPosition.x + 280, 250);
    textFont(kavoonFont);
    pop();
  }

  private drawPlayer1() {
    image(
      playerInstruction1img,
      this.player1Position.x,
      this.player1Position.y,
      130,
      130
    );
  }

  private drawPlayer2() {
    image(
      playerInstruction2img,
      this.player2Position.x,
      this.player2Position.y,
      130,
      130
    );
  }

  private drawPlayerKeysYellow() {
    image(
      playerKeysYellow,
      this.playerKeysYellowPosition.x,
      this.playerKeysYellowPosition.y,
      150,
      100
    );
  }

  private drawPlayerKeysGreen() {
    image(
      playerKeysGreen,
      this.playerKeysGreenPosition.x,
      this.playerKeysGreenPosition.y,
      150,
      100
    );
  }

  private playSound() {
    if (this.isSoundOn) {
      image(
        soundOnimg,
        this.playSoundPosition.x,
        this.playSoundPosition.y,
        40,
        40
      );
    } else if (this.isSoundOff) {
      image(
        soundOffimg,
        this.playSoundPosition.x,
        this.playSoundPosition.y,
        40,
        40
      );
    }
  }

  public handleMousePressed() {
    const mouseOverSoundIcon =
     mouseX > this.playSoundPosition.x &&
     mouseX < this.playSoundPosition.x + 40 &&
     mouseY > this.playSoundPosition.y &&
     mouseY < this.playSoundPosition.y + 40;

     console.log('Mouse pressed on icon:', mouseOverSoundIcon);
     
    if (this.isSoundOn && mouseIsPressed) {
      this.isSoundOn = true;
    } else if (this.isSoundOn && mouseIsPressed) {
      this.isSoundOff = true;
    } 
  }
  
}

function mousePressed() {
  if (playerInstruction) {
      playerInstruction.handleMousePressed();
  }
}
