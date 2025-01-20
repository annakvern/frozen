const positionGreenTimerX: number = 800;
const positionTimerY: number = 50;
const positionYellowTimerX: number = 25;

class Timer {
  color: string;

  constructor(color: string) {
    this.color = color;
    if (color === "yellow") {
      let xPos = positionYellowTimerX;
      let yPos = positionTimerY;
      this.drawText("yellow", xPos, yPos);
    } else {
      let xPos = positionGreenTimerX;
      let yPos = positionTimerY;
      this.drawText("green", xPos, yPos);
    }
  }

  private drawText(color: string, xPos: number, yPos: number) {
    fill(color);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("60", xPos, yPos);
  }
}
