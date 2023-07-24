class CharacterSelectState extends BaseState {
    constructor() {
        super();
        this.options = [
            "1. Be a banker from Boston",
            "2. Be a carpenter from Ohio",
            "3. Be a farmer from Illinois",
            "4. Find out the differences between these choices"
        ];
        this.userInput = "";
    }

    update() {
        // No need to listen for Enter key here
    }

    draw() {
        background(0);  // Clear the screen
        fill(255);  // Set the text color to white
        image(decisionBackground, 0, 0, width, height);

        textSize(height / 25); 
        let y = height / 3;
        let spacing = height / 20;
        for (let option of this.options) {
            this.drawShadowedText(option, width / 4, y);
            y += spacing;
        }
        y += Math.floor(spacing/3);
        this.drawShadowedText("What is your choice?", width / 4, y);
        this.drawShadowedText(this.userInput, width / 4, y + spacing);
    }

    drawShadowedText(txt, x, y) {
        fill(0);
        text(txt, x + 2, y + 2);
        fill(255);
        text(txt, x, y);
    }

    handleInput() {
        // No need to handle input here
    }

    handleUserInput(input) {
        switch(input) {
            case "1":
                // Assign profession to player and go to next state
                break;
            case "2":
                // Assign profession to player and go to next state
                break;
            case "3":
                // Assign profession to player and go to next state
                break;
            case "4":
                // Go to another state where the differences are explained
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

    windowResized() {
        // Update any necessary properties here
    }
}
