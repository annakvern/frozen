class GameBoard implements Screen {
  gameObjects: GameObjects[];

  constructor() {}

  public draw(): void {
    background("tomato");
  }
  
  public update(): void {
    if (keyIsPressed) {
      let nextPage = new GameBoard();
      game.changeActiveScreen(nextPage);
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
