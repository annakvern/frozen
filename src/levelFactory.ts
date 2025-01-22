let level: number;
const squareSizeX = 102;
const squareSizeY = 86;

class LevelFactory {
  private game: Game;
  constructor(game: Game) {
    this.game = game;
    // this.getGameObjects(level, gameObjects);
  }

  createGameBoard(game: Game, level: number): GameBoard {
    const gameObjects: GameObject[] = [];
    this.getGameObjects(level, gameObjects);
    return new GameBoard(gameObjects, this.game);
  }

  private getGameObjects(level: number, gameObjects: GameObject[]) {
    if (level === 1) {
      const level1: number[][] = [
        [8, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [3, 0, 0, 0, 0, 9, 6, 0, 3, 0],
        [1, 0, 0, 4, 4, 4, 4, 0, 0, 0],
        [4, 4, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 4, 4, 0, 2, 0, 0],
        [0, 4, 4, 0, 0, 0, 4, 4, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 5, 0],
      ];
      for (let y = 0; y < level1.length; y++) {
        for (let x = 0; x < level1[y].length; x++) {
          let value = level1[y][x];
          const position = createVector(x * squareSizeX, y * squareSizeY);

          if (value === 1) {
            gameObjects.push(new Player("yellow", position, true, 0, 0));
            console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 2) {
            gameObjects.push(new Player("green", position, false, 0, 0));
            console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 3) {
            gameObjects.push(new Teleport(position));
            console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 4) {
            gameObjects.push(new Platform(position));
            console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 5) {
            gameObjects.push(new Trampoline(position));
            console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 6) {
            gameObjects.push(new Snowman(position));
            console.log(`Added object at ${position.x}, ${position.y}`);
            // } else if (value === 8) {
            //   new Timer("yellow").draw;
            // } else if (value === 9) {
            //   new Timer("green").draw;
          }
        }
      }
    }
    return gameObjects;
  }

  public draw() {}

  public update() {}
}
