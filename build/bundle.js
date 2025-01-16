"use strict";
let podiumYellowImg;
let podiumGreenImg;
class ResultScene {
    constructor() {
        this.titlePosition = createVector(width * 0.5, height * 0.4);
        this.textPosition = createVector(width * 0.5, height * 0.55);
        this.cloudPosition = createVector(width * 0.26, height * 0.13);
        this.snowflakePositions =
            [
                { position: createVector(width * 0.73, height * 0.23), size: 200 },
                { position: createVector(width * 0.65, height * 0.10), size: 150 },
                { position: createVector(width * 0.83, height * 0.15), size: 150 },
                { position: createVector(width * 0.77, height * 0.55), size: 175 },
            ];
        this.podiumYellowPosition = createVector(width * 0.43, height * 0.83);
        this.podiumGreenPosition = createVector(width * 0.43, height * 0.81);
    }
    update() {
    }
    draw() {
        this.drawTitle();
        this.drawText();
        this.drawCloud();
        this.drawSnowflakes();
        this.drawPodium();
    }
    drawTitle() {
        push();
        const titleSize = width * 0.07;
        fill("yellow");
        textAlign(CENTER, CENTER);
        textSize(titleSize);
        textFont(kavoonFont);
        text("Yellow wins!", this.titlePosition.x, this.titlePosition.y);
        pop();
    }
    drawText() {
        const txtSize = width * 0.015;
        push();
        fill("white");
        textSize(txtSize);
        text("Press any key to play again", this.textPosition.x, this.textPosition.y);
        pop();
    }
    drawCloud() {
        image(cloudImg, this.cloudPosition.x, this.cloudPosition.y);
    }
    drawSnowflakes() {
        for (let snowflake of this.snowflakePositions) {
            image(snowflakeImg, snowflake.position.x, snowflake.position.y, snowflake.size, snowflake.size);
        }
    }
    drawPodium() {
        const podiumWidth = width * 0.15;
        const podiumHeight = height * 0.17;
        image(podiumYellowImg, this.podiumYellowPosition.x, this.podiumYellowPosition.y, podiumWidth, podiumHeight);
    }
}
let resultScene;
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
            let nextPage = new ResultScene();
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
    podiumYellowImg = loadImage("assets/images/podiumYellowWinner.svg");
    podiumGreenImg = loadImage("assets/images/podiumGreenWinner.svg");
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
class PlayerInstruction {
    draw() {
        background("red");
    }
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