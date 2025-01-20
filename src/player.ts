/// <reference path="gameObject.ts" />
let playerYellow: p5.Image;
let playerGreen: p5.Image;

class Player extends GameObject {
  color: string;
  speed: p5.Vector;
  isOnIce: boolean;
  isChasing: boolean;
  // timeSinceTeleport: number;
  // timer: number; //Står att den ska vara timer i diagrammet?

  constructor(
    color: string,
    position: p5.Vector,
    isChasing: boolean,
    speedX: number,
    SpeedY: number
  ) {
    if (color === "yellow") {
      super(position, 70, 70, playerYellow, false);
    } else {
      super(position, 70, 70, playerGreen, false);
    }

    this.color = color;
    this.speed = createVector(speedX, SpeedY);
    this.isOnIce = false;
    this.isChasing = isChasing;

    // this.timeSinceTeleport = ;
    // this.timer = timer;
  }

  private setPosition(): void {}

  private applyGravity(): void {}

  public bounce() {}

  public jump() {}

  public toggleIsChasing() {}

  public playerControls() {
    if (this.color === "yellow") {
      if (keyIsDown(LEFT_ARROW)) {
        this.speed.x = -10;
      } else if (keyIsDown(RIGHT_ARROW)) {
        this.speed.x = 10;
      } else {
        this.speed.x = 0;
      }
    } else if (this.color === "green") {
      if (keyIsDown(65)) {
        // A-tangenten (vänster)
        this.speed.x = -10;
      } else if (keyIsDown(68)) {
        // D-tangenten (höger)
        this.speed.x = 10;
      } else {
        this.speed.x = 0; //Spelaren stannar för tillfället helt när anvndaren släpper tangenten
      }
    }
  }

  public draw() {
    image(this.img, this.position.x, this.position.y, 70, 70);
  }

  public update() {
    this.playerControls();
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
