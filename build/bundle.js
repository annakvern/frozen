"use strict";
class PlayerInstruction {
    draw() {
        background("red");
    }
    update() { }
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
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    startScene = new StartScene();
    game = new Game(startScene);
    textFont(kavoonFont);
}
let assets = {};
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
    assets["platform"] = loadImage("assets/images/platform.svg");
    assets["snowman"] = loadImage("assets/images/snowman.svg");
    assets["trampoline"] = loadImage("assets/images/trampoline.svg");
    assets["teleport"] = loadImage("assets/images/teleport.svg");
}
function draw() {
    background(135, 206, 250);
    game.draw();
    game.update();
}
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
    constructor(width, height, imgKey, isSolid, position) {
        this.width = width;
        this.height = height;
        this.img = assets[imgKey];
        this.isSolid = isSolid;
        this.position = position;
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
                    }
                    else if (value === 2) {
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
class Platform extends GameObject {
    constructor(position) {
        super(146, 30, "platform", true, position);
    }
    draw() { }
    update() { }
}
class Snowman extends GameObject {
    constructor(position) {
        super(60, 100, "snowman", false, position);
    }
    draw() { }
    update() { }
}
class Teleport extends GameObject {
    constructor(position) {
        super(100, 100, "teleport", false, position);
    }
    draw() { }
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
class Trampoline extends GameObject {
    constructor(position) {
        super(83, 108, "trampoline", true, position);
    }
    draw() { }
    update() { }
}
//# sourceMappingURL=bundle.js.map