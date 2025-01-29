let platform: p5.Image;
let icyPlatform: p5.Image;
let iciclePlatform: p5.Image;
let sandPlatform: p5.Image;
let slimePlatform: p5.Image;
let quicksandPlatform: p5.Image;
let quickSlimePlatform: p5.Image;
let type: string;

class Platform extends GameObject {
  type: string;

  constructor(type: string, position: p5.Vector) {
    let img: p5.Image;
    let height: number;

    if (type === "standard") {
      img = platform;
      height = 30 * 0.7;
    } else if (type === "icy") {
      img = icyPlatform;
      height = 30 * 0.7;
    } else if(type === "icicle") {
      img = iciclePlatform;
      height = 80 * 0.7;
    } else if (type === "sand"){
      img = sandPlatform;
      height = 30 * 0.7;
    } else if (type === "quicksand"){
      img = quicksandPlatform;
      height = 30 * 0.7;
    } else {
      img = slimePlatform;
      height = 80 * 0.7;
    }

    super(position, 146 * 0.72, height, img, true);
    this.type = type;
    this.height = height;
  }
}
