let backgroundImgL1: p5.Image;
let backgroundImgL2: p5.Image;

class GameBoard implements Scene {
  private game: Game;
  public gameObjects: GameObject[];
  private switchPlayerTimer: number;
  private backgroundImage: p5.Image;

  constructor(gameObjects: GameObject[], game: Game, level: number) {
    this.switchPlayerTimer = 0;
    this.game = game;
    this.gameObjects = gameObjects;

    if (level === 1) {
      this.backgroundImage = backgroundImgL1;
    } else {
      this.backgroundImage = backgroundImgL2;
    }
  }

  draw(): void {
    background(this.backgroundImage);
    for (const obj of this.gameObjects) {
      obj.draw();
    }
  }
  public update(): void {
    for (const obj of this.gameObjects) {
      obj.update();
    }

    this.checkCollisions();
    this.switchPlayerTimer -= deltaTime;
    this.checkWinner();
  }

  private checkCollisions() {
    for (const o1 of this.gameObjects) {
      if (!(o1 instanceof Player)) continue;
      // hitting the wall logic
      this.stopPlayerByWall(o1);
      o1.isOnQuicksand = false;

      for (const o2 of this.gameObjects) {
        if (o1 === o2) continue;
        if (o2 instanceof Snowman) continue;
        // the snowman is just in the background - no action

        if (this.objectsOverlap(o1, o2)) {
          if (o2 instanceof Player) {
            // TAG - you're it!
            this.tagYoureIt(o1, o2);
            // bounce
            this.bouncePlayers(o1, o2);
          }
          if (this.objectsOverlap(o1, o2)) {
            if (o2 instanceof Platform && o2.images[0] === icyIciclePlatform) {
              // stick to, and drop after 0.5 sec
              this.stickToIcicleOrSlime(o1, o2);
            }

            if (o2 instanceof Platform && o2.images[0] === slimePlatform) {
              // stick to, and drop after 0.5 sec
              this.stickToIcicleOrSlime(o1, o2);
            }

            if (o2 instanceof Platform && o2.images[0] === quicksandPlatform) {
              this.quickSand(o1);
            }

            if (o2 instanceof Platform) {
              //Squish to platform
              this.squishToPlatform(o1);

              // move out of platform
              this.moveOutOfPlatform(o1, o2);
            }
            if (o2 instanceof Trampoline) {
              // bounce higher!
              this.trampolineJump(o1, o2);
            }

            if (o2 instanceof Teleport && o1.dropTimer < -100) {
              // Kör warp-animationen på den första teleporten
              (o2 as Teleport).warp();

              for (const other of this.gameObjects) {
                if (other instanceof Teleport && other !== o2) {
                  // Kör warp-animationen på den andra teleporten
                  (other as Teleport).warp();

                  // Flytta spelaren till den andra teleportens position
                  o1.position.y = other.position.y + 15;
                  o1.position.x = other.position.x + 15;
                  o1.speed.y = -10;
                  //Ta reda på vilken portal som spelaren kommer ut ur
                  if (o2.position.x < other.position.x) {
                    o1.speed.x = -10;
                  } else {
                    o1.speed.x = 10;
                  }
                  o1.dropTimer = 200;
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

  private stopPlayerByWall(o1: Player) {
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
  }

  private squishToPlatform(o1: Player) {
    if (o1.speed.y > 1) {
      if (o1.images[0] === yellowLeft || o1.images[0] === yellowRight) {
        o1.setAnimation(
          [
            yellowLeft,
            yellowHalfSquish,
            yellowSquish,
            yellowHalfSquish,
            yellowLeft,
          ],
          400
        );
      } else if (o1.images[0] === greenLeft || o1.images[0] === greenRight) {
        o1.setAnimation(
          [greenLeft, greenHalfSquish, greenSquish, greenHalfSquish, greenLeft],
          400
        );
      }
    }
  }

  private tagYoureIt(o1: Player, o2: Player) {
    if (this.switchPlayerTimer <= 0) {
      this.switchChaser(o1, o2);
      this.switchPlayerTimer = 200;
    }
  }

  private moveOutOfPlatform(o1: Player, o2: Platform) {
    // Push above platform
    if (o1.speed.y > 0 && o1.dropTimer < -100) {
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

  private stickToIcicleOrSlime(o1: Player, o2: Platform) {
    if (o1.speed.y < 0 && o1.dropTimer < -100) {
      o1.position.y = o2.position.y + 80 * 0.7;
      o1.dropTimer = 500;
    }
  }

  private quickSand(o1: Player) {
    o1.isOnQuicksand = true;
    if (o1.speed.x < 1) {
      o1.speed.x = 0.2;
    } else if (o1.speed.x > 1) {
      o1.speed.x = 0.2;
    }
  }

  private trampolineJump(o1: Player, o2: Trampoline) {
    if (o1.position.y + o1.height >= o2.position.y + 5) {
      if (o1.speed.y > 0) {
        // Kontrollera att spelaren inte redan är i luften
        o1.position.y = o2.position.y - 70; // Placera ovanpå trampolinen
        o1.speed.y = -20; // Studseffekt
        o1.isJumping = true; // Markera att spelaren är i luften
      }
    }
  }

  private switchChaser(o1: Player, o2: Player) {
    o1.toggleIsChasing();
    o2.toggleIsChasing();
  }

  private checkWinner() {
    for (const o1 of this.gameObjects) {
      if (o1 instanceof Player) {
        if (o1.timer.timeRemaining <= 0) {
          let winnerColor;
          if (o1.color === "green") {
            winnerColor = "Yellow";
          } else {
            winnerColor = "Green";
          }

          let nextPage = new ResultScene(this.game, winnerColor);
          this.game.changeActiveScreen(nextPage);
        }
      }
    }
  }
}
