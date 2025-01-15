let gameObjects: GameObject[] = [];
let level: number;
let squareSize = p5.Vector;

class LevelFactory {
  constructor(level: number) {
    this.getGameObjects(level);
  }

  private getGameObjects(level: number) {
    if (level === 1) {
      const level1: number[][] = [
        [8, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [3, 0, 0, 0, 0, 9, 6, 0, 3, 0],
        [1, 0, 0, 4, 4, 4, 4, 0, 0, 0],
        [4, 4, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 4, 4, 0, 0, 0, 0],
        [0, 4, 4, 0, 0, 0, 4, 4, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 5, 0],
      ];
      for (let y = 0; y <= level1.length; y++) {
        for (let x = 0; x < level1[y].length; x++) {
          let value = level1[y][x];
          if (value === 1) {
            //gameObjects.push(new Player("yellow", x, y));
          }
          if (value === 2) {
            //gameObjects.push(new Player("green", x, y));
          }
          if (value === 3) {
            gameObjects.push(new Teleport(createVector(0, 0)));
          }
          if (value === 4) {
            gameObjects.push(new Platform(createVector(0, 0)));
          }
          if (value === 5) {
            gameObjects.push(new Trampoline(createVector(0, 0)));
          }
          if (value === 6) {
            gameObjects.push(new Snowman(createVector(0, 0)));
          }
          if (value === 8) {
            gameObjects.push(new Timer("yellow"));
          }
          if (value === 9) {
            gameObjects.push(new Timer("green"));
          }
        }
      }
    }
  }

  public draw() {
    this.getGameObjects(1);
  }

  public update() {}
}
