const squareSizeX = 102;
const squareSizeY = 86;

const level1: number[][] = [
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
  [13, 10, 10, 10, 10, 10, 16, 10, 10, 13],
  [12, 10, 10, 23, 22, 22, 22, 10, 10, 10],
  [21, 21, 10, 10, 10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 21, 21, 10, 11, 10, 10],
  [10, 21, 21, 10, 10, 10, 21, 21, 10, 10],
  [20, 20, 20, 20, 20, 20, 20, 20, 15, 20],
];

const level2: number[][] = [
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
  [10, 10, 10, 10, 10, 10, 10, 10, 10, 13],
  [10, 10, 10, 10, 10, 10, 10, 27, 25, 27],
  [13, 10, 10, 26, 27, 25, 10, 10, 10, 10],
  [12, 10, 10, 10, 10, 10, 10, 10, 10, 27],
  [27, 27, 10, 10, 10, 27, 27, 10, 10, 10],
  [10, 10, 10, 27, 10, 10, 10, 11, 10, 10],
  [24, 24, 24, 24, 24, 24, 24, 24, 15, 24],
];

class LevelFactory {
  private game: Game;
  constructor(game: Game) {
    this.game = game;
    // this.getGameObjects(level, gameObjects);
  }
  public gameObjects: GameObject[] = [];
  
  createGameBoard(game: Game, level: number): GameBoard {
    this.levelHandler(level);
    
    // this.getGameObjects(gameObjects);
    
    return new GameBoard(this.gameObjects, this.game, level);
  }

  private levelHandler(level: number) {
    
    let board: number[][];
    if (level === 1) {
      board = level1;
      return this.getGameObjects(board, this.gameObjects);
      
    } else if (level === 2) {
      board = level2;
      return this.getGameObjects(board, this.gameObjects);
    } else {
      return;
    }
    
  }

  private getGameObjects(board: number[][],gameObjects: GameObject[]) {
    const playerStart = random();
    console.log("Yellow player chasing:", playerStart > 0.5);
    console.log("Green player chasing:", playerStart <= 0.5);

      for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
          let value = board[y][x];
          const basePosition = createVector(x * squareSizeX, y * squareSizeY);
          let offsetX = 0;
          let offsetY = 0;

    
          const position = createVector(
            basePosition.x + offsetX,
            basePosition.y + offsetY
          );

          if (value === 11) {
            //position.add() istället för offset
            gameObjects.push(
              new Player("yellow", position, playerStart > 0.5, 0, 0)
            );
            console.log(`Added object at ${position.x}, ${position.y}`);
           } else if (value === 12) {
             gameObjects.push(
              new Player("green", position, playerStart <= 0.5, 0, 0)
             );
             console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 21) {
            gameObjects.push(new Platform("standard", position));
            console.log(`Added object at ${position.x}, ${position.y}`);
          }  else if (value === 16) {
            gameObjects.push(new Snowman(position));
            console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 22) {
            gameObjects.push(new Platform("icy", position));
          } else if (value === 23) {
            gameObjects.push(new Platform("icicle", position));
          } else if (value === 20) {
            gameObjects.push(new Platform("standard", position.add(
              offsetX = 0,  // Left
              offsetY = squareSizeY - 30 * 0.7
            )));
            console.log(`Added object at ${position.x}, ${position.y}`);
          }  else if (value === 13) {
            gameObjects.push(new Teleport(position.add(
            offsetX = squareSizeX / 2 - 36
            )));
            console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 27) {
            gameObjects.push(new Platform("sand", position));
            console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 15) {
            gameObjects.push(new Trampoline(position.add(
              offsetX = squareSizeX / 2 - 76 / 2,  // Center in X + offset half object width
              offsetY = +15 // 15px down from top
            )));
            console.log(`Added object at ${position.x}, ${position.y}`);
          //  } else if (value === 17) {
          //   gameObjects.push(new Camel(position));
          //   console.log(`Added object at ${position.x}, ${position.y}`);
          } else if (value === 26) {
            gameObjects.push(new Platform("quicksand", position));
          } else if (value === 25) {
            gameObjects.push(new Platform("slime", position));
          } else if (value === 24) {
            gameObjects.push(new Platform("sand", position.add(
              offsetX = 0,  // Left
              offsetY = squareSizeY - 30 * 0.7
            )));
          }
        }
      
    
  }
  return gameObjects;
}


  public draw() {
  }

  public update() {}
}
