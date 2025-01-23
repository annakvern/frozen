let backgroundImgL1: p5.Image;

class GameBoard implements Scene {
  private game: Game;
  public gameObjects: GameObject[];
  private yellowTimer: Timer;
  private greenTimer: Timer;
  private lastUpdateTime: number;
  private groundLevel: number;

  constructor(gameObjects: GameObject[], game: Game) {
    this.game = game;
    this.gameObjects = gameObjects;
    // initialising the timer objects
    this.yellowTimer = new Timer(
      "yellow",
      positionYellowTimerX,
      positionTimerY,
      60
    );
    this.greenTimer = new Timer(
      "green",
      positionGreenTimerX,
      positionTimerY,
      60
    );

    // recording the starting time
    this.lastUpdateTime = millis();

    this.groundLevel = 950;
  }
  draw(): void {
    background(backgroundImgL1);
    this.yellowTimer.draw();
    this.greenTimer.draw();
    for (const obj of this.gameObjects) {
      obj.draw();
    }
  }
  update(): void {
    // timer logic...calculates the time difference since the last update
    const currentTime = millis();
    const deltaTime = (currentTime - this.lastUpdateTime) / 1000; // converts to seconds
    this.lastUpdateTime = currentTime;

    // updating the timers
    this.yellowTimer.update(deltaTime);
    this.greenTimer.update(deltaTime);

    for (const obj of this.gameObjects) {
      obj.update();
    }
    if (keyIsDown(32) && !changedScene) {
      changedScene = true; // that we changed the screen
      let nextPage = new ResultScene(this.game, "Yellow");
      this.game.changeActiveScreen(nextPage);
    }

    this.checkCollisions();
  }

  private checkCollisions() {
    const canvasWidth = 1440 * 0.7; // canvas bredd
    // const canvasHeight = 1024; // behöver vi ha stopp för höjden?

    for (const o1 of this.gameObjects) {
      if (!(o1 instanceof Player)) continue;
      // hitting the wall logic
      if (o1.position.x < 0) {
        o1.position.x = 0; // stopp till vänster
        o1.speed.x = 0; // Spelarens fart går till när den möter väggen
      } else if (o1.position.x + o1.width > width) {
        o1.position.x = width - o1.width; // Stoppa till höger kant
        o1.speed.x = 0; //Spelarens fart går till 0 när den möter väggen
      } else if (o1.position.y < 0) {
        o1.position.y = 0; //Förhindrar spealren att hoppa igenom taket
        o1.speed.y = 0; // Återställer farten i y-led
      }

      for (const o2 of this.gameObjects) {
        if (o1 === o2) continue;
        if (o2 instanceof Snowman) continue;

        if (this.objectsOverlap(o1, o2)) {
          if (o2 instanceof Player) {
            // bounce
            this.bouncePlayers(o1, o2);
            // this.bouncePlayers(o2, o1);
          }
          if (this.objectsOverlap(o1, o2)) {
            if (o2 instanceof Platform) {
              // Push above platform
              if (o1.speed.y > 0) {
                o1.position.y = o2.position.y - 70 * 0.7;
                o1.speed.y = 0;
                o1.isJumping = false;
              }
              //move under platform
              if (o1.speed.y < 0) {
                o1.position.y = o2.position.y + 70 * 0.7;
                o1.speed.y = 0;
                o1.isJumping = true;
              }
            }
            if (o2 instanceof Trampoline) {
              if (o1.position.y + o1.height >= o2.position.y + 5) {
                if (o1.speed.y > 0) {
                  // Kontrollera att spelaren inte redan är i luften
                  o1.position.y = o2.position.y - 70; // Placera ovanpå trampolinen
                  o1.speed.y = -20; // Studseffekt
                  o1.isJumping = true; // Markera att spelaren är i luften
                  console.log("studsa");
                }
              }
            }
          }
        }
      }
    }
  }

  private objectsOverlap(o1: GameObject, o2: GameObject) {
    return (
      o1.position.x < o2.position.x + o2.width &&
      o1.position.x + o1.width > o2.position.x &&
      o1.position.y < o2.position.y + o2.height &&
      o1.position.y + o1.height > o2.position.y
    );
  }

  private bouncePlayers(o1: Player, o2: Player) {
    let dx = o2.position.x - o1.position.x;
    let dy = o2.position.y - o1.position.y;
    let distance = sqrt(dx * dx + dy * dy);
    let minDist = o1.width / 2 + o2.width / 2;
    console.log("Distance: " + distance);
    console.log("Min distance: " + minDist);
    let spring = 0.7;
    if (distance < minDist) {
      console.log(distance + "distance is less than minDistance" + minDist);
      let angle = atan2(dy, dx);
      let targetX = o1.position.x + cos(angle) * minDist;
      let targetY = o1.position.y + sin(angle) * minDist;
      console.log("TargetX " + targetX);
      console.log("o2 position x " + o2.position.x);
      let ax = (targetX - o2.position.x) * spring;
      console.log("ax " + ax);
      let ay = (targetY - o2.position.y) * spring;
      o1.speed.x -= ax;
      o1.speed.y -= ay;
      o2.speed.x += ax;
      o2.speed.y += ay;
    }

    // let dx = this.others[i].x - this.x;
    //   let dy = this.others[i].y - this.y;
    //   let distance = sqrt(dx * dx + dy * dy);
    //   let minDist = this.others[i].diameter / 2 + this.diameter / 2;
    //     console.log(distance);
    //   console.log(minDist);
    //   if (distance < minDist) {
    //     console.log("2");
    //     let angle = atan2(dy, dx);
    //     let targetX = this.x + cos(angle) * minDist;
    //     let targetY = this.y + sin(angle) * minDist;
    //     let ax = (targetX - this.others[i].x) * spring;
    //     let ay = (targetY - this.others[i].y) * spring;
    //     this.vx -= ax;
    //     this.vy -= ay;
    //     this.others[i].vx += ax;
    //     this.others[i].vy += ay;
    //   }
  }

  private squishToGround() {}

  private freezeToIcicle() {}

  private teleportPlayer() {}

  private applyNoFriction() {}

  private switchChaser() {}

  private checkWinner() {}

  private checkTimer() {}
}
