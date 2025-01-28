const positionGreenTimerX: number = 50;
const positionTimerY: number = 35;
const positionYellowTimerX: number = 974;

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

  private tick() {}

  update(deltaTime: number): void {
    this.timeRemaining -= deltaTime; // Decrease time based on deltaTime

    //Nu tickar klockan ner för värdet i IF-satsen.
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
    text(int(this.timeRemaining / 1000).toString(), this.xPos, this.yPos);
  }
}
