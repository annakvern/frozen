let platform: p5.Image;
let icyPlatform: p5.Image;
let iciclePlatform: p5.Image;
let type: string;

class Platform extends GameObject {
  type: string;

  constructor(type: string, position: p5.Vector) {
    let img: p5.Image;
    let height: number;

    if (type === "standard") {
      img = platform;
      height = 30 * 0.67;
    } else if (type === "icy") {
      img = icyPlatform;
      height = 30 * 0.67;
    } else {
      img = iciclePlatform;
      height = 80 * 0.67;
    }
    super(position, 146 * 0.67, height, img, true);
    this.type = type;
    this.height = height;
  }

  public draw() {
    image(this.img, this.position.x, this.position.y, 146 * 0.67, this.height);
  }

  public update() {}
}
