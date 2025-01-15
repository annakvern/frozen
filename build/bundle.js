"use strict";
class Game {
    constructor(initialScreen) {
        this.activeScreen = initialScreen;
    }
    changeActiveScreen(scene) {
        this.activeScreen = scene;
    }
    updateCurrentScreen() {
        this.activeScreen.update();
        this.activeScreen.draw();
    }
    update() { }
    draw() {
        background("black");
        this.drawText();
    }
    drawText() {
        push();
        fill("white");
        textSize(width * 0.1);
        textStyle("bold");
        textAlign("center");
        text("Click & Drag", width * 0.5, height * 0.5);
        pop();
    }
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
let game;
let music;
function preload() {
    music = {
        mystery: loadSound("/assets/music/mystery.mp3"),
    };
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    music.mystery.setVolume(0.8);
    game = new Game();
}
function draw() {
    game.update();
    game.draw();
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
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