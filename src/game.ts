/// <reference path="startScene.ts" />
//let game: Game;
let music: {
  mystery: p5.SoundFile;
};

class Game {
  private activeScene: Scene;

  constructor(initialScreen: Scene) {
    this.activeScene = initialScreen;
  }

  public changeActiveScreen(scene: Scene): void {
    this.activeScene = scene; // switch to new screen
  }

  public update() {
    this.activeScene.update();
  }

  public draw() {
    background(0); // clear the canvas from previous scene
    this.activeScene.draw();
  }
}
