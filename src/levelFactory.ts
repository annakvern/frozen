// const player1: number = 1;
// const player2: number = 2;
// const transporter: number = 3;
// const platform: number = 4;
// const trampoline: number = 5;
// const snowman: number = 6;
// const timerPlayer1: number = 8;
// const timerPlayer2: number = 9;
// const frameX: number = 144;
// const frameY: number = 102.4;

class LevelFactory {
  size: p5.Vector;
  gameObjects = [];
  constructor(size: p5.Vector) {}

  private getGameObjects() {
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
      for (let x = 0; x < level1[y].length; y++) {
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
          //gameObjects.push(new Timer("yellow"));
        }
        if (value === 9) {
          //gameObjects.push(new Timer("green"));
        }
      }
    }
  }

  public draw() {
    this.getGameObjects();
  }

  public update() {}
}
