/// <reference path="game.ts" />

class GameObject {
  public position: p5.Vector;
  public width: number;
  public height: number;
  public images: p5.Image[];
  protected animationTimer: number;
  protected animationDuration: number;

  constructor(
    position: p5.Vector,
    width: number,
    height: number,
    images: p5.Image[],
    animationDuration = 0
  ) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.images = images;
    this.animationDuration = animationDuration;
    this.animationTimer = 0;
  }

  protected setAnimation(images: p5.Image[], animationDuration: number) {
    this.images = images;
    this.animationDuration = animationDuration;
  }

  public draw(): void {
    if (this.images.length === 1) {
      image(
        this.images[0],
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    } else if (this.images.length > 1) {
      // floor(timer / duration) = index
      // 200 / 1000 = 0-1

      // 0 - 250 = 0
      // 250 - 500 = 1
      // 500 - 750 = 2
      // 750 - 1000 = 3

      // 4 / 0.5 = 8
      // 0.5 / 4 = 0.125
      // 4 * 0.5 = 2
      // 4 * 0.2 = 0.8
      // 4 * 0.9 = 3.6

      const percentageOfDuration = this.animationTimer / this.animationDuration;
      const index = floor(this.images.length * percentageOfDuration);

      image(
        this.images[index],
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    } else {
      // Debugging fallback: Draw a placeholder rectangle if the image is missing
      fill("red");
      rect(this.position.x, this.position.y, this.width, this.height);
      console.error(
        `Missing image for object at ${this.position.x}, ${this.position.y}`
      );
    }
  }

  public update(): void {
    if (this.images.length > 1) {
      this.animationTimer += deltaTime;

      if (this.animationTimer > this.animationDuration) {
        this.animationTimer -= this.animationDuration; // 1015 - 1000 = 15
      }
    }
  }
}
