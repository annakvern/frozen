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
  private bounceTime: number;

  constructor() {
    this.titlePosition = createVector(windowWidth * 0.5, windowHeight * 0.5); // Titelns position
    this.textPosition = createVector(
      windowWidth * 0.5,
      windowHeight * 0.5 + 150
    ); // Textens position
    this.cloudPosition = createVector(350, 120); // Molnets position
    this.snowflakePositions = [];
    for (let i = 0; i < 50; i++) {
      // Lägg till 50 snöflingor
      this.snowflakePositions.push(createVector(random(width), random(height)));
    } // Lista för snöflingornas positioner
    this.platformPosition = createVector(50, 700); // Plattformens position
    this.player1Position = createVector(200, 650);
    this.player2Position = createVector(600, 650);
    this.bounceTime = 0;
  }
  update(): void {
    if (key) {
      let nextPage = new PlayerInstruction();
      game.changeActiveScreen(nextPage);
    }
  }

  draw() {
    // Kallar på draw funktionerna
    this.drawSnowflakes();

    this.drawTitle();

    this.drawText();

    this.drawCloud();

    this.drawPlatform();

    this.drawPlayer1();

    this.drawPlayer2();
  }

  private drawTitle() {
    fill("white");
    textSize(140);
    textAlign(CENTER, CENTER);
    text("Tag or DIE!", this.titlePosition.x, this.titlePosition.y);
    textFont(kavoonFont);
  }

  private drawText() {
    const bounceOffset = sin(this.bounceTime) * 10;
    fill("white"); // Vit färg
    textSize(40);
    textAlign(CENTER, CENTER);
    text(
      "Press any key to continue",
      this.textPosition.x,
      this.textPosition.y + bounceOffset
    );
    this.bounceTime += 0.07;
  }

  private drawCloud() {
    image(cloudImg, this.cloudPosition.x, this.cloudPosition.y, 550, 250);
  }

  private drawSnowflakes() {
    this.snowflakePositions = this.snowflakePositions.filter((pos) => {
      image(snowflakeImg, pos.x, pos.y, 40, 40); // Rita snöflingor
      pos.y += 1; // Fallande rörelse
      return pos.y <= height; // Behåll endast de som är ovanför skärmens botten
    });
    while (this.snowflakePositions.length < 50) {
      // Max 50 snöflingor
      this.snowflakePositions.push(createVector(random(width), 0)); // Skapa ny snöflinga högst upp
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
