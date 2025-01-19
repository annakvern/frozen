let trampoline: p5.Image;
class Trampoline extends GameObject {
  constructor(position: p5.Vector) {
    super(position, 83, 108, trampoline, true);
  }
  public draw() {
    image(this.img, this.position.x, this.position.y, 108, 124);
  }

  public update() {}
}
