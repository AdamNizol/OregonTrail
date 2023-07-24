let currentState;
let gameData;

function preload() {
    gameData = new GameData();
}

function setup() {
    let aspectRatio = 4 / 3;
    let canvasWidth;
    let canvasHeight;

    if (windowWidth / windowHeight > aspectRatio) {
        canvasHeight = windowHeight;
        canvasWidth = canvasHeight * aspectRatio;
    } else {
        canvasWidth = windowWidth;
        canvasHeight = canvasWidth / aspectRatio;
    }

    createCanvas(canvasWidth, canvasHeight);
    currentState = new MainMenuState();
    textFont("Consolas");
}

function draw() {
    currentState.update();
    currentState.draw();
}

function windowResized() {
    let aspectRatio = 4 / 3;
    let canvasWidth;
    let canvasHeight;

    if (windowWidth / windowHeight > aspectRatio) {
        canvasHeight = windowHeight;
        canvasWidth = canvasHeight * aspectRatio;
    } else {
        canvasWidth = windowWidth;
        canvasHeight = canvasWidth / aspectRatio;
    }

    resizeCanvas(canvasWidth, canvasHeight);
    currentState.windowResized();
}

function keyPressed() {
    if (currentState.keyPressed) {
        currentState.keyPressed();
    }
}

function keyTyped() {
    if (currentState.keyTyped) {
        currentState.keyTyped();
    }
}
