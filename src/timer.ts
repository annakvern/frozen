const positionGreenTimerX: number = 50;
const positionTimerY: number = 35;
const positionYellowTimerX: number = 974;

class Timer {
  private color: string;
  private xPos: number;
  private yPos: number;
  public timeRemaining: number;

  constructor(color: string, xPos: number, yPos: number, timeLimit: number) {
    this.color = color;
    this.xPos = xPos;
    this.yPos = yPos;
    this.timeRemaining = timeLimit; // Initialize with the time limit
  }

  private tick(deltaTime: number) {
    this.timeRemaining -= deltaTime; // Decrease time based on deltaTime

    //Nu tickar klockan ner för värdet i IF-satsen.
    if (this.timeRemaining < 0) {
      this.timeRemaining = 0; // Ensure time doesn't go negative
    }
  }

  update(): void {
    this.tick(deltaTime);
  }

  private isLessThanTenSecLeft(): boolean {
    return this.timeRemaining <= 11000;
  }

  draw() {
    push();
    let textSizeValue = 50;

    if (this.isLessThanTenSecLeft()) {
      fill(255, 0, 0); // Röd text
      textSize(60);
      // Pulserande effekt med sin()
      let pulse = 10 * sin(millis() / 150);
      textSizeValue = 60 + pulse;
    } else if (this.color === "yellow") {
      fill(255, 213, 118);
    } else if (this.color === "green") {
      fill(58, 168, 167);
    }
    textSize(textSizeValue);
    textAlign(CENTER, CENTER);
    text(int(this.timeRemaining / 1000).toString(), this.xPos, this.yPos);
    pop();
  }
}
