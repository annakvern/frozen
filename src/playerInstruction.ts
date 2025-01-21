let playerInstruction1img: p5.Image;
let playerInstruction2img: p5.Image;
let playerKeysYellow: p5.Image;
let playerKeysGreen: p5.Image;
let soundOnimg: p5.Image;

class PlayerInstruction implements Scene {
  private game: Game;
  private titlePosition: p5.Vector;
  private textPosition: p5.Vector;
  private player1Position: p5.Vector;
  private player2Position: p5.Vector;
  private playerKeysYellowPosition: p5.Vector;
  private playerKeysGreenPosition: p5.Vector;
  private playSoundPosition: p5.Vector;

  constructor(game: Game) {
    this.game = game;
    this.titlePosition = createVector(width / 2, 100);
    this.textPosition = createVector(width / 2, 300);
    this.player1Position = createVector(980, 400);
    this.player2Position = createVector(410, 400);
    this.playerKeysYellowPosition = createVector(970, 560);
    this.playerKeysGreenPosition = createVector(400, 560);
    this.playSoundPosition = createVector(1370, 955);
  }

  public update(): void {
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
    textSize(120);
    textAlign(CENTER, CENTER);
    text("READY?", this.titlePosition.x + 40, this.titlePosition.y);
    textFont(kavoonFont);
    pop();
  }

  private drawText() {
    push();
    fill("white");
    let bounceText = sin(frameCount * 0.1) * 3; // "Press space" gungar upp och ner.
    textSize(40);
    textAlign(CENTER, CENTER);
    text(
      "You have 2 mins - Tag or DIE!",
      this.textPosition.x + 30,
      this.textPosition.y - 80
    );
    text("Press SPACE to get started", this.textPosition.x - -30, 820 + bounceText);
    textSize(40);
    text("Player 1", this.textPosition.x - 225, 350);
    text("Player 2", this.textPosition.x + 280, 350);
    textFont(kavoonFont);
    pop();
  }

  private drawPlayer1() {
    push();

    image(
      playerInstruction1img,
      this.player1Position.x - 50,
      this.player1Position.y, 130, 130);
      pop();
  }

  private drawPlayer2() {
    
    image(
      playerInstruction2img,
      this.player2Position.x + 20,
      this.player2Position.y,
      130,
      130
    );
    
  }

  private drawPlayerKeysYellow() {
    image(
      playerKeysYellow,
      this.playerKeysYellowPosition.x - 50,
      this.playerKeysYellowPosition.y,
      150,
      100
    );
  }
  private drawPlayerKeysGreen() {
    image(
      playerKeysGreen,
      this.playerKeysGreenPosition.x + 20,
      this.playerKeysGreenPosition.y,
      150,
      100
    );
  }
  private playSound() {

    image(
      soundOnimg,
      this.playSoundPosition.x,
      this.playSoundPosition.y,
      60,
      60
    );
  }
}
