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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [3, 0, 0, 0, 0, 0, 6, 0, 0, 3],
        [2, 0, 0, 9, 4, 4, 4, 0, 0, 0],
        [4, 4, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 4, 8, 0, 1, 0, 0],
        [0, 4, 4, 0, 0, 0, 4, 4, 0, 0],
        [10, 10, 10, 10, 10, 10, 10, 10, 5, 10],
      ];

      const playerStart = random();
      console.log("Yellow player chasing:", playerStart > 0.5);
      console.log("Green player chasing:", playerStart <= 0.5);

      for (let y = 0; y < level1.length; y++) {
        for (let x = 0; x < level1[y].length; x++) {
          let value = level1[y][x];
          const basePosition = createVector(x * squareSizeX, y * squareSizeY);
          let offsetX = 0;
          let offsetY = 0;

          switch (value) {
            case 1: // Yellow Player
              offsetX = 0;
              offsetY = 0;
              break;
            case 2: // Green Player
              offsetX = 0;
              offsetY = 0;
              break;
            case 3: // Teleport
              offsetX = squareSizeX / 2 - 50; // center
              offsetY = 0; // top
              break;
            case 4: // Standard Platform
              offsetX = 0; // left
              offsetY = 0; // top
              break;
            case 5: // Trampoline
              offsetX = squareSizeX / 2 - 76 / 2; // Center in X + offset half object width
              offsetY = +15; // 15px down from top
              break;
            case 6: // Snowman
              offsetX = squareSizeX / 2; // center
              offsetY = squareSizeY / 2; // center
              break;
            case 8: // Icy Platform
              offsetX = 0; // Left
              offsetY = 0; // Top
              break;
            case 9: // Icicle Platform
              offsetX = 0; // Left
              offsetY = 0; // Top
              break;
            case 10: // Base Platform
              offsetX = 0; // Left
              offsetY = squareSizeY - 30 * 0.7; //bottom
              break;
          }

          const position = createVector(
            basePosition.x + offsetX,
            basePosition.y + offsetY
          );

          if (value === 1) {
            //position.add() istället för offset
            gameObjects.push(
              new Player("yellow", position, playerStart > 0.5, 0, 0)
            );
            console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 2) {
            gameObjects.push(
              new Player("green", position, playerStart <= 0.5, 0, 0)
            );
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
          } else if (value === 10) {
            gameObjects.push(new Platform("standard", position));
          }
        }
      }
    }
    return gameObjects;
  }

  public draw() {}

  public update() {}
}
