let podiumYellowImg: p5.Image;
let podiumGreenImg: p5.Image;



class ResultScene implements Scene {
  private titlePosition: p5.Vector;
  private textPosition: p5.Vector;
  private cloudPosition: p5.Vector;
  private snowflakePositions: p5.Vector;
  private player1Position: p5.Vector;
  private player2Position: p5.Vector;
  private podiumYellowPosition: p5.Vector;
  private podiumGreenPosition: p5.Vector;

  constructor() {
    this.titlePosition = createVector(800, 600); // Titelns position
    this.textPosition = createVector(400, 150); // Textens position
    this.cloudPosition = createVector(200, 100); // Molnets position
    this.snowflakePositions = createVector(1000, 300);
    this.player1Position = createVector(55, 550);
    this.player2Position = createVector(400, 550);
    this.podiumYellowPosition = createVector(width / 2, 900);
    this.podiumGreenPosition = createVector(width / 2, 900);
  }

  update(): void {
    
  }

  draw() {
    this.drawTitle();
    this.drawText();
    this.drawCloud();
    this.drawSnowflakes();
    this.drawPodium();
    this.drawPlayer1();
    this.drawPlayer2();
  }

  private drawTitle() {
    fill("yellow");
    textAlign(CENTER, CENTER);
    textSize(55);
    text("Yellow wins!", this.titlePosition.x, this.titlePosition.y);
    textFont(kavoonFont);

  }

  private drawText() {
    fill("white");
    textSize(10);
    text("Press any key to play again", this.textPosition.x, this.textPosition.y);
  }

  private drawSnowflakes() {
    image(snowflakeImg, this.snowflakePositions.x, this.snowflakePositions.y);
  }

  private drawCloud() {
    image(cloudImg, this.cloudPosition.x, this.cloudPosition.y, 120, 80);
  }


  private drawPodium() {  /// ("yellow").
    image(podiumYellowImg, this.podiumYellowPosition.x, this.podiumYellowPosition.y);    
  }


  private drawPlayer1() {
    image (player1Img, this.player1Position.x, this.player1Position.y);
  }


  private drawPlayer2() {
    image (player2Img, this.player2Position.x, this.player2Position.y);
  }



}


let resultScene: ResultScene;


