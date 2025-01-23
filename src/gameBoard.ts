let backgroundImgL1: p5.Image;

class GameBoard implements Scene {
  private game: Game;
  public gameObjects: GameObject[];
  private yellowTimer: Timer;
  private greenTimer: Timer;
  private lastUpdateTime: number;

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
      } else if (o1.position.x + o1.width > canvasWidth) {
        o1.position.x = canvasWidth - o1.width; // Stoppa till höger kant
        o1.speed.x = 0; //Spelarens fart går till 0 när den möter väggen
      }

      for (const o2 of this.gameObjects) {
        if (o1 === o2) continue;
        if (o2 instanceof Snowman) continue;

        if (this.objectsOverlap(o1, o2)) {
          if (o2 instanceof Player) {
            this.bouncePlayers(o1, o2);
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
    console.log("we're in bounce function!");
    let p1x = o1.position.x;
    let p1y = o1.position.y;
    let p2x = o2.position.x;
    let p2y = o2.position.y;

    let p1speedX = o1.speed.x;
    let p1speedY = o1.speed.y;
    let p2speedX = o2.speed.x;
    let p2speedY = o2.speed.y;
    const radius = o1.width / 2;

    if (dist(p1x, p1y, p2x, p2y) <= radius) {
      let x1: [number, number] = [p1x, p1y];
      let x2: [number, number] = [p2x, p2y];
      let v1: [number, number] = [p1speedX, p1speedY];
      let v2: [number, number] = [p2speedX, p2speedY];

      let num1 = dotProduct(vectorSub(v1, v2), vectorSub(x1, x2)); // Numerator 1
      let num2 = vectorSub(x1, x2); // Numerator 2
      let den1 = vectorMag(vectorSub(x1, x2)) ** 2; // Denominator 1

      let num3 = dotProduct(vectorSub(v2, v1), vectorSub(x2, x1)); // Numerator 3
      let num4 = vectorSub(x2, x1); // Numerator 4
      let den2 = vectorMag(vectorSub(x2, x1)) ** 2; // Denominator 2

      let newv1 = vectorSub(v1, vectorMult(num2, num1 / den1));
      let newv2 = vectorSub(v2, vectorMult(num4, num3 / den2));

      // Update the velocities
      p1speedX = newv1[0];
      p1speedY = newv1[1];
      p2speedX = newv2[0];
      p2speedY = newv2[1];

      // Update the positions
      p1x += p1speedX;
      p1y += p1speedY;
      p2x += p2speedX;
      p2y += p2speedY;
    }
  }

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
function dotProduct(a: [number, number], b: [number, number]): number {
  // Dot product of a*b (inner product/ scalar product)
  let product = 0;

  if (a.length !== b.length) {
    throw new Error("Vectors must be of the same length");
  } else {
    for (let i = 0; i < a.length; i++) {
      product += a[i] * b[i];
    }
    return product; // this is a scalar (just a number)
  }
}

function vectorMag(v: [number, number]): number {
  // Vector magnitude
  let mag = 0;
  for (let i of v) {
    mag += i ** 2;
  }
  return sqrt(mag); // this is also a scalar
}

function vectorSub(a: [number, number], b: [number, number]): [number, number] {
  // Subtracts vector b from vector a

  if (a.length !== b.length) {
    throw new Error("Vectors must be of the same length");
  } else {
    return [a[0] - b[0], a[1] - b[1]];
    // for (let i = 0; i < a.length; i++) {
    //   sub[i] = a[i] - b[i];
    // }
    // return sub; // this is a vector
  }
}

function vectorMult(v: [number, number], s: number): [number, number] {
  // Multiplies vector (v) by scalar (s)
  // let mult = [];
  // for (let i = 0; i < v.length; i++) {
  //   mult[i] = v[i] * s;
  // }
  return [v[0] * s, v[1] * s]; // This is also a vector
}
