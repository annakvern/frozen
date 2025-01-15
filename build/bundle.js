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
        this.titlePosition = createVector(windowWidth * 0.5, windowHeight * 0.5);
        this.textPosition = createVector(windowWidth * 0.5, windowHeight * 0.5 + 150);
        this.cloudPosition = createVector(350, 120);
        this.snowflakePositions = [];
        for (let i = 0; i < 50; i++) {
            this.snowflakePositions.push(createVector(random(width), random(height)));
        }
        this.platformPosition = createVector(50, 700);
        this.player1Position = createVector(200, 650);
        this.player2Position = createVector(600, 650);
        this.bounceTime = 0;
    }
    update() {
        if (key) {
            let nextPage = new PlayerInstruction();
            game.changeActiveScreen(nextPage);
        }
    }
    draw() {
        this.drawSnowflakes();
        this.drawTitle();
        this.drawText();
        this.drawCloud();
        this.drawPlatform();
        this.drawPlayer1();
        this.drawPlayer2();
    }
    drawTitle() {
        fill("white");
        textSize(140);
        textAlign(CENTER, CENTER);
        text("Tag or DIE!", this.titlePosition.x, this.titlePosition.y);
        textFont(kavoonFont);
    }
    drawText() {
        const bounceOffset = sin(this.bounceTime) * 10;
        fill("white");
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Press any key to continue", this.textPosition.x, this.textPosition.y + bounceOffset);
        this.bounceTime += 0.07;
    }
    drawCloud() {
        image(cloudImg, this.cloudPosition.x, this.cloudPosition.y, 550, 250);
    }
    drawSnowflakes() {
        this.snowflakePositions = this.snowflakePositions.filter((pos) => {
            image(snowflakeImg, pos.x, pos.y, 40, 40);
            pos.y += 1;
            return pos.y <= height;
        });
        while (this.snowflakePositions.length < 50) {
            this.snowflakePositions.push(createVector(random(width), 0));
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
    cloudImg = loadImage("assets/images/cloudNew.svg");
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
    constructor() { }
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
class LevelFactory {
    constructor(size) {
        this.gameObjects = [];
    }
    getGameObjects() {
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
            for (let x = 0; x < level1[y].length; y++) {
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
                }
                if (value === 9) {
                }
            }
        }
    }
    draw() {
        this.getGameObjects();
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
class Trampoline extends GameObject {
    constructor(position) {
        super(83, 108, "/assets/images/trampoline.svg", true, position);
    }
    draw() { }
    update() { }
}
//# sourceMappingURL=bundle.js.map