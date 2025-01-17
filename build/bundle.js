"use strict";
let playerInstruction1img;
let playerInstruction2img;
let playerKeysYellow;
let playerKeysGreen;
let soundOnimg;
class PlayerInstruction {
    constructor() {
        this.titlePosition = createVector(width / 2, 100);
        this.textPosition = createVector(width / 2, 200);
        this.player1Position = createVector(980, 300);
        this.player2Position = createVector(410, 300);
        this.playerKeysYellowPosition = createVector(970, 460);
        this.playerKeysGreenPosition = createVector(400, 460);
        this.playSoundPosition = createVector(windowWidth * 0.93, windowHeight * 0.86);
    }
    update() {
        if (key === " ") {
            let nextPage = new GameBoard();
            game.changeActiveScreen(nextPage);
        }
    }
    draw() {
        this.drawTitle();
        this.drawText();
        this.drawPlayer1();
        this.drawPlayer2();
        this.drawPlayerKeysYellow();
        this.drawPlayerKeysGreen();
        this.playSound();
    }
    drawTitle() {
        push();
        fill("white");
        textSize(100);
        textAlign(CENTER, CENTER);
        text("READY?", this.titlePosition.x, this.titlePosition.y);
        textFont(kavoonFont);
        pop();
    }
    drawText() {
        push();
        fill("white");
        let bounceText = sin(frameCount * 0.1) * 3;
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Press space to get started", this.textPosition.x, this.textPosition.y + bounceText);
        text("You have 2 mins - Tag or DIE!", this.textPosition.x - 0, 630);
        textSize(40);
        text("Player 1", this.textPosition.x - 300, 250);
        text("Player 2", this.textPosition.x + 280, 250);
        textFont(kavoonFont);
        pop();
    }
    drawPlayer1() {
        image(playerInstruction1img, this.player1Position.x, this.player1Position.y, 130, 130);
    }
    drawPlayer2() {
        image(playerInstruction2img, this.player2Position.x, this.player2Position.y, 130, 130);
    }
    drawPlayerKeysYellow() {
        image(playerKeysYellow, this.playerKeysYellowPosition.x, this.playerKeysYellowPosition.y, 150, 100);
    }
    drawPlayerKeysGreen() {
        image(playerKeysGreen, this.playerKeysGreenPosition.x, this.playerKeysGreenPosition.y, 150, 100);
    }
    playSound() {
        image(soundOnimg, this.playSoundPosition.x, this.playSoundPosition.y, 40, 40);
    }
}
let cloudImg;
let snowflakeImg;
let platformImg;
let player1Img;
let player2Img;
class StartScene {
    constructor() {
        this.titlePosition = createVector(800, 600);
        this.textPosition = createVector(400, 150);
        this.cloudPosition = createVector(200, 100);
        this.snowflakePositions = [];
        this.platformPosition = createVector(50, 600);
        this.player1Position = createVector(55, 550);
        this.player2Position = createVector(400, 550);
    }
    update() {
        if (key) {
            const factory = new LevelFactory();
            const gameBoard = factory.createGameBoard(1);
            game.changeActiveScreen(gameBoard);
        }
    }
    draw() {
        this.drawTitle();
        this.drawText();
        this.drawCloud();
        this.drawSnowflakes();
        this.drawPlatform();
        this.drawPlayer1();
        this.drawPlayer2();
    }
    drawTitle() {
        fill("white");
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Tag or DIE!", this.titlePosition.x, this.titlePosition.y);
        textFont(kavoonFont);
    }
    drawText() {
        fill("white");
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Press any key to continue", this.textPosition.x, this.textPosition.y);
    }
    drawCloud() {
        image(cloudImg, this.cloudPosition.x, this.cloudPosition.y, 120, 80);
    }
    drawSnowflakes() {
        for (let pos of this.snowflakePositions) {
            image(snowflakeImg, pos.x, pos.y, 20, 20);
            pos.y += 1;
            if (pos.y > height)
                pos.y = 0;
        }
    }
    drawPlatform() {
        image(platformImg, this.platformPosition.x, this.platformPosition.y, 800, 50);
    }
    drawPlayer1() {
        image(player1Img, this.player1Position.x, this.player1Position.y);
    }
    drawPlayer2() {
        image(player2Img, this.player2Position.x, this.player2Position.y);
    }
}
let startScene;
let kavoonFont;
let game;
let music;
class Game {
    constructor(initialScreen) {
        this.activeScene = initialScreen;
    }
    changeActiveScreen(scene) {
        this.activeScene = scene;
    }
    update() {
        this.activeScene.update();
    }
    draw() {
        this.activeScene.draw();
    }
}
function setup() {
    createCanvas(1440, 1024);
    frameRate(60);
    startScene = new StartScene();
    game = new Game(startScene);
    textFont(kavoonFont);
}
function preload() {
    music = {
        mystery: loadSound("/assets/music/mystery.mp3"),
    };
    cloudImg = loadImage("assets/images/cloud.svg");
    snowflakeImg = loadImage("assets/images/snowflake.svg");
    platformImg = loadImage("assets/images/platformStart.svg");
    kavoonFont = loadFont("assets/Font(s)/Kavoon-Regular.ttf");
    player1Img = loadImage("assets/images/greenPlayerRight.svg");
    player2Img = loadImage("assets/images/yellowPlayerLeft.svg");
    backgroundImgL1 = loadImage("assets/images/bgLevel1.png");
    platform = loadImage("assets/images/platform.svg");
    snowman = loadImage("assets/images/snowman.svg");
    trampoline = loadImage("assets/images/trampoline.svg");
    teleport = loadImage("assets/images/teleport.svg");
    playerYellow = loadImage("assets/images/yellowPlayerLeft.svg");
    playerGreen = loadImage("assets/images/greenPlayerRight.svg");
}
function draw() {
    background(backgroundImgL1);
    game.draw();
    game.update();
}
let backgroundImgL1;
class GameBoard {
    constructor(gameObjects) {
        this.gameObjects = gameObjects;
    }
    draw() {
        for (const obj of this.gameObjects) {
            obj.draw();
        }
    }
    update() {
        for (const obj of this.gameObjects) {
            obj.update();
        }
    }
    draw() {
        background("tomato");
    }
    update() {
        if (keyIsPressed) {
            let nextPage = new GameBoard();
            game.changeActiveScreen(nextPage);
        }
    }
    checkCollisions() { }
    bouncePlayers() { }
    squishToGround() { }
    freezeToIcicle() { }
    teleportPlayer() { }
    applyNoFriction() { }
    switchChaser() { }
    checkWinner() { }
    checkTimer() { }
}
class GameObject {
    constructor(position, width, height, img, isSolid) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.img = img;
        this.isSolid = isSolid;
    }
    draw() {
        if (this.img) {
            image(this.img, this.position.x, this.position.y, this.width, this.height);
        }
        else {
            fill("red");
            rect(this.position.x, this.position.y, this.width, this.height);
            console.error(`Missing image for object at ${this.position.x}, ${this.position.y}`);
        }
    }
    update() { }
}
let level;
const squareSizeX = 144;
const squareSizeY = 128;
class LevelFactory {
    constructor() {
    }
    createGameBoard(level) {
        const gameObjects = [];
        this.getGameObjects(level, gameObjects);
        return new GameBoard(gameObjects);
    }
    getGameObjects(level, gameObjects) {
        if (level === 1) {
            const level1 = [
                [8, 0, 0, 0, 0, 0, 0, 0, 0, 9],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [3, 0, 0, 0, 0, 9, 6, 0, 3, 0],
                [1, 0, 0, 4, 4, 4, 4, 0, 0, 0],
                [4, 4, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 4, 4, 0, 0, 0, 0],
                [0, 4, 4, 0, 0, 0, 4, 4, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 5, 0],
            ];
            for (let y = 0; y < level1.length; y++) {
                for (let x = 0; x < level1[y].length; x++) {
                    let value = level1[y][x];
                    const position = createVector(x * squareSizeX, y * squareSizeY);
                    if (value === 1) {
                        gameObjects.push(new Player("yellow", position, true));
                        console.log(`Added object at ${position.x}, ${position.y}`);
                    }
                    else if (value === 2) {
                        gameObjects.push(new Player("green", position, false));
                        console.log(`Added object at ${position.x}, ${position.y}`);
                    }
                    else if (value === 3) {
                        gameObjects.push(new Teleport(position));
                        console.log(`Added object at ${position.x}, ${position.y}`);
                    }
                    else if (value === 4) {
                        gameObjects.push(new Platform(position));
                        console.log(`Added object at ${position.x}, ${position.y}`);
                    }
                    else if (value === 5) {
                        gameObjects.push(new Trampoline(position));
                        console.log(`Added object at ${position.x}, ${position.y}`);
                    }
                    else if (value === 6) {
                        gameObjects.push(new Snowman(position));
                        console.log(`Added object at ${position.x}, ${position.y}`);
                    }
                    else if (value === 8) {
                    }
                    else if (value === 9) {
                    }
                }
            }
        }
        return gameObjects;
    }
    draw() { }
    update() { }
}
let platform;
class Platform extends GameObject {
    constructor(position) {
        super(position, 146, 30, platform, true);
    }
    draw() {
        image(this.img, this.position.x, this.position.y, 146, 30);
    }
    update() { }
}
let playerYellow;
let playerGreen;
class Player extends GameObject {
    constructor(color, position, isChasing) {
        if (color === "yellow") {
            super(position, 70, 70, playerYellow, false);
        }
        else {
            super(position, 70, 70, playerGreen, false);
        }
        this.color = color;
        this.speed = createVector(0, 0);
        this.isOnIce = false;
        this.isChasing = isChasing;
    }
    setPosition() { }
    applyGravity() { }
    bounce() { }
    jump() { }
    toggleIsChasing() { }
    playerControls() { }
    draw() {
        image(this.img, this.position.x, this.position.y, 70, 70);
    }
    update() { }
}
let snowman;
class Snowman extends GameObject {
    constructor(position) {
        super(position, 60, 100, snowman, false);
    }
    draw() {
        image(this.img, this.position.x, this.position.y, 99, 168);
    }
    update() { }
}
let teleport;
class Teleport extends GameObject {
    constructor(position) {
        super(position, 100, 100, teleport, false);
    }
    draw() {
        image(this.img, this.position.x, this.position.y, 100, 100);
    }
    update() { }
}
const positionGreenTimerX = 800;
const positionTimerY = 50;
const positionYellowTimerX = 25;
class Timer {
    constructor(color) {
        this.color = color;
        if (color === "yellow") {
            let xPos = positionYellowTimerX;
            let yPos = positionTimerY;
            this.drawText("yellow", xPos, yPos);
        }
        else {
            let xPos = positionGreenTimerX;
            let yPos = positionTimerY;
            this.drawText("green", xPos, yPos);
        }
    }
    drawText(color, xPos, yPos) {
        fill(color);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("60", xPos, yPos);
    }
}
let trampoline;
class Trampoline extends GameObject {
    constructor(position) {
        super(position, 83, 108, trampoline, true);
    }
    draw() {
        image(this.img, this.position.x, this.position.y, 108, 124);
    }
    update() { }
}
//# sourceMappingURL=bundle.js.map