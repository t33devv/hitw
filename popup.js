import { StorageHandler } from "./StorageHandler.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var wall = document.getElementById("wall");
var hole = document.getElementById("hole");
var ball = document.getElementById("ball");

var storage;

var score = 0;
var highScore;

var velY = 0;

function init() {
    storage = new StorageHandler;
    highScore = storage._hscore || 0;
    tick();
}

function tick() {
    moveUp();
    moveDown();
    checkDead();
    clearScreen();
    drawText();
    if (score > highScore) {
        highScore = score;
        storage._hscore = highScore;
    }
    setTimeout(tick, 16);
}

hole.addEventListener('animationiteration', () => {
    var rand = -((Math.random()*300)+100);
    hole.style.top = rand + "px";
    score++;
});

function drawText() {
    ctx.fillStyle = "#000";
    ctx.font = "70px Consolas";
    ctx.fillText(score, 125, 75);
    ctx.fillStyle= "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("High Score: " + highScore, 75, 115);
}

function clearScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function moveUp() {
    var top = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    if (velY != -1 || top < -480) return;
    ball.style.top = top - 9.5 + "px";
}

function moveDown() {
    var top = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    if (velY != 1 || top > -140) return;
    ball.style.top = top + 9.5 + "px";
}

document.addEventListener("keydown", event => {
    if (event.key == "ArrowUp") {
        if (velY = -1) return;
        velY = 1;
    }
    if (event.key == "ArrowDown") {
        if (velY = 1) return;
        velY = -1;
    }
});
document.addEventListener("keyup", event => {
    velY = 0;
});

function checkDead() {
    var wallLeft = parseInt(window.getComputedStyle(wall).getPropertyValue("left"));
    var ballBottom = parseInt(window.getComputedStyle(ball).getPropertyValue("bottom"));
    var holeBottom = parseInt(window.getComputedStyle(hole).getPropertyValue("bottom"));

    if ((wallLeft <= 58) && ((ballBottom > holeBottom + 70) || (ballBottom - 30 < holeBottom))) {
        alert("Game Over! Score: " + score + ". High Score: " + highScore);
        wall.style.animation = "none";
        hole.style.animation = "none";
        window.location = "./popup.html";
        ball.left = 30;
        ball.top = -170;
        score = 0;
    }
}

init();