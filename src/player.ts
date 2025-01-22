/// <reference path="gameObject.ts" />
let playerYellow: p5.Image;
let playerGreen: p5.Image;

class Player extends GameObject {
  color: string;
  speed: p5.Vector;
  isOnIce: boolean;
  isChasing: boolean;
  isJumping: boolean;
  gravity: number;
  // timeSinceTeleport: number;
  // timer: number; //Står att den ska vara timer i diagrammet?

  constructor(
    color: string,
    position: p5.Vector,
    isChasing: boolean,
    speedX: number,
    speedY: number
  ) {
    if (color === "yellow") {
      super(position, 70, 70, playerYellow, false);
    } else {
      super(position, 70, 70, playerGreen, false);
    }

    this.color = color;
    this.speed = createVector(speedX, speedY);
    this.isOnIce = false;
    this.isChasing = isChasing;
    this.isJumping = false;
    this.gravity = 1;

    // this.timeSinceTeleport = ;
    // this.timer = timer;
  }
  public bounce() {}
  public toggleIsChasing() {}

  private setPosition(): void {}

  private applyGravity(): void {
    this.speed.y += this.gravity;

    this.position.y += this.speed.y;

    if (this.position.y >= height - 200) {
      this.speed.y = 0;
      this.position.y = height - 200;
      this.isJumping = false;
    }
  }

  public jump() {
    if (this.isJumping) return;
    this.speed.y -= 15;
    this.isJumping = true;
  }

  public playerControls() {
    if (this.color === "yellow") {
      if (keyIsDown(LEFT_ARROW)) {
        this.speed.x = -10;
      } else if (keyIsDown(RIGHT_ARROW)) {
        this.speed.x = 10;
      } else if (keyIsDown(UP_ARROW)) {
        this.jump();
        this.isJumping = true;
        console.log("hoppar vi?");
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
      } else if (keyIsDown(87)) {
        this.jump();
        this.isJumping = true;
        console.log("hoppar vi?");
      } else {
        this.speed.x = 0;
      }
    }
  }

  public draw() {
    image(this.img, this.position.x, this.position.y, 50, 50);
  }

  public update() {
    this.playerControls();
    this.applyGravity();
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
