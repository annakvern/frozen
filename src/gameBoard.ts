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
