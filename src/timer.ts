const positionGreenTimerX: number = 1390;
const positionTimerY: number = 50;
const positionYellowTimerX: number = 50;
let timeLimit = 60;

class Timer {
  color: string;
  xPos: number;
  yPos: number;
  timeRemaining: number;

  constructor(color: string, xPos: number, yPos: number, timeLimit: number) {
    this.color = color;
    this.xPos = xPos;
    this.yPos = yPos;
    this.timeRemaining = timeLimit; // Initialize with the time limit
  }

  update(deltaTime: number): void {
    this.timeRemaining -= deltaTime; // Decrease time based on deltaTime
    if (this.timeRemaining < 0) {
      this.timeRemaining = 0; // Ensure time doesn't go negative
    }
  }

  draw() {
    if (this.color === "yellow") {
      fill(255, 213, 118);
    } else if (this.color === "green") {
      fill(58, 168, 167);
    }
    textSize(50);
    textAlign(CENTER, CENTER);
    if (this.timeRemaining > 0) {
      text(int(this.timeRemaining).toString(), this.xPos, this.yPos);
    } else {
      fill("red");
      text("GAME\nOVER", width / 2 - 50, height / 2);
    }
  }
}
