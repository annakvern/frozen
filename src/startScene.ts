/// <reference path="playerInstruction.ts" />
let cloudImg: p5.Image;
let snowflakeImg: p5.Image;
let platformImg: p5.Image;
let player1Img: p5.Image;
let player2Img: p5.Image;

class StartScene implements Scene {
  private game: Game;
  private titlePosition: p5.Vector;
  private textPosition: p5.Vector;
  private cloudPosition: p5.Vector;
  private snowflakePositions: p5.Vector[];
  private snowflakeVelocity: p5.Vector[];
  private platformPosition: p5.Vector;
  private player1Position: p5.Vector;
  private player2Position: p5.Vector;
  private bounceTime: number;

  constructor(game: Game) {
    this.game = game;
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

    this.snowflakeVelocity = [];
    for (let i = 0; i < 50; i++) {
      this.snowflakeVelocity.push(createVector(1, random(2)));
    }

    this.platformPosition = createVector(50, 700); // Plattformens position
    this.player1Position = createVector(200, 650);
    this.player2Position = createVector(600, 650);
    this.bounceTime = 0;
  }

  update(): void {
    if (keyIsDown(32) && !changedScene) {
      // if the space key is down and changedScene is still false
      changedScene = true; // set changedScene state to true
      let nextPage = new PlayerInstruction(this.game);
      this.game.changeActiveScreen(nextPage);
    }

    this.bounceTime += 0.07;
    this.moveSnowflakes();
  }

  private moveSnowflakes() {
    for (const index in this.snowflakePositions) {
      const pos = this.snowflakePositions[index];
      const vel = this.snowflakeVelocity[index];
      pos.y += vel.y; // Fallande rörelse
      pos.x += vel.x; // Fallande rörelse

      if (pos.y > height) {
        pos.y = -40;
        pos.x = random(width);
      }
    }
  }

  draw() {
    background(164, 210, 248);
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
    push();
    fill("white");
    textSize(140);
    textAlign(CENTER, CENTER);
    textFont(kavoonFont);
    text("Tag or DIE!", this.titlePosition.x, this.titlePosition.y);
    pop();
  }

  private drawText() {
    push();
    const bounceOffset = sin(this.bounceTime) * 10;
    fill("white"); // Vit färg
    textSize(40);
    textAlign(CENTER, CENTER);
    text(
      "Press space to continue",
      this.textPosition.x,
      this.textPosition.y + bounceOffset
    );
    pop();
  }

  private drawCloud() {
    image(cloudImg, this.cloudPosition.x, this.cloudPosition.y, 550, 250);
  }

  private drawSnowflakes() {
    for (const pos of this.snowflakePositions) {
      image(snowflakeImg, pos.x, pos.y, 40, 40); // Rita snöflingor
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
