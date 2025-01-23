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
  // timer: Timer; //Står att den ska vara timer i diagrammet?

  constructor(
    color: string,
    position: p5.Vector,
    isChasing: boolean,
    speedX: number,
    speedY: number
  ) {
    if (color === "yellow") {
      super(position, 50, 50, playerYellow, false);
    } else {
      super(position, 50, 50, playerGreen, false);
    }

    console.log("isChasing is:" + isChasing);
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
      if (keyIsDown(LEFT_ARROW)) {
        this.speed.x = max(-10, this.speed.x - 1.5);
      } else if (keyIsDown(RIGHT_ARROW)) {
        this.speed.x = min(10, this.speed.x + 1.5);
      }

      if (keyIsDown(UP_ARROW)) {
        this.jump();
        this.isJumping = true;
        console.log("hoppar vi?");
      }
    } else if (this.color === "green") {
      if (keyIsDown(65)) {
        // A-tangenten (vänster)
        this.speed.x = max(-10, this.speed.x - 1.5);
      } else if (keyIsDown(68)) {
        // D-tangenten (höger)
        this.speed.x = min(10, this.speed.x + 1.5);
      }

      if (keyIsDown(87)) {
        this.jump();
        this.isJumping = true;
        console.log("hoppar vi?");
      }
    }
  }

  public draw() {
    push();

    //use scale to turn player
    super.draw();

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
    }

    // this.timer.draw();
    pop();
  }

  private applyFriction() {
    if (this.speed.x > 0) {
      this.speed.x = max(0, this.speed.x - 0.5);
    } else if (this.speed.x < 0) {
      this.speed.x = min(0, this.speed.x + 0.5);
    }
  }

 
  private slideOnIcePatch() {
    const icePatchLeftX = 485;
    const icePatchRightX = 590;
    const icePatchY = 381;
    if (
      this.position.x > icePatchLeftX &&
      this.position.x < icePatchRightX &&
      this.position.y === icePatchY
    ) {
      if (this.speed.x > 0) {
        this.speed.x = min(20, this.speed.x + 2);
      } else if (this.speed.x < 0) {
        this.speed.x = max(-20, this.speed.x - 2);
      }
    }
    // console.log("coords:",this.position.x, this.position.y, "speed:", this.speed.x);
  }

  public update() {
    this.slideOnIcePatch();
    this.applyFriction();
    this.applyGravity();
    this.playerControls();
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // if this.isChasing
    // this.timer.update()
  }
}
