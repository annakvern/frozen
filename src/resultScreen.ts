//// ATT GÖRA; FÄRDIGSTÄLL UPDATE()

//// DECLARE IMAGES TO BE USED IN THE SCENE.
let podiumYellowImg: p5.Image;
let podiumGreenImg: p5.Image;

//// DECLARE POSITIONS AND SIZE FOR THE ELEMENTS ON THE SCREEN.
class ResultScene implements Scene {
  private game: Game;
  private titlePosition: p5.Vector;
  private textPosition: p5.Vector;
  private cloudPosition: p5.Vector;
  private snowflakePositions: { position: p5.Vector; size: number }[];
  private podiumPosition: p5.Vector;
  private winner: string;
  private quitButtonPosition: p5.Vector;
  private textBounceY: number;
  private textBounceSpeed: number;
  private textBounceRange: number;

  //// SET POSITIONS FOR ALL ELEMENTS BASED ON SCREEN SIZE.
  constructor(game: Game, winner: string) {
    this.game = game;
    this.winner = winner;
    this.titlePosition = createVector(width * 0.5, height * 0.4);
    this.textPosition = createVector(width * 0.5, height * 0.55);
    this.cloudPosition = createVector(width * 0.26, height * 0.13);
    this.snowflakePositions = [
      { position: createVector(width * 0.73, height * 0.23), size: 200 },
      { position: createVector(width * 0.65, height * 0.1), size: 150 },
      { position: createVector(width * 0.83, height * 0.15), size: 150 },
      { position: createVector(width * 0.77, height * 0.55), size: 175 },
    ];
    this.podiumPosition = createVector(width * 0.35, height * 0.8);
    this.quitButtonPosition = createVector(width * 0.03, height * 0.95);
    this.textBounceY = this.textPosition.y;
    this.textBounceSpeed = 0.25;
    this.textBounceRange = height * 0.003;
  }

  update() {
    if (mouseIsPressed && this.checkQuitButtonClick()) {
      this.quitGame(); // CHANGE SCENE ON CLICK.
    }

    this.textBounceY += this.textBounceSpeed;
    if (
      this.textBounceY > this.textPosition.y + this.textBounceRange ||
      this.textBounceY < this.textPosition.y - this.textBounceRange
    ) {
      this.textBounceSpeed *= -1;
    }

    if (keyIsDown(32) && !changedScene) {
      changedScene = true; // that we changed the screen
      let nextPage = new StartScene(this.game);
      this.game.changeActiveScreen(nextPage);
    }
  }

  //// DRAW ALL ELEMENTS ON THE SCREEN.
  draw() {
    background(164, 211, 247);
    this.drawTitle();
    this.drawText();
    this.drawCloud();
    this.drawSnowflakes();
    this.drawPodium();
    this.drawQuitButton();
  }

  //// FUNCTION TO DRAW THE TITLE ON THE SCREEN.
  private drawTitle() {
    push();
    const titleSize = width * 0.07;
    const titleColor =
      this.winner === "Yellow" ? "rgb(255, 213, 118)" : "rgb(58, 168, 167)";
    const titleText = this.winner === "Yellow" ? "Yellow wins!" : "Green wins!";

    // SHADOW SETTINGS.
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    fill(titleColor);
    textAlign(CENTER, CENTER);
    textSize(titleSize);
    textFont(kavoonFont);
    text(titleText, this.titlePosition.x, this.titlePosition.y);
    pop();
  }

  //// FUNCTION TO DRAW THE TEXT ON THE SCREEN.
  private drawText() {
    push();
    const txtSize = width * 0.015;

    // SHADOW SETTINGS.
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    fill("white");
    textSize(txtSize);
    text("Press any key to play again", this.textPosition.x, this.textBounceY);
    pop();
  }

  //// FUNCTION TO DRAW THE CLOUD ON THE SCREEN.
  private drawCloud() {
    image(cloudImg, this.cloudPosition.x, this.cloudPosition.y);
  }

  // FUNCTION TO DRAW THE SNOWFLAKES ON THE SCREEN.
  // LOOP THROUGH ALL SNOWFLAKES AND DRAW THEM AT THEIR RESPECTIVE POSITIONS.
  private drawSnowflakes() {
    for (let snowflake of this.snowflakePositions) {
      image(
        snowflakeImg,
        snowflake.position.x,
        snowflake.position.y,
        snowflake.size,
        snowflake.size
      );
    }
  }

  //// FUNCTION TO DRAW THE WINNER'S PODIUM ON THE SCREEN.
  private drawPodium() {
    /// ("yellow").
    const podiumWidth = width * 0.23;
    const podiumHeight = height * 0.2;

    if (this.winner === "Yellow") {
      image(
        podiumYellowImg,
        this.podiumPosition.x,
        this.podiumPosition.y,
        podiumWidth,
        podiumHeight
      );
    } else if (this.winner === "Green") {
      image(
        podiumGreenImg,
        this.podiumPosition.x,
        this.podiumPosition.y,
        podiumWidth,
        podiumHeight
      );
    }
  }

  private drawQuitButton() {
    push();
    fill(66, 165, 246);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("Quit", this.quitButtonPosition.x, this.quitButtonPosition.y);
    pop();
  }

  private checkQuitButtonClick(): boolean {
    const buttonWidth = width * 0.05;
    const buttonHeight = height * 0.035;
    return (
      mouseX > this.quitButtonPosition.x - buttonWidth / 2 &&
      mouseX < this.quitButtonPosition.x + buttonWidth / 2 &&
      mouseY > this.quitButtonPosition.y - buttonHeight / 2 &&
      mouseY < this.quitButtonPosition.y + buttonHeight / 2
    );
  }

  private quitGame() {
    game.changeActiveScreen(new PlayerInstruction(this.game));
  }
}

//// CREATE A RESULTSCENE OBJECT.
let resultScene: ResultScene;
