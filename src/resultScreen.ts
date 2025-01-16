//// ATT GÖRA; FÄRDIGSTÄLL UPDATE(), MED IF-SATSER BYTA SCREEN BEROENDE PÅ VINNARE, QUIT-KNAPPEN, SKUGGA PÅ TEXT, UNDERTEXT STUDSAR.


//// DECLARE IMAGES TO BE USED IN THE SCENE.
let podiumYellowImg: p5.Image;
let podiumGreenImg: p5.Image;

//// DECLARE POSITIONS AND SIZE FOR THE ELEMENTS ON THE SCREEN.
class ResultScene implements Scene {
  private titlePosition: p5.Vector;
  private textPosition: p5.Vector;
  private cloudPosition: p5.Vector;
  private snowflakePositions: { position: p5.Vector; size: number }[];
  private podiumYellowPosition: p5.Vector;
  private podiumGreenPosition: p5.Vector;

  //// SET POSITIONS FOR ALL ELEMENTS BASED ON SCREEN SIZE.
  constructor() {
    this.titlePosition = createVector(width * 0.5, height * 0.4); 
    this.textPosition = createVector(width * 0.5, height * 0.55 ); 
    this.cloudPosition = createVector(width * 0.26, height * 0.13); 
    this.snowflakePositions = 
    [
      { position: createVector(width * 0.73, height * 0.23), size: 200 },
      { position: createVector(width * 0.65, height * 0.10), size: 150 },
      { position: createVector(width * 0.83, height * 0.15), size: 150 },
      { position: createVector(width * 0.77, height * 0.55), size: 175 },
    ];
    this.podiumYellowPosition = createVector(width * 0.43, height * 0.83);
    this.podiumGreenPosition = createVector(width * 0.43, height * 0.81);
  }

  update() {
    
    
  }

  //// DRAW ALL ELEMENTS ON THE SCREEN.
  draw() {
    this.drawTitle();
    this.drawText(); 
    this.drawCloud();      
    this.drawSnowflakes();
    this.drawPodium();
  }

  //// FUNCTION TO DRAW THE TITLE ON THE SCREEN.
  private drawTitle() {
    push();
    const titleSize = width * 0.07;
    fill("yellow");
    textAlign(CENTER, CENTER);
    textSize(titleSize);
    textFont(kavoonFont);
    text("Yellow wins!", this.titlePosition.x, this.titlePosition.y);
    pop();
  }

  //// FUNCTION TO DRAW THE TEXT ON THE SCREEN.
  private drawText() {
    const txtSize = width * 0.015;
    push();
    fill("white");
    textSize(txtSize);
    text("Press any key to play again", this.textPosition.x, this.textPosition.y);
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
      image(snowflakeImg, snowflake.position.x, snowflake.position.y, snowflake.size, snowflake.size);
    }
  }

  //// FUNCTION TO DRAW THE WINNER'S PODIUM ON THE SCREEN.
  private drawPodium() {  /// ("yellow").
    const podiumWidth = width * 0.15;
    const podiumHeight = height * 0.17; 
    image(podiumYellowImg, this.podiumYellowPosition.x, this.podiumYellowPosition.y, podiumWidth, podiumHeight);       
  }

}

//// CREATE A RESULTSCENE OBJECT.
let resultScene: ResultScene;


