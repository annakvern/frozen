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
    this.titlePosition = createVector(canvasWidth / 2, 300);
    this.textPosition = createVector(canvasWidth / 2, 380);
    this.cloudPosition = createVector(120, 100);
    this.snowflakePositions = [
      { position: createVector(770, 185), size: 140 },
      { position: createVector(700, 40), size: 120 },
      { position: createVector(845, 70), size: 130 },
      { position: createVector(850, 350), size: 125 },
    ];
    this.podiumPosition = createVector(360, 506);
    this.quitButtonPosition = createVector(40, 660);
    this.textBounceY = this.textPosition.y;
    this.textBounceSpeed = 0.15;
    this.textBounceRange = 2;
  }

  update() {
    if (mouseIsPressed && this.checkQuitButtonClick()) {
      this.quitGame(); // CHANGE SCENE ON CLICK.
    }

    if (keyIsDown(32) && !changedScene) {
      changedScene = true; // that we changed the screen
      let nextPage = new StartScene(this.game);
      this.game.changeActiveScreen(nextPage);
    }
    this.textBounce();
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
    const titleColor =
      this.winner === "Yellow" ? "rgb(255, 213, 118)" : "rgb(58, 168, 167)";
    const titleText = this.winner === "Yellow" ? "Yellow wins!" : "Green wins!";

    // SHADOW SETTINGS.
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    fill(titleColor);
    textSize(80);
    textFont(kavoonFont);
    text(titleText, this.titlePosition.x, this.titlePosition.y);
    pop();
  }

  //// FUNCTION TO DRAW THE TEXT ON THE SCREEN.
  private drawText() {
    push();

    // SHADOW SETTINGS.
    drawingContext.shadowOffsetX = 2;
    drawingContext.shadowOffsetY = 2;
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";

    fill("white");
    textSize(25);
    fill("white");
    text("Press", this.textPosition.x - 115, +this.textBounceY);
    fill(255, 213, 118);
    text("SPACE", this.textPosition.x - 35, this.textBounceY);
    fill("white");
    text("to play again", this.textPosition.x + 90, this.textBounceY);
    pop();
  }

  private textBounce() {
    this.textBounceY += this.textBounceSpeed;
    if (
      this.textBounceY > this.textPosition.y + this.textBounceRange ||
      this.textBounceY < this.textPosition.y - this.textBounceRange
    ) {
      this.textBounceSpeed *= -1;
    }
  }

  //// FUNCTION TO DRAW THE CLOUD ON THE SCREEN.
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

  // FUNCTION TO DRAW THE SNOWFLAKES ON THE SCREEN.
  // LOOP THROUGH ALL SNOWFLAKES AND DRAW THEM AT THEIR RESPECTIVE POSITIONS.
  private drawSnowflakes() {
    push();

    for (let snowflake of this.snowflakePositions) {
      image(
        snowflakeImg,
        snowflake.position.x,
        snowflake.position.y,
        snowflake.size,
        snowflake.size
      );
    }
    pop();
  }

  //// FUNCTION TO DRAW THE WINNER'S PODIUM ON THE SCREEN.
  private drawPodium() {
    push();
    if (this.winner === "Yellow") {
      image(
        podiumYellowImg,
        this.podiumPosition.x,
        this.podiumPosition.y,
        300,
        180
      );
    } else if (this.winner === "Green") {
      image(
        podiumGreenImg,
        this.podiumPosition.x,
        this.podiumPosition.y,
        300,
        180
      );
    }
    pop();
  }

  private drawQuitButton() {
    // Rita texten för knappen
    push();
    fill(66, 165, 246);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("Quit", this.quitButtonPosition.x, this.quitButtonPosition.y);
    pop();
  }

  private checkQuitButtonClick() {
    const buttonWidth = 120; // Matcha med fasta värden
    const buttonHeight = 70; // Matcha med fasta värden

    return (
      mouseX > this.quitButtonPosition.x - buttonWidth / 2 &&
      mouseX < this.quitButtonPosition.x + buttonWidth / 2 &&
      mouseY > this.quitButtonPosition.y - buttonHeight / 2 &&
      mouseY < this.quitButtonPosition.y + buttonHeight / 2
    );
  }

  private quitGame() {
    game.changeActiveScreen(new StartScene(this.game));
  }
}

//// CREATE A RESULTSCENE OBJECT.
let resultScene: ResultScene;
