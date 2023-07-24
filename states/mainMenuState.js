class MainMenuState extends BaseState {
    constructor() {
        super();
        // Update the third option to reflect the current game mode
        this.options = ["1. Travel the trail", "2. Learn about the trail", `3. Switch to ${gameMode === "Extended" ? "Classic" : "Extended"} Mode`];
        this.userInput = "";
    }

    update() {
        // Update the third option in case the game mode has changed
        this.options[2] = `3. Switch to ${gameMode === "Extended" ? "Classic" : "Extended"} Mode`;
    }

    draw() {
        image(mainMenuBackground, 0, 0, width, height);
        textSize(height / 25); 
        let y = height / 3;
        let spacing = height / 18; 
        for (let option of this.options) {
            this.drawShadowedText(option, width / 6, y);
            y += spacing;
        }
        this.drawShadowedText("What is your choice?", width / 6, y);
        this.drawShadowedText(this.userInput, width / 6, y + spacing);
    }

    drawShadowedText(txt, x, y) {
        fill(0); 
        text(txt, x + 2, y + 2); 
        fill(255);
        text(txt, x, y);
    }

    handleUserInput(input) {
        switch(input) {
            case "1":
                this.startGame();
                break;
            case "2":
                currentState = new LearnState();
                break;
            case "3":
                // Switch the game mode
                gameMode = gameMode === "Extended" ? "Classic" : "Extended";
                break;
        }
    }

    keyPressed() {
        if (keyCode === ENTER) {
            this.handleUserInput(this.userInput);
            this.userInput = "";
        } else if (keyCode === BACKSPACE) {
            this.userInput = this.userInput.slice(0, -1);
        }
    }

    keyTyped() {
        if (keyCode !== ENTER 
            && keyCode !== BACKSPACE
            && (this.userInput.length > 0 || key !== " ")
            ) {
            this.userInput += key;
        }
    }

    startGame() {
        this.userInput = "";
        currentState = new CharacterSelectState();
    }

    windowResized() {
        // Update any necessary properties here
    }
}
