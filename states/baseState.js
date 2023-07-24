class BaseState {
    constructor(gameData) {
        this.gameData = gameData;
    }

    update() {
        // Update method to be overridden by subclasses.
    }

    draw() {
        // Draw method to be overridden by subclasses.
    }

    handleInput() {
        // Handle input method to be overridden by subclasses.
    }
}
