let backgroundImgL1: p5.Image;

class GameBoard implements Scene {
  public gameObjects: GameObject[];

  constructor(gameObjects: GameObject[]) {
    this.gameObjects = gameObjects;
  }
  draw(): void {
    for (const obj of this.gameObjects) {
      obj.draw();
    }
  }
  update(): void {
    for (const obj of this.gameObjects) {
      obj.update();
    }
    let nextPage = new ResultScene("Yellow");
    game.changeActiveScreen(nextPage);
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
