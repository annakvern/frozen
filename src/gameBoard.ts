class GameBoard implements Scene {
  private gameObjects: GameObjects[];

  constructor() {}

  public draw() {}

  public update() {}

  private checkCollisions() {
    for (const gameObject of this.gameObjects) {
      if (gameObject instanceof Snowman) {
        // inte kolla kollision
        continue;
      }
    }
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
