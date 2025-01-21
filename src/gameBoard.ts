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

  private randomChaser() {
    
    const isChasing = Math.random() < 0.5;  // 50% chans att vara den som jagar
    if (isChasing) {
      yellowPlayer.isChasing = true;

  } else {
    greenPlayer.isChasing = true;
  }
  }
}
