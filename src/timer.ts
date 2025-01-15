class Timer extends GameObject {
  color: string;

  constructor(color: string) {
    const img = color;
    super(50, 50, img, false, createVector(0, 0));
    this.color = color;
    if (color === "yellow") {
      this.drawText("yellow");
    } else {
      this.drawText("green");
    }
  }

  private drawText(color: string) {
    fill(color);
    textSize(20);
    textAlign(CENTER, CENTER);
    text("60", 0, 0);
  }
}
