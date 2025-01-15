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
            let nextPage = new PlayerInstruction();
            game.changeActiveScreen(nextPage);
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
}
function draw() {
    background(135, 206, 250);
    game.update();
    game.draw();
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
    constructor(width, height, img, isSolid, position) {
        this.width = width;
        this.height = height;
        this.img = img;
        this.isSolid = isSolid;
        this.position = position;
    }
    draw() {
        const asset = loadImage(this.img);
        image(asset, this.position.x, this.position.y, this.width, this.height);
    }
    update() { }
}
let gameObjects = [];
let level;
let squareSize = p5.Vector;
class LevelFactory {
    constructor(level) {
        this.getGameObjects(level);
    }
    getGameObjects(level) {
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
            for (let y = 0; y <= level1.length; y++) {
                for (let x = 0; x < level1[y].length; x++) {
                    let value = level1[y][x];
                    if (value === 1) {
                    }
                    if (value === 2) {
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
    draw() {
        this.getGameObjects(1);
    }
    update() { }
}
class Platform extends GameObject {
    constructor(position) {
        super(146, 30, "/assets/images/platform.svg", true, position);
    }
    draw() { }
    update() { }
}
class Snowman extends GameObject {
    constructor(position) {
        super(60, 100, "/assets/images/snowman.svg", false, position);
    }
    draw() { }
    update() { }
}
class Teleport extends GameObject {
    constructor(position) {
        super(100, 100, "/assets/images/teleport.svg", false, position);
    }
    draw() { }
    update() { }
}
class Timer extends GameObject {
    constructor(color) {
        const img = color;
        super(50, 50, img, false, createVector(0, 0));
        this.color = color;
        if (color === "yellow") {
            this.drawText("yellow");
        }
        else {
            this.drawText("green");
        }
    }
    drawText(color) {
        fill(color);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("60", 0, 0);
    }
}
class Trampoline extends GameObject {
    constructor(position) {
        super(83, 108, "/assets/images/trampoline.svg", true, position);
    }
    draw() { }
    update() { }
}
//# sourceMappingURL=bundle.js.map