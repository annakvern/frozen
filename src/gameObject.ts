/// <reference path="game.ts" />

class GameObject {
  width: number;
  height: number;
  img: p5.Image;
  isSolid: boolean;
  position: p5.Vector;

  constructor(
    width: number,
    height: number,
    imgKey: string,
    isSolid: boolean,
    position: p5.Vector
  ) {
    this.width = width;
    this.height = height;
    this.img = assets[imgKey];
    this.isSolid = isSolid;
    this.position = position;
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
