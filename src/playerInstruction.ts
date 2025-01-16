let playerInstruction1img: p5.Image;
let playerInstruction2img: p5.Image;
let playerKeysYellow: p5.Image;
let playerKeysGreen: p5.Image;
let soundOnimg: p5.Image;

class PlayerInstruction implements Scene {
  private titlePosition: p5.Vector;
  private textPosition: p5.Vector;
  private player1Position: p5.Vector;
  private player2Position: p5.Vector;
  private playerKeysYellowPosition: p5.Vector;
  private playerKeysGreenPosition: p5.Vector;
  private playSoundPosition: p5.Vector;

  constructor() {
    this.titlePosition = createVector(width / 2, 100);
    this.textPosition = createVector(width / 2, 200);
    this.player1Position = createVector(980, 300);
    this.player2Position = createVector(410, 300);
    this.playerKeysYellowPosition = createVector(980, 460);
    this.playerKeysGreenPosition = createVector(400, 460);
    this.playSoundPosition = createVector(1440, 600);
  }

  update(): void {
    if (key) {
      let nextPage = new PlayerInstruction();
      game.changeActiveScreen(nextPage);
    }
  }

  draw(): void {
    // background("tomato");
    // Kallar på funktionerna
    this.drawTitle();
    this.drawText();
    this.drawPlayer1();
    this.drawPlayer2();
    this.drawPlayerKeysYellow();
    this.drawPlayerKeysGreen();
    this.playSound();    
  }

  private drawTitle() {
    fill("white");
    textSize(100);
    textAlign(CENTER, CENTER);
    text("READY?", this.titlePosition.x, this.titlePosition.y);
    textFont(kavoonFont);
  }

  private drawText() {
    fill("white");
    textSize(20);
    textAlign(CENTER, CENTER);
    text("Press any key to get started", this.textPosition.x, this.textPosition.y);
    text("You have 2 mins - Tag or DIE!", this.textPosition.x -0, 630);
    textSize(40);
    text("Player 1", this.textPosition.x -300, 250);
    text("Player 2", this.textPosition.x +280, 250);
    textFont(kavoonFont);
  }

  private drawPlayer1() {
    image(playerInstruction1img, this.player1Position.x, this.player1Position.y, 130, 130);
  }

  private drawPlayer2() {
    image(playerInstruction2img, this.player2Position.x, this.player2Position.y, 130, 130);
  }

  private drawPlayerKeysYellow() { 
    image(playerKeysYellow, this.playerKeysYellowPosition.x, this.playerKeysYellowPosition.y, 150, 100);
  }
  private drawPlayerKeysGreen() {
    image(playerKeysGreen, this.playerKeysGreenPosition.x, this.playerKeysGreenPosition.y, 150, 100);
  }
  private playSound() {
    image(soundOnimg, this.playSoundPosition.x, this.playSoundPosition.y, 40, 40);
  }

}
