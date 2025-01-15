class GameObject {
  width: number;
  height: number;
  img: string;
  isSolid: boolean;
  position: p5.Vector;

  constructor(
    width: number,
    height: number,
    img: string,
    isSolid: boolean,
    position: p5.Vector
  ) {
    this.width = width;
    this.height = height;
    this.img = img;
    this.isSolid = isSolid;
    this.position = position;
  }

  public draw(): void {
    const asset = loadImage(this.img);
    image(asset, this.position.x, this.position.y, this.width, this.height);
  }

  public update() {}
}
