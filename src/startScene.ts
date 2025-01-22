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
    this.titlePosition = createVector(canvasWidth / 2, canvasHeight / 2 - 60); // Titelns position
    this.textPosition = createVector(canvasWidth / 2, canvasHeight / 2 + 50); // Textens position
    this.cloudPosition = createVector(120, 60); // Molnets position
    this.snowflakePositions = [];
    for (let i = 0; i < 50; i++) {
      // Lägg till 50 snöflingor
      this.snowflakePositions.push(createVector(random(width), random(height)));
    } // Lista för snöflingornas positioner

    this.snowflakeVelocity = [];
    for (let i = 0; i < 50; i++) {
      this.snowflakeVelocity.push(createVector(1, random(2)));
    }

    this.platformPosition = createVector(50, 600); // Plattformens position
    this.player1Position = createVector(120, 535);
    this.player2Position = createVector(400, 535);
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

    // SHADOW SETTINGS.
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    textSize(100);
    textAlign(CENTER, CENTER);
    textFont(kavoonFont);

    fill(58, 168, 167);
    text(
      "Tag",
      this.titlePosition.x - textWidth(" or DIE!") / 2,
      this.titlePosition.y
    );

    fill("white");
    text("or ", this.titlePosition.x, this.titlePosition.y);

    fill(255, 213, 118);
    text(
      " DIE!",
      this.titlePosition.x + textWidth("Tag or ") / 2,
      this.titlePosition.y
    );

    pop();
  }

  private drawText() {
    push();

    // SHADOW SETTINGS.
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    const bounceOffset = sin(this.bounceTime) * 3;
    fill("white"); // Vit färg
    textSize(25);
    textAlign(CENTER, CENTER);
    fill("white");
    text(
      "Press",
      this.textPosition.x - 115,
      this.textPosition.y + bounceOffset
    );
    fill(255, 213, 118);
    text("SPACE", this.textPosition.x - 35, this.textPosition.y + bounceOffset);
    fill("white");
    text(
      "to get started",
      this.textPosition.x + 95,
      this.textPosition.y + bounceOffset
    );

    pop();
  }

  private drawCloud() {
    push();

    // SHADOW SETTINGS.
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    image(cloudImg, this.cloudPosition.x, this.cloudPosition.y, 300, 150);
    pop();
  }

  private drawSnowflakes() {
    for (const pos of this.snowflakePositions) {
      image(snowflakeImg, pos.x, pos.y, 40, 40); // Rita snöflingor
    }
  }

  private drawPlatform() {
    push();

    // SHADOW SETTINGS.
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    image(
      platformImg,
      this.platformPosition.x,
      this.platformPosition.y,
      500,
      35
    ); // Rita plattform
    pop();
  }

  private drawPlayer1() {
    push();

    // SHADOW SETTINGS.
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    image(player1Img, this.player1Position.x, this.player1Position.y);
    pop();
  }

  private drawPlayer2() {
    push();

    // SHADOW SETTINGS.
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    image(player2Img, this.player2Position.x, this.player2Position.y);
    pop();
  }
}

let startScene: StartScene;

let kavoonFont: p5.Font;
