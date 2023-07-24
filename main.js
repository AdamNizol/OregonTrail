let currentState;
let mainMenuBackground;
let decisionBackground;

// Add a variable to track the game mode
let gameMode = "Extended";  // Default mode is Extended

function preload() {
    mainMenuBackground = loadImage("assets/images/background_MainMenu.png");
    decisionBackground = loadImage("assets/images/background_decision.png");
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
