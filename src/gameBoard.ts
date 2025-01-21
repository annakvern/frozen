let backgroundImgL1: p5.Image;

class GameBoard implements Scene {
  private game: Game;
  public gameObjects: GameObject[];

  constructor(gameObjects: GameObject[], game: Game) {
    this.game = game;
    this.gameObjects = gameObjects;
  }
  draw(): void {
    background(backgroundImgL1);
    for (const obj of this.gameObjects) {
      obj.draw();
    }
  }
  update(): void {
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
    for (const o1 of this.gameObjects) {
      if (!(o1 instanceof Player)) continue;

      for (const o2 of this.gameObjects) {
        if (o1 === o2) continue;
        if (o2 instanceof Snowman) continue;

        if (this.objectsOverlap(o1, o2)) {
          if (o2 instanceof Player) {
            // bounce
          }
          if (o2 instanceof Platform) {
            // move out of it
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
