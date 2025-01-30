/// <reference path="game.ts" />

class GameObject {
  public position: p5.Vector;
  public width: number;
  public height: number;
  public images: p5.Image[];

  constructor(
    position: p5.Vector,
    width: number,
    height: number,
    images: p5.Image[]
  ) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.images = images;
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
    } else {
      // Debugging fallback: Draw a placeholder rectangle if the image is missing
      fill("red");
      rect(this.position.x, this.position.y, this.width, this.height);
      console.error(
        `Missing image for object at ${this.position.x}, ${this.position.y}`
      );
    }
  }

  public update(): void {}
}
