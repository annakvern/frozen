let snowman: p5.Image;
class Snowman extends GameObject {
  constructor(position: p5.Vector) {
    super(position, 69, 118, snowman, false);
  }
  public draw() {
    image(this.img, 600, 145, 69, 118);
  }

  public update() {}
}
