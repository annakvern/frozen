/// <reference path="gameObject.ts" />
let greenRight: p5.Image;
let yellowLeft: p5.Image;
let greenLeft: p5.Image;
let yellowRight: p5.Image;

class Player extends GameObject {
  color: string;
  speed: p5.Vector;
  isOnIce: boolean;
  isChasing: boolean;
  isJumping: boolean;
  gravity: number;
  dropTimer: number;
  timeSinceTeleport: number;
  timer: Timer;

  constructor(
    color: string,
    position: p5.Vector,
    isChasing: boolean,
    speedX: number,
    speedY: number
  ) {
    if (color === "yellow") {
      super(position, 50, 50, yellowLeft, false);
      this.timer = new Timer(
        "yellow",
        positionYellowTimerX,
        positionTimerY,
        60_000
      );
    } else {
      super(position, 50, 50, greenRight, false);
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
  public bounce() {}

  public toggleIsChasing() {
    this.isChasing = !this.isChasing;
  }

  public setPosition(port: string): void {
    if (port === "left") {
      this.position.x = 15;
    } else {
      this.position.x = 930;
    }
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
      if (keyIsDown(65)) {
        // A-tangenten (vänster)
        this.speed.x = max(-10, this.speed.x - 1.5);
        this.img = yellowLeft;
      } else if (keyIsDown(68)) {
        // D-tangenten (höger)
        this.speed.x = min(10, this.speed.x + 1.5);
        this.img = yellowRight;
      }
      if (keyIsDown(87)) {
        this.jump();
        this.isJumping = true;
        console.log("hoppar vi?");
      }
    } else if (this.color === "green") {
      if (keyIsDown(LEFT_ARROW)) {
        this.speed.x = max(-10, this.speed.x - 1.5);
        this.img = greenLeft;
      } else if (keyIsDown(RIGHT_ARROW)) {
        this.speed.x = min(10, this.speed.x + 1.5);
        this.img = greenRight;
      }
      if (keyIsDown(UP_ARROW)) {
        this.jump();
        this.isJumping = true;
        console.log("hoppar vi?");
      }
    }
  }

  public draw() {
    push();

    this.drawTriangle();
    super.draw();

    this.timer.draw();
    pop();
  }

  public update() {
    this.dropTimer -= deltaTime;
    if (this.dropTimer > 0) {
      return;
    }
    this.drawTriangle();
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
    if (this.speed.x > 0) {
      this.speed.x = max(0, this.speed.x - 0.5);
    } else if (this.speed.x < 0) {
      this.speed.x = min(0, this.speed.x + 0.5);
    }
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
