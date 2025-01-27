/// <reference path="startScene.ts" />
//let game: Game;
let music: {
  chase: p5.SoundFile;
};

class Game {
  private activeScene: Scene;

  constructor() {
    this.activeScene = new StartScene(this);
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
