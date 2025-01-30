let soundOnimg: p5.Image;
let playerInstruction1img: p5.Image;
let playerInstruction2img: p5.Image;
let playerKeysYellow: p5.Image;
let playerKeysGreen: p5.Image;

class PlayerInstruction implements Scene {
  private game: Game;
  private titlePosition: p5.Vector;
  private textPosition: p5.Vector;
  private player1Position: p5.Vector;
  private player2Position: p5.Vector;
  private playerKeysYellowPosition: p5.Vector;
  private playerKeysGreenPosition: p5.Vector;
  private playSoundPosition: p5.Vector;
  private isSoundOn: boolean = true;

  constructor(game: Game) {
    this.game = game;

    this.titlePosition = createVector(width / 2 - 25, 70);
    this.textPosition = createVector(width / 2 - 15, 250);
    this.player1Position = createVector(760, 285);
    this.player2Position = createVector(170, 285);
    this.playerKeysYellowPosition = createVector(785, 430);
    this.playerKeysGreenPosition = createVector(125, 430);
    this.playSoundPosition = createVector(980, 645);
  }

  public update(): void {
    if (keyIsDown(32) && !changedScene) {
      // 32 keycode for 'space'
      userStartAudio();
      changedScene = true;
      const factory = new LevelFactory(this.game);
      const gameBoard = factory.createGameBoard(1);
      this.game.changeActiveScreen(gameBoard);
    } else if (keyIsDown(13) && !changedScene) {
      // 13 keycode for 'enter'

      userStartAudio();
      changedScene = true;
      const factory = new LevelFactory(this.game);
      const gameBoard = factory.createGameBoard(2);
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

    // Show soundicon
    if (this.isSoundOn && soundOnimg) {
      image(
        soundOnimg,
        this.playSoundPosition.x,
        this.playSoundPosition.y,
        40,
        40
      );
    }
  }

  private drawTitle() {
    push();

    // SHADOW SETTINGS.
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    fill("white");
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
      "You have 2 mins - Tag or DIE!",
      this.textPosition.x + 30,
      this.textPosition.y - 100
    );

    textSize(20);
    fill("white");
    text("Press", this.textPosition.x - 1, 270 + bounceText);
    fill(205, 209, 239);
    text("SPACE", this.textPosition.x - 1, 300 + bounceText);
    fill("white");
    text("for winter-map", this.textPosition.x - 1, 330 + bounceText);

    fill("white");
    text("Press", this.textPosition.x - 1, 410 + bounceText);
    fill(255, 198, 106);
    text("ENTER", this.textPosition.x - 1, 440 + bounceText);
    fill("white");
    text("for summer-map", this.textPosition.x - 1, 470 + bounceText);

    textSize(30);
    fill("white");
    text("Player 1", this.player1Position.x + 40, this.player1Position.y - 50);
    text("Player 2", this.player2Position.x + 40, this.player2Position.y - 50);
    textSize(40);

    textSize(15);
    text("Press P to play and pause music", this.textPosition.x + 363, 662);

    textFont(kavoonFont);
    pop();
  }

  private drawPlayer1() {
    push();

    image(
      playerInstruction1img,
      this.player1Position.x,
      this.player1Position.y,
      100,
      100
    );
    pop();
  }

  private drawPlayer2() {
    push();

    image(
      playerInstruction2img,
      this.player2Position.x,
      this.player2Position.y,
      100,
      100
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

  public playSound() {
    if (this.isSoundOn) {
      music.chase.loop();
    } else {
      music.chase.pause();
    }
  }
}

// Pause and play music "P"
function keyPressed() {
  if (keyCode === 80) {
    userStartAudio();

    if (music.chase.isPlaying()) {
      music.chase.pause();
    } else {
      music.chase.loop();
    }
  }
}
