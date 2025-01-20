let backgroundImgL1: p5.Image;

class GameBoard implements Scene {
  public gameObjects: GameObject[];
  private changedScene: boolean = false;

  constructor(gameObjects: GameObject[]) {
    this.gameObjects = gameObjects;
    // this.changedScene = false;
  }
  draw(): void {
    //background(backgroundImgL1);
    for (const obj of this.gameObjects) {
      obj.draw();
    }
  }
  update(): void {
    for (const obj of this.gameObjects) {
      obj.update();
    }
    if (keyIsDown(32) && !this.changedScene) {
      this.changedScene = true; // that we changed the screen
      let nextPage = new ResultScene("Yellow");
      game.changeActiveScreen(nextPage);
    }
    if (!keyIsPressed) {
      this.changedScene = false; // reset state when the space key is released
    }
  }

  private checkCollisions() {}

  private bouncePlayers() {}

  private squishToGround() {}

  private freezeToIcicle() {}

  private teleportPlayer() {}

  private applyNoFriction() {}

  private switchChaser() {}

  private checkWinner() {}

  private checkTimer() {}
}
