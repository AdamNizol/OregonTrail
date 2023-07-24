class ReadingState extends BaseState {
    constructor(pages, returnState) {
        super();
        this.pages = pages.map(page => page.split('\n')); // Split each page into lines
        this.currentPage = 0;
        this.returnState = returnState;
        this.background = loadImage('assets/images/background_decision.png');
    }

    draw() {
        image(this.background, 0, 0, width, height);
        textSize(height / 25);
        let y = Math.floor(height / 5);
        let spacing = height / 18;
        for (let line of this.pages[this.currentPage]) {
            this.drawShadowedText(line, width / 6, y);
            y += spacing;
        }
        this.drawShadowedText("Press space to continue...", width / 6, height * 4 / 5);
    }

    keyPressed() {
        if (keyCode === 32 || keyCode === 13) { // Space key or enter key
            this.currentPage++;
            if (this.currentPage >= this.pages.length) {
                currentState = this.returnState;
            }
        }
    }

    drawShadowedText(txt, x, y) {
        fill(0);
        text(txt, x + 2, y + 2);
        fill(255);
        text(txt, x, y);
    }

    windowResized() {
        this.canvasResizing();
    }
}
