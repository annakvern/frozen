/// <reference path="gameObject.ts" />
let greenRight: p5.Image;
let yellowLeft: p5.Image;
let greenLeft: p5.Image;
let yellowRight: p5.Image;
let yellowHalfSquish: p5.Image;
let yellowSquish: p5.Image;
let greenHalfSquish: p5.Image;
let greenSquish: p5.Image;

class Player extends GameObject {
  public color: string;
  public speed: p5.Vector;
  private isOnIce: boolean;
  private isChasing: boolean;
  public isJumping: boolean;
  private gravity: number;
  public dropTimer: number;
  private timeSinceTeleport: number;
  public timer: Timer;
  private isFacingRight: boolean;

  constructor(
    color: string,
    position: p5.Vector,
    isChasing: boolean,
    speedX: number,
    speedY: number
  ) {
    if (color === "yellow") {
      super(position, 50, 50, [yellowRight]);
      this.isFacingRight = false;
      this.timer = new Timer(
        "yellow",
        positionYellowTimerX,
        positionTimerY,
        60_000
      );
    } else {
      super(position, 50, 50, [greenRight]);
      this.isFacingRight = true;
      this.timer = new Timer(
        "green",
        positionGreenTimerX,
        positionTimerY,
        60_000
      );
    }

    this.color = color;
    this.speed = createVector(speedX, speedY);
    this.isOnIce = false;
    this.isChasing = isChasing;
    this.isJumping = false;
    this.gravity = 1;
    this.dropTimer = -1000;
    this.timeSinceTeleport = -1000;
  }

  public toggleIsChasing() {
    this.isChasing = !this.isChasing;
  }

  private applyGravity(): void {
    this.speed.y += this.gravity;

    this.position.y += this.speed.y;

    if (this.position.y >= height - 30 * 0.7) {
      this.speed.y = 0;
      this.position.y = height - 30 * 0.7;
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
      // Less control on ice
      if (this.isOnIce) {
        if (keyIsDown(65)) {
          // A-tangenten (vänster)
          this.speed.x = max(-10, this.speed.x - 0.5);
          this.isFacingRight = false;
        } else if (keyIsDown(68)) {
          // D-tangenten (höger)
          this.speed.x = min(10, this.speed.x + 0.5);
          this.isFacingRight = true;
        }
      } else {
        // Normal control
        if (keyIsDown(65)) {
          // A-tangenten (vänster)
          this.speed.x = max(-10, this.speed.x - 1.5);
          this.isFacingRight = false;
        } else if (keyIsDown(68)) {
          // D-tangenten (höger)
          this.speed.x = min(10, this.speed.x + 1.5);
          this.isFacingRight = true;
        }
      }
      if (keyIsDown(87)) {
        this.jump();
        this.isJumping = true;
        console.log("hoppar vi?");
      }
    } else if (this.color === "green") {
      // Reduced control on icepatch
      if (this.isOnIce) {
        if (keyIsDown(LEFT_ARROW)) {
          this.speed.x = max(-10, this.speed.x - 0.5);
          this.isFacingRight = false;
        } else if (keyIsDown(RIGHT_ARROW)) {
          this.speed.x = min(10, this.speed.x + 0.5);
          this.isFacingRight = true;
        }
        if (keyIsDown(UP_ARROW)) {
          this.jump();
          this.isJumping = true;
        }
      } else {
        // Normal control
        if (keyIsDown(LEFT_ARROW)) {
          this.speed.x = max(-10, this.speed.x - 1.5);
          this.isFacingRight = false;
        } else if (keyIsDown(RIGHT_ARROW)) {
          this.speed.x = min(10, this.speed.x + 1.5);
          this.isFacingRight = true;
        }
        if (keyIsDown(UP_ARROW)) {
          this.jump();
          this.isJumping = true;
          console.log("hoppar vi?");
        }
      }
    }
  }

  public draw() {
    push();

    this.drawTriangle();
    this.timer.draw();

    if (!this.isFacingRight) {
      scale(-1, 1);
      translate(-this.width - this.position.x * 2, 0);
    }

    super.draw();

    pop();
  }

  public update() {
    super.update();
    this.dropTimer -= deltaTime;
    if (this.dropTimer > 0) {
      return;
    }
    this.drawTriangle();
    this.slideOnIcePatch();
    this.applyFriction();
    this.applyGravity();
    this.playerControls();
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (this.isChasing) {
      this.timer.update();
    }
  }

  private applyFriction() {
    if (!this.isOnIce) {
      if (this.speed.x > 0) {
        this.speed.x = max(0, this.speed.x - 0.5);
      } else if (this.speed.x < 0) {
        this.speed.x = min(0, this.speed.x + 0.5);
      }
    }
  }

  private slideOnIcePatch() {
    const icePatchLeftX = 260;
    const icePatchRightX = 720;
    const icePatchY = 209;

    this.isOnIce =
      this.position.x > icePatchLeftX &&
      this.position.x < icePatchRightX &&
      this.position.y === icePatchY;

    if (this.isOnIce) {
      console.log("We are on icepatch");

      if (this.speed.x > 0) {
        this.speed.x = min(20, this.speed.x + 0.2);
      } else if (this.speed.x < 0) {
        this.speed.x = max(-20, this.speed.x - 0.2);
      } else {
        this.speed.x = 2;
      }
    }
    // console.log(${this.position.x}, ${this.position.y});
  }

  public drawTriangle() {
    if (this.isChasing) {
      // rita triangel
      push();
      translate(this.position.x + 25, this.position.y - 25);
      fill("blue");
      noStroke();
      beginShape();
      vertex(-8, 0);
      vertex(8, 0);
      vertex(0, 14);
      endShape(CLOSE);
      pop();
    } else {
      return;
    }
  }
}
