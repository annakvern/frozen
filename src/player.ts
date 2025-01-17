class Player extends GameObject {
  speed: p5.Vector;
  isOnIce: boolean;
  isChasing: boolean;
  timeSinceTeleport: number;
  timer: number; //Står att den ska vara timer i diagrammet?

  constructor(
    speed: p5.Vector,
    position: p5.Vector,
    isOnIce: boolean = false,
    isChasing: boolean = false,
    timeSinceTeleport: number = 0,
    timer: number = 0
  ) {
    super(40, 40, "assets/images/greenPlayerLeft.svg", false, position);
    this.speed = speed;
    this.position = position;
    this.isOnIce = isOnIce;
    this.isChasing = isChasing;
    this.timeSinceTeleport = timeSinceTeleport;
    this.timer = timer;
  }

  private setPosition(): void {}

  private applyGravity(): void {}

  public bounce() {}

  public jump() {}

  public toggleIsChasing() {}

  public playerControls() {}

  public draw() {}

  public update() {}
}
