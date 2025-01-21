"use strict";
let playerInstruction1img;
let playerInstruction2img;
let playerKeysYellow;
let playerKeysGreen;
let soundOnimg;
class PlayerInstruction {
    constructor(game) {
        this.game = game;
        this.titlePosition = createVector(width / 2, 100);
        this.textPosition = createVector(width / 2, 300);
        this.player1Position = createVector(980, 400);
        this.player2Position = createVector(410, 400);
        this.playerKeysYellowPosition = createVector(970, 560);
        this.playerKeysGreenPosition = createVector(400, 560);
        this.playSoundPosition = createVector(1370, 955);
    }
    update() {
        if (keyIsDown(32) && !changedScene) {
            changedScene = true;
            const factory = new LevelFactory(this.game);
            const gameBoard = factory.createGameBoard(this.game, 1);
            this.game.changeActiveScreen(gameBoard);
        }
    }
    draw() {
        background(164, 210, 247);
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
        textSize(120);
        textAlign(CENTER, CENTER);
        text("READY?", this.titlePosition.x + 40, this.titlePosition.y);
        textFont(kavoonFont);
        pop();
    }
    drawText() {
        push();
        fill("white");
        let bounceText = sin(frameCount * 0.1) * 3;
        textSize(40);
        textAlign(CENTER, CENTER);
        text("You have 2 mins - Tag or DIE!", this.textPosition.x + 30, this.textPosition.y - 80);
        text("Press SPACE to get started", this.textPosition.x - -30, 820 + bounceText);
        textSize(40);
        text("Player 1", this.textPosition.x - 225, 350);
        text("Player 2", this.textPosition.x + 280, 350);
        textFont(kavoonFont);
        pop();
    }
    drawPlayer1() {
        push();
        image(playerInstruction1img, this.player1Position.x - 50, this.player1Position.y, 130, 130);
        pop();
    }
    drawPlayer2() {
        image(playerInstruction2img, this.player2Position.x + 20, this.player2Position.y, 130, 130);
    }
    drawPlayerKeysYellow() {
        image(playerKeysYellow, this.playerKeysYellowPosition.x - 50, this.playerKeysYellowPosition.y, 150, 100);
    }
    drawPlayerKeysGreen() {
        image(playerKeysGreen, this.playerKeysGreenPosition.x + 20, this.playerKeysGreenPosition.y, 150, 100);
    }
    playSound() {
        image(soundOnimg, this.playSoundPosition.x, this.playSoundPosition.y, 60, 60);
    }
}
let cloudImg;
let snowflakeImg;
let platformImg;
let player1Img;
let player2Img;
class StartScene {
    constructor(game) {
        this.game = game;
        this.titlePosition = createVector(720, 470);
        this.textPosition = createVector(720, 650);
        this.cloudPosition = createVector(250, 120);
        this.snowflakePositions = [];
        for (let i = 0; i < 50; i++) {
            this.snowflakePositions.push(createVector(random(width), random(height)));
        }
        this.snowflakeVelocity = [];
        for (let i = 0; i < 50; i++) {
            this.snowflakeVelocity.push(createVector(1, random(2)));
        }
        this.platformPosition = createVector(50, 850);
        this.player1Position = createVector(200, 785);
        this.player2Position = createVector(600, 785);
        this.bounceTime = 0;
    }
    update() {
        if (keyIsDown(32) && !changedScene) {
            changedScene = true;
            let nextPage = new PlayerInstruction(this.game);
            this.game.changeActiveScreen(nextPage);
        }
        this.bounceTime += 0.07;
        this.moveSnowflakes();
    }
    moveSnowflakes() {
        for (const index in this.snowflakePositions) {
            const pos = this.snowflakePositions[index];
            const vel = this.snowflakeVelocity[index];
            pos.y += vel.y;
            pos.x += vel.x;
            if (pos.y > height) {
                pos.y = -40;
                pos.x = random(width);
            }
        }
    }
    draw() {
        background(164, 210, 248);
        this.drawSnowflakes();
        this.drawTitle();
        this.drawText();
        this.drawCloud();
        this.drawPlatform();
        this.drawPlayer1();
        this.drawPlayer2();
    }
    drawTitle() {
        push();
        textSize(140);
        textAlign(CENTER, CENTER);
        textFont(kavoonFont);
        fill(58, 168, 167);
        text("Tag", this.titlePosition.x - textWidth(" or DIE!") / 2, this.titlePosition.y);
        fill("white");
        text("or ", this.titlePosition.x, this.titlePosition.y);
        fill(255, 213, 118);
        text(" DIE!", this.titlePosition.x + textWidth("Tag or ") / 2, this.titlePosition.y);
        pop();
    }
    drawText() {
        push();
        const bounceOffset = sin(this.bounceTime) * 5;
        fill("white");
        textSize(40);
        textAlign(CENTER, CENTER);
        text("Press space to continue", this.textPosition.x, this.textPosition.y + bounceOffset);
        pop();
    }
    drawCloud() {
        push();
        image(cloudImg, this.cloudPosition.x, this.cloudPosition.y, 550, 250);
        pop();
    }
    drawSnowflakes() {
        for (const pos of this.snowflakePositions) {
            image(snowflakeImg, pos.x, pos.y, 40, 40);
        }
    }
    drawPlatform() {
        push();
        image(platformImg, this.platformPosition.x, this.platformPosition.y, 800, 50);
        pop();
    }
    drawPlayer1() {
        push();
        image(player1Img, this.player1Position.x, this.player1Position.y);
        pop();
    }
    drawPlayer2() {
        push();
        image(player2Img, this.player2Position.x, this.player2Position.y);
        pop();
    }
}
let startScene;
let kavoonFont;
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
        background(0);
        this.activeScene.draw();
    }
}
let backgroundImgL1;
class GameBoard {
    constructor(gameObjects, game) {
        this.game = game;
        this.gameObjects = gameObjects;
        this.yellowTimer = new Timer("yellow", positionYellowTimerX, positionTimerY, 60);
        this.greenTimer = new Timer("green", positionGreenTimerX, positionTimerY, 60);
        this.lastUpdateTime = millis();
    }
    draw() {
        background(backgroundImgL1);
        this.yellowTimer.draw();
        this.greenTimer.draw();
        for (const obj of this.gameObjects) {
            obj.draw();
        }
    }
    update() {
        const currentTime = millis();
        const deltaTime = (currentTime - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = currentTime;
        this.yellowTimer.update(deltaTime);
        this.greenTimer.update(deltaTime);
        for (const obj of this.gameObjects) {
            obj.update();
        }
        if (keyIsDown(32) && !changedScene) {
            changedScene = true;
            let nextPage = new ResultScene(this.game, "Yellow");
            this.game.changeActiveScreen(nextPage);
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
const squareSizeX = 144 * 0.67;
const squareSizeY = 128 * 0.67;
class LevelFactory {
    constructor(game) {
        this.game = game;
    }
    createGameBoard(game, level) {
        const gameObjects = [];
        this.getGameObjects(level, gameObjects);
        return new GameBoard(gameObjects, this.game);
    }
    getGameObjects(level, gameObjects) {
        if (level === 1) {
            const level1 = [
                [8, 0, 0, 0, 0, 0, 0, 0, 0, 9],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [3, 0, 0, 0, 0, 9, 6, 0, 3, 0],
                [1, 0, 0, 4, 4, 4, 4, 0, 0, 0],
                [4, 4, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 4, 4, 0, 2, 0, 0],
                [0, 4, 4, 0, 0, 0, 4, 4, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 5, 0],
            ];
            for (let y = 0; y < level1.length; y++) {
                for (let x = 0; x < level1[y].length; x++) {
                    let value = level1[y][x];
                    const position = createVector(x * squareSizeX, y * squareSizeY);
                    if (value === 1) {
                        gameObjects.push(new Player("yellow", position, true, 0, 0));
                        console.log(`Added object at ${position.x}, ${position.y}`);
                    }
                    else if (value === 2) {
                        gameObjects.push(new Player("green", position, false, 0, 0));
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
                }
            }
        }
        return gameObjects;
    }
    draw() { }
    update() { }
}
let game;
let changedScene = false;
const canvasWidth = 1440 * 0.67;
const canvasHeight = 1024 * 0.67;
let canvas;
function setup() {
    canvas = createCanvas(canvasWidth, canvasHeight);
    centerCanvas();
    frameRate(60);
    let startScene = new StartScene(null);
    game = new Game(startScene);
    startScene = new StartScene(game);
    game.changeActiveScreen(startScene);
    textFont(kavoonFont);
}
function centerCanvas() {
    const x = (windowWidth - canvasWidth) / 2;
    const y = (windowHeight - canvasHeight) / 2;
    canvas.position(x, y);
}
function windowResized() {
    centerCanvas();
}
function draw() {
    game.update();
    game.draw();
}
function keyReleased() {
    changedScene = false;
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
    backgroundImgL1 = loadImage("assets/images/bgLevel1.png");
    platform = loadImage("assets/images/platform.svg");
    snowman = loadImage("assets/images/snowman.svg");
    trampoline = loadImage("assets/images/trampoline.svg");
    teleport = loadImage("assets/images/teleport.svg");
    playerYellow = loadImage("assets/images/yellowPlayerLeft.svg");
    playerGreen = loadImage("assets/images/greenPlayerRight.svg");
    playerKeysYellow = loadImage("assets/images/playerKeysYellow.svg");
    playerKeysGreen = loadImage("assets/images/playerKeysGreen.svg");
    playerInstruction1img = loadImage("assets/images/yellowPlayerLeft.svg");
    playerInstruction2img = loadImage("assets/images/greenPlayerRight.svg");
    soundOnimg = loadImage("assets/images/soundOn.svg");
    podiumYellowImg = loadImage("assets/images/podiumYellowWinner.svg");
    podiumGreenImg = loadImage("assets/images/podiumGreenWinner.svg");
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
    constructor(color, position, isChasing, speedX, SpeedY) {
        if (color === "yellow") {
            super(position, 70, 70, playerYellow, false);
        }
        else {
            super(position, 70, 70, playerGreen, false);
        }
        this.color = color;
        this.speed = createVector(speedX, SpeedY);
        this.isOnIce = false;
        this.isChasing = isChasing;
    }
    setPosition() { }
    applyGravity() { }
    bounce() { }
    jump() { }
    toggleIsChasing() { }
    playerControls() {
        if (this.color === "yellow") {
            if (keyIsDown(LEFT_ARROW)) {
                this.speed.x = -10;
            }
            else if (keyIsDown(RIGHT_ARROW)) {
                this.speed.x = 10;
            }
            else {
                this.speed.x = 0;
            }
        }
        else if (this.color === "green") {
            if (keyIsDown(65)) {
                this.speed.x = -10;
            }
            else if (keyIsDown(68)) {
                this.speed.x = 10;
            }
            else {
                this.speed.x = 0;
            }
        }
    }
    draw() {
        image(this.img, this.position.x, this.position.y, 70, 70);
    }
    update() {
        this.playerControls();
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    }
}
let podiumYellowImg;
let podiumGreenImg;
class ResultScene {
    constructor(game, winner) {
        this.game = game;
        this.winner = winner;
        this.titlePosition = createVector(720, 400);
        this.textPosition = createVector(720, 550);
        this.cloudPosition = createVector(270, 100);
        this.snowflakePositions = [
            { position: createVector(1100, 280), size: 200 },
            { position: createVector(1000, 120), size: 120 },
            { position: createVector(1200, 150), size: 150 },
            { position: createVector(1150, 500), size: 175 },
        ];
        this.podiumPosition = createVector(561, 819);
        this.quitButtonPosition = createVector(60, 980);
        this.textBounceY = this.textPosition.y;
        this.textBounceSpeed = 0.25;
        this.textBounceRange = 4;
    }
    update() {
        if (mouseIsPressed && this.checkQuitButtonClick()) {
            this.quitGame();
        }
        if (keyIsDown(32) && !changedScene) {
            changedScene = true;
            let nextPage = new StartScene(this.game);
            this.game.changeActiveScreen(nextPage);
        }
        this.textBounce();
    }
    draw() {
        background(164, 211, 247);
        this.drawTitle();
        this.drawText();
        this.drawCloud();
        this.drawSnowflakes();
        this.drawPodium();
        this.drawQuitButton();
    }
    drawTitle() {
        push();
        const titleColor = this.winner === "Yellow" ? "rgb(255, 213, 118)" : "rgb(58, 168, 167)";
        const titleText = this.winner === "Yellow" ? "Yellow wins!" : "Green wins!";
        drawingContext.shadowOffsetX = 2;
        drawingContext.shadowOffsetY = 2;
        drawingContext.shadowBlur = 5;
        drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";
        fill(titleColor);
        textSize(120);
        textFont(kavoonFont);
        text(titleText, this.titlePosition.x, this.titlePosition.y);
        pop();
    }
    drawText() {
        push();
        drawingContext.shadowOffsetX = 2;
        drawingContext.shadowOffsetY = 2;
        drawingContext.shadowBlur = 5;
        drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";
        fill("white");
        textSize(35);
        text("Press SPACE to play again", this.textPosition.x, this.textBounceY);
        pop();
    }
    textBounce() {
        this.textBounceY += this.textBounceSpeed;
        if (this.textBounceY > this.textPosition.y + this.textBounceRange ||
            this.textBounceY < this.textPosition.y - this.textBounceRange) {
            this.textBounceSpeed *= -1;
        }
    }
    drawCloud() {
        push();
        drawingContext.shadowOffsetX = 2;
        drawingContext.shadowOffsetY = 2;
        drawingContext.shadowBlur = 5;
        drawingContext.shadowColor = "rgba(0, 0, 0, 0.5)";
        image(cloudImg, this.cloudPosition.x, this.cloudPosition.y);
        pop();
    }
    drawSnowflakes() {
        for (let snowflake of this.snowflakePositions) {
            image(snowflakeImg, snowflake.position.x, snowflake.position.y, snowflake.size, snowflake.size);
        }
    }
    drawPodium() {
        if (this.winner === "Yellow") {
            image(podiumYellowImg, this.podiumPosition.x, this.podiumPosition.y, 300, 210);
        }
        else if (this.winner === "Green") {
            image(podiumGreenImg, this.podiumPosition.x, this.podiumPosition.y, 300, 210);
        }
    }
    drawQuitButton() {
        push();
        fill(66, 165, 246);
        textAlign(CENTER, CENTER);
        textSize(50);
        text("Quit", this.quitButtonPosition.x, this.quitButtonPosition.y);
        pop();
    }
    checkQuitButtonClick() {
        const buttonWidth = 120;
        const buttonHeight = 70;
        return (mouseX > this.quitButtonPosition.x - buttonWidth / 2 &&
            mouseX < this.quitButtonPosition.x + buttonWidth / 2 &&
            mouseY > this.quitButtonPosition.y - buttonHeight / 2 &&
            mouseY < this.quitButtonPosition.y + buttonHeight / 2);
    }
    quitGame() {
        game.changeActiveScreen(new StartScene(this.game));
    }
}
let resultScene;
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
const positionGreenTimerX = 1390;
const positionTimerY = 50;
const positionYellowTimerX = 50;
let timeLimit = 60;
class Timer {
    constructor(color, xPos, yPos, timeLimit) {
        this.color = color;
        this.xPos = xPos;
        this.yPos = yPos;
        this.timeRemaining = timeLimit;
    }
    update(deltaTime) {
        this.timeRemaining -= deltaTime;
        if (this.timeRemaining < 0) {
            this.timeRemaining = 0;
        }
    }
    draw() {
        if (this.color === "yellow") {
            fill(255, 213, 118);
        }
        else if (this.color === "green") {
            fill(58, 168, 167);
        }
        textSize(50);
        textAlign(CENTER, CENTER);
        if (this.timeRemaining > 0) {
            text(int(this.timeRemaining).toString(), this.xPos, this.yPos);
        }
        else {
            fill("red");
            text("GAME\nOVER", width / 2 - 50, height / 2);
        }
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