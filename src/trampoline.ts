let trampoline: p5.Image;
class Trampoline extends GameObject {
  constructor(position: p5.Vector) {
    super(position, 76, 87, trampoline);
  }
  public draw() {
    image(this.img, this.position.x, this.position.y, 76, 87);
  }

  public update() {}
}
