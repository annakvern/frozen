let teleport: p5.Image;
class Teleport extends GameObject {
  constructor(position: p5.Vector) {
    super(position, 70, 70, teleport, false);
  }
  public draw() {
    image(this.img, this.position.x, this.position.y, 70, 70);
  }

  public update() {}
}
