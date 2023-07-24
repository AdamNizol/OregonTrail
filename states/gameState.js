class GameState extends BaseState {
    constructor(gameData) {
        super(gameData);
        this.gameStarted = false;
    }

    update() {
        if (!this.gameStarted) {
            this.startGame();
        }
        // You can put state-specific logic here.
    }

    draw() {
        background(0); // set the background to black
        fill(255); // set the fill color to white
        textAlign(CENTER, CENTER);
        textSize(height / 20); // Adjust the text size based on the canvas height
        text("Game State", width / 2, height / 2);
    }

    handleInput() {
        // Handle input for the game state.
    }

    startGame() {
        this.gameStarted = true;
        // Other game start logic can go here
    }
}
