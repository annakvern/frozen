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
class gameObject {
    constructor() {
        this.width = width;
        this.height = height;
        this.img = this.img;
        this.isSolid = true;
        this.position = position;
    }
}
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
const gameObjects = [];
for (let y = 0; y <= level1.length; y++) {
    for (let x = 0; x < level1[y].length; y++) {
        let value = level1[y][x];
        if (value === 1) {
            gameObjects.push(new Player("yellow", x, y));
        }
        if (value === 2) {
            gameObjects.push(new Player("green", x, y));
        }
        if (value === 3) {
            gameObjects.push(new Transporter());
        }
        if (value === 4) {
            gameObjects.push(new Platform());
        }
        if (value === 5) {
            gameObjects.push(new Trampoline());
        }
        if (value === 6) {
            gameObjects.push(new Snowman());
        }
        if (value === 8) {
            gameObjects.push(new Timer("yellow"));
        }
        if (value === 9) {
            gameObjects.push(new Timer("green"));
        }
    }
}
class playerInstruction {
    constructor() {
    }
}
let game;
let music;
let backgroundImg, teleport, teleportLarge, snowflake, cloud, trampoline;
let platform, icyPlatform, iciclePlatform;
let greenHalfSquish, greenSquish, yellowHalfSquish, yellowSquish;
let yellowLeft, yellowRight, greenLeft, greenRight;
let greenHalfBounce, greenBounce, yellowHalfBounce, yellowBounce;
let soundOn, soundOff;
let yellowKeys, greenKeys;
function preload() {
    music = {
        mystery: loadSound("/assets/music/mystery.mp3"),
    };
    backgroundImg = loadImage("/assets/images/bgLevel1.png");
    cloud = loadImage("/assets/images/cloud.svg");
    snowflake = loadImage("/assets/images/snowflake.svg");
    platform = loadImage("/assets/images/platform.svg");
    icyPlatform = loadImage("/assets/images/icyPlatform.svg");
    iciclePlatform = loadImage("/assets/images/iciclePlatform.svg");
    teleport = loadImage("assets/images/teleport.svg");
    teleportLarge = loadImage("assets/images/teleportLarge.svg");
    trampoline = loadImage("/assets/images/trampoline.svg");
    soundOn = loadImage("/assets/images/soundOn.svg");
    soundOff = loadImage("/assets/images/sounOff.svg");
    greenKeys = loadImage("/assets/images/playerKeysGreen.svg");
    yellowKeys = loadImage("/assets/images/playerKeysYellow.svg");
    greenHalfSquish = loadImage("/assets/images/greenPlayerHalfSquish.svg");
    greenSquish = loadImage("/assets/images/greenPlayerSquish.svg");
    yellowHalfSquish = loadImage("/assets/images/yellowPlayerHalfSquish.svg");
    yellowSquish = loadImage("/assets/images/yellowPlayerSquish.svg");
    greenHalfBounce = loadImage("/assets/images/greenPlayerHalfBounce.svg");
    greenBounce = loadImage("/assets/images/greenPlayerBounce.svg");
    yellowHalfBounce = loadImage("/assets/images/yellowPlayerHalfBounce.svg");
    yellowBounce = loadImage("/assets/images/yellowPlayerBounce.svg");
    yellowRight = loadImage("/assets/images/yellowPlayerRight.svg");
    yellowLeft = loadImage("/assets/images/yellowPlayerLeft.svg");
    greenRight = loadImage("/assets/images/greenPlayerRight.svg");
    greenLeft = loadImage("/assets/images/greenPlayerLeft.svg");
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
//# sourceMappingURL=bundle.js.map