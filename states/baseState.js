class BaseState {
    constructor() {
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

    drawShadowedText(txt, x, y) {
        fill(0);
        text(txt, x + 2, y + 2);
        fill(255);
        text(txt, x, y);
    }

    windowResized() {
        // Window resize method which can be overridden by subclasses. Automatically called by p5.js when the window is resized.
    }
}
