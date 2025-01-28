let teleport: p5.Image;

class Teleport extends GameObject {
  private isSpinning: boolean;
  private rotationAngle: number;
  private spinDuration: number;
  private spinStartTime: number;

  constructor(position: p5.Vector) {
    super(position, 70, 70, teleport, false);
    this.isSpinning = false;
    this.rotationAngle = 0;
    this.spinDuration = 350;
    this.spinStartTime = 0;
  }

  public update() {
    this.rotationAngle += 0.01; // Constant spin

    if (this.isSpinning) {
      const elapsedTime = millis() - this.spinStartTime;

      this.rotationAngle += 3; // Adjust speed here

      if (elapsedTime > this.spinDuration) {
        // Stops warp-spin
        this.isSpinning = false;
        this.rotationAngle = 0;
      }
    }
  }

  public draw() {
    push();
    // Flytta koordinatsystemet till teleportens position
    translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );

    rotate(this.rotationAngle); // Rotera bilden baserat på rotationAngle

    // Rita teleportens bild
    image(teleport, -this.width / 2, -this.height / 2, this.width, this.height);
    pop();
  }

  public warp() {
    this.isSpinning = true;
    this.spinStartTime = millis(); // Starta en ny animation
  }
}
