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
        [8, 0, 0, 0, 0, 0, 0, 0, 0, 9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [3, 0, 0, 0, 0, 9, 6, 0, 3, 0],
        [1, 0, 0, 4, 4, 4, 4, 0, 0, 0],
        [4, 4, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 4, 4, 0, 2, 0, 0],
        [0, 4, 4, 0, 0, 0, 4, 4, 0, 0],
        [4, 4, 4, 4, 4, 4, 4, 4, 5, 4],
      ];
      for (let y = 0; y < level1.length; y++) {
        for (let x = 0; x < level1[y].length; x++) {
          let value = level1[y][x];
          const position = createVector(x * squareSizeX, y * squareSizeY);

          const playerStart = random();
          console.log("Yellow player chasing:", playerStart > 0.5);
          console.log("Green player chasing:", playerStart <= 0.5);

          if (value === 1) {
            let yellowPlayer = new Player("yellow", position, playerStart > .5, 0, 0);
            gameObjects.push(yellowPlayer);
            console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 2) {
            let greenPlayer = new Player("green", position, !(playerStart <= .5), 0, 0);
            gameObjects.push(greenPlayer);
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
