let platform: p5.Image;
let icyPlatform: p5.Image;
let iciclePlatform: p5.Image;

class Platform extends GameObject {
  constructor(position: p5.Vector) {
    super(position, 146 * 0.67, 30 * 0.67, platform, true);
    super(position, 146 * 0.67, 30 * 0.67, icyPlatform, true);
    super(position, 146 * 0.67, 30 * 0.67, iciclePlatform, true);
  }
  public draw() {
    image(this.img, this.position.x, this.position.y, 146, 30);
  }

  public update() {}
}
