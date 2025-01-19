let snowman: p5.Image;
class Snowman extends GameObject {
  constructor(position: p5.Vector) {
    super(position, 60, 100, snowman, false);
  }
  public draw() {
    image(this.img, this.position.x, this.position.y, 99, 168);
  }

  public update() {}
}
