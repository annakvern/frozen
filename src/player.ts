/// <reference path="gameObject.ts" />
let playerYellow: p5.Image;
let playerGreen: p5.Image;
let groundLevel: number = 200;

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
    SpeedY: number,
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
    this.isJumping = false;
    this.gravity = 0;
    
    

    // this.timeSinceTeleport = ;
    // this.timer = timer;
  }

  private setPosition(): void {}

  private applyGravity(): void {
    this.speed.y += this.gravity;


    
    if(this.position.y < height - 200) {
    } else {
      this.speed.y = 0;
      this.position.y = height - 200;
      this.isJumping = false;
    }


    //Kolla med David!!!!!!!
    if(greenPlayer.position.y = groundLevel && this.isJumping === false){
      //Stop falling
      greenPlayer.position.y = groundLevel.position.y;
      jumpCounter = 0;
    } else {
      greenPlayer.position.y = greenPlayer.position.y + gravity * this.speed;
    }

    if(this.isJumping === true){
      if(greenPlayer.position.y <= maxJumpHeigth) {
        if(greenPlayer.position.y >= groundLevel){
          greenPlayer.posiiton.y = groundLevel;
        }
      }
    } // Possible gravity function

   
  }

  public bounce() {}

  public jump() {
    if (this.color === "yellow" && !this.isJumping && keyIsDown(UP_ARROW)) {
      this.speed.y = -15; // Ger en initial kraft uppåt
      this.isJumping = true;
      console.log("borde hoppa")
    } else if (this.color === "green" && !this.isJumping && keyIsDown(87)) { // 'W'
      this.speed.y = -15; // Ger en initial kraft uppåt
      this.isJumping = true;
    }

}

  public toggleIsChasing() {}

  public playerControls() {
    if (this.color === "yellow") {
      if (keyIsDown(LEFT_ARROW)) {
        this.speed.x = -10;
      } else if (keyIsDown(RIGHT_ARROW)) {
        this.speed.x = 10;
      } else if (keyIsDown(UP_ARROW)) {
        this.speed.y = -10;
      } else if (keyIsDown(DOWN_ARROW)){
        this.speed.y = 10;
      } else {
        this.speed.x = 0;
      }
    }
     else if (this.color === "green") {
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
    // this.jump();
    this.playerControls();
   
    this.applyGravity();
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
