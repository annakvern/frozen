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
    this.titlePosition = createVector(width / 2 - 25, 70);
    this.textPosition = createVector(width / 2 - 15, 250);
    this.player1Position = createVector(700, 285);
    this.player2Position = createVector(210, 285);
    this.playerKeysYellowPosition = createVector(735, 430);
    this.playerKeysGreenPosition = createVector(175, 430);
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

    // SHADOW SETTINGS.
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    fill(152, 159, 227);
    textSize(80);
    textAlign(CENTER, CENTER);
    text("READY?", this.titlePosition.x + 40, this.titlePosition.y);
    textFont(kavoonFont);
    pop();
  }

  private drawText() {
    push();

    // SHADOW SETTINGS.
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    fill("white");
    let bounceText = sin(frameCount * 0.1) * 3; // "Press space" gungar upp och ner.
    textSize(30);
    textAlign(CENTER, CENTER);
    text(
      "You have 2 mins - ",
      this.textPosition.x - 40,
      this.textPosition.y - 100
    );
    push();
    fill(58, 168, 167);
    text("Tag", this.textPosition.x + 115, this.textPosition.y - 100);

    fill("white");
    text("or", this.textPosition.x + 170, this.textPosition.y - 100);

    fill(255, 213, 118);
    text("DIE!", this.textPosition.x + 225, this.textPosition.y - 100);
    pop();
    fill("white");
    text("Press", this.textPosition.x - 130, 600 + bounceText);
    fill(255, 213, 118);
    text("SPACE", this.textPosition.x - 35, 600 + bounceText);
    fill("white");
    text("to get started", this.textPosition.x + 115, 600 + bounceText);
    textSize(30);
    fill(58, 168, 167);
    text("Player 1", this.textPosition.x - 225, 230);
    fill(255, 213, 118);
    text("Player 2", this.textPosition.x + 260, 230);
    textFont(kavoonFont);
    pop();
  }

  private drawPlayer1() {
    push();

    // SHADOW SETTINGS.
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    image(
      playerInstruction1img,
      this.player1Position.x,
      this.player1Position.y,
      120,
      120
    );
    pop();
  }

  private drawPlayer2() {
    push();

    // SHADOW SETTINGS.
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    image(
      playerInstruction2img,
      this.player2Position.x,
      this.player2Position.y,
      120,
      120
    );
    pop();
  }

  private drawPlayerKeysYellow() {
    push();

    // SHADOW SETTINGS.
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    image(
      playerKeysYellow,
      this.playerKeysYellowPosition.x - 50,
      this.playerKeysYellowPosition.y,
      150,
      100
    );
    pop();
  }

  private drawPlayerKeysGreen() {
    push();

    // SHADOW SETTINGS.
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    image(
      playerKeysGreen,
      this.playerKeysGreenPosition.x + 20,
      this.playerKeysGreenPosition.y,
      150,
      100
    );
    pop();
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
