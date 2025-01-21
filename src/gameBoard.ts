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

    this.checkCollisions()
  }


  private checkCollisions(){
    for (const gameObject of this.gameObjects) {
      if (gameObject !instanceof Player) continue;

      gameObject.
    }
     //Urgent!!!!!!! Måste diskuteras med David
    if(greenPlayer.position.x >= platform.position.x - platform.width / 2 &&
      greenPLayer.position.x < = platform.positon.x + platform.width / 2 &&
      greenPLayer.position.y + platform.height >= platform.position.y - platform.height / 2 &&
      greenPlayer.position.y + platform.height <= platform.position.y + platform.height / 2 &&
      jump === false;
    ){
      greenPlayer.position.y = greenPlayer.position.y; // stop falling
      speed = 0;
      jumpCounter = 0; // prohibits to jump more than once in the air
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
