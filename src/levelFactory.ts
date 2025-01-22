let level: number;
const squareSizeX = 144;
const squareSizeY = 128;

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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [3, 0, 0, 0, 0, 0, 6, 0, 3, 0],
        [1, 0, 0, 9, 4, 4, 4, 0, 0, 0],
        [4, 4, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 4, 8, 0, 2, 0, 0],
        [0, 4, 4, 0, 0, 0, 4, 4, 0, 0],
        [4, 4, 4, 4, 4, 4, 4, 4, 5, 4],
      ];
      for (let y = 0; y < level1.length; y++) {
        for (let x = 0; x < level1[y].length; x++) {
          let value = level1[y][x];
          const position = createVector(x * squareSizeX, y * squareSizeY);

          if (value === 1) {
            let yellowPlayer = new Player("yellow", position, true, 0, 0);
            gameObjects.push(yellowPlayer);
            console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 2) {
            let greenPlayer = new Player("green", position, false, 0, 0);
            gameObjects.push(greenPlayer);
            console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 3) {
            gameObjects.push(new Teleport(position));
            console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 4) {
            gameObjects.push(new Platform("standard", position));
            console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 5) {
            gameObjects.push(new Trampoline(position));
            console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 6) {
            gameObjects.push(new Snowman(position));
            console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 8) {
            gameObjects.push(new Platform("icy", position));
          } else if (value === 9) {
            gameObjects.push(new Platform("icicle", position));
          }
        }
      }
    }
    return gameObjects;
  }

  public draw() {}

  public update() {}
}
