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

      if (o1.position.x < 0) {
        o1.position.x = 0; // stopp till vänster
        o1.speed.x = 0; // Spelarens fart går till när den möter väggen
      } else if (o1.position.x + o1.width > width) {
        o1.position.x = width - o1.width; // Stoppa till höger kant
        o1.speed.x = 0; //Spelarens fart går till 0 när den möter väggen
      }

      for (const o2 of this.gameObjects) {
        if (o1 === o2) continue;
        if (o2 instanceof Snowman) continue;

        if (this.objectsOverlap(o1, o2)) {
          if (o2 instanceof Player) {
            // bounce
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

  private bouncePlayers() {}

  private squishToGround() {}

  private freezeToIcicle() {}

  private teleportPlayer() {}

  private applyNoFriction() {}

  private switchChaser() {}

  private checkWinner() {}

  private checkTimer() {}
}

// Al < Br
// Ar > Bl

//För att ta reda på positionX (Höger) position.x + width av objektet (plattform)

// Samma sak för Y-axeln. Position.y + height (då får vi andra hörnet av objektet)
