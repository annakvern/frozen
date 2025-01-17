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

  constructor(color: string, position: p5.Vector, isChasing: boolean) {
    if (color === "yellow") {
      super(position, 70, 70, playerYellow, false);
    } else {
      super(position, 70, 70, playerGreen, false);
    }

    this.color = color;
    this.speed = createVector(0, 0);
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

  public playerControls() {}

  public draw() {
    image(this.img, this.position.x, this.position.y, 70, 70);
  }

  public update() {}
  // super.update();

  //   if(keyIsDown(LEFT_ARROW)){
  //     this.velocity.x = -5;
  //   }else if(keyIsDown(RIGHT_ARROW)){
  //     this.velocity.x = 5;
  //   } else {
  //     this.velocity.x = 0;
  //   }
  // }
}
