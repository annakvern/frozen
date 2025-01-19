/// <reference path="game.ts" />

class GameObject {
  position: p5.Vector;
  width: number;
  height: number;
  img: p5.Image;
  isSolid: boolean;

  constructor(
    position: p5.Vector,
    width: number,
    height: number,
    img: p5.Image,
    isSolid: boolean
  ) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.img = img;
    this.isSolid = isSolid;
  }

  public draw(): void {
    if (this.img) {
      image(
        this.img,
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
