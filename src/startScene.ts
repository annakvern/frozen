/// <reference path="playerInstruction.ts" />
let cloudImg: p5.Image;
let snowflakeImg: p5.Image;
let platformImg: p5.Image;
let player1Img: p5.Image;
let player2Img: p5.Image;

class StartScene implements Scene {
  private titlePosition: p5.Vector;
  private textPosition: p5.Vector;
  private cloudPosition: p5.Vector;
  private snowflakePositions: p5.Vector[];
  private platformPosition: p5.Vector;
  private player1Position: p5.Vector;
  private player2Position: p5.Vector;

  constructor() {
    this.titlePosition = createVector(800, 600); // Titelns position
    this.textPosition = createVector(400, 150); // Textens position
    this.cloudPosition = createVector(200, 100); // Molnets position
    this.snowflakePositions = []; // Lista för snöflingornas positioner
    this.platformPosition = createVector(50, 600); // Plattformens position
    this.player1Position = createVector(55, 550);
    this.player2Position = createVector(400, 550);
  }
  update(): void {
    if (key) {
      let nextPage = new PlayerInstruction();
      game.changeActiveScreen(nextPage);
    }
  }

  draw() {
    // Kallar på draw funktionerna
    this.drawTitle();

    this.drawText();

    this.drawCloud();

    this.drawSnowflakes();

    this.drawPlatform();

    this.drawPlayer1();

    this.drawPlayer2();
  }

  private drawTitle() {
    fill("white");
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Tag or DIE!", this.titlePosition.x, this.titlePosition.y);
    textFont(kavoonFont);
  }

  private drawText() {
    fill("white"); // Vit färg
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Press any key to continue", this.textPosition.x, this.textPosition.y);
  }

  private drawCloud() {
    image(cloudImg, this.cloudPosition.x, this.cloudPosition.y, 120, 80);
  }

  private drawSnowflakes() {
    for (let pos of this.snowflakePositions) {
      image(snowflakeImg, pos.x, pos.y, 20, 20); // Rita snöflingor
      pos.y += 1; // Fallande rörelse
      if (pos.y > height) pos.y = 0; // Starta om om utanför canvas
    }
  }

  private drawPlatform() {
    image(
      platformImg,
      this.platformPosition.x,
      this.platformPosition.y,
      800,
      50
    ); // Rita plattform
  }

  private drawPlayer1() {
    image(player1Img, this.player1Position.x, this.player1Position.y);
  }

  private drawPlayer2() {
    image(player2Img, this.player2Position.x, this.player2Position.y);
  }
}

let startScene: StartScene;

let kavoonFont: p5.Font;
