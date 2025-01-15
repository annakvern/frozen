class Player {
  speed: p5.Vector;
  isOnIce: Boolean;
  isChasing: Boolean;
  timeSinceTeleport: Number;
  timer: string; //Står att den ska vara timer i diagrammet?

  constructor(
    speed: p5.Vector,
    isOnIce: Boolean,
    isChasing: Boolean,
    timeSinceTeleport: Number,
    timer: string
  ) {
    this.speed = speed;
    this.isOnIce = isOnIce;
    this.isChasing = isChasing;
    this.timeSinceTeleport = timeSinceTeleport;
    this.timer = timer;
  }

  private setPosition() {}

  private applyGravity() {}

  public bounce() {}

  public jump() {}

  public toggleIsChasing() {}

  public playerControls() {}
}
