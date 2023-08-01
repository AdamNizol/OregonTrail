class StartScreenState extends BaseState {
    constructor() {
        super();
        this.background = gameData.assets.images.decisionBackground;
    }

    drawBackground() {
        image(this.background, 0, 0, width, height);
    }

    draw() {
        this.drawBackground();
        fill(255); // set the fill color to white
        textAlign(CENTER);
        textSize(height / 25); // Adjust the text size based on the canvas height
        // show current date
        let date = gameData.currentDate; // Date object
        let y = height * 3/4;
        // let dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        let dateString = date.toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})
        this.drawShadowedText("Independence", width / 2, y);
        y += height / 17;
        this.drawShadowedText(dateString, width / 2, y);
        y += height / 10;
        textSize(height / 20);
        this.drawShadowedText("Press enter to continue...", width / 2, y);
        textAlign(LEFT);
        
    }

    keyPressed() {
        if (keyCode === 32 || keyCode === 13) { // Space key or enter key
            currentState = new GameState();
        }
    }
}
