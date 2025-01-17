let platform: p5.Image;
class Platform extends GameObject {
  constructor(position: p5.Vector) {
    super(position, 146, 30, platform, true);
  }
  public draw() {
    image(this.img, this.position.x, this.position.y, 146, 30);
  }

  public update() {}
}
