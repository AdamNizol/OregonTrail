class ReadingState extends BaseState {
    constructor(gameData, pages, returnState) {
        super(gameData);
        this.pages = pages.map(page => page.split('\n')); // Split each page into lines
        this.currentPage = 0;
        this.returnState = returnState;
        this.background = loadImage('assets/images/background_decision.png');
    }

    draw() {
        image(this.background, 0, 0, width, height);
        textSize(height / 26);
        let y = Math.floor(height / 5);
        let spacing = height / 18;
        for (let line of this.pages[this.currentPage]) {
            this.drawShadowedText(line, width / 12, y);
            y += spacing;
        }
        this.drawShadowedText("Press space to continue...", width / 12, height * 5 / 6);
    }

    keyPressed() {
        if (keyCode === 32 || keyCode === 13) { // Space key or enter key
            this.currentPage++;
            if (this.currentPage >= this.pages.length) {
                currentState = this.returnState;
            }
        }
    }

    windowResized() {
        this.canvasResizing();
    }
}
