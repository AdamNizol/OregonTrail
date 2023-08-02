class TravelingMenuState extends BaseState {
    constructor() {
        super();
        this.options = [
            "1. Continue on the trail",
            "2. Check supplies",
            "3. Look at the map",
            "4. Change pace",
            "5. Change food rations",
            "6. Stop to rest",
            "7. Attempt to trade",
            "8. Hunt for food"
        ];
        this.userInput = "";
        this.background = gameData.assets.images.decisionBackground;
    }

    handleUserInput(input) {
        switch (input.trim()) {
            case "1":
                currentState = new GameState(); // new TravelingState();
                break;
            case "2":
                // Handle checking supplies here
                break;
            case "3":
                // Handle looking at the map here
                break;
            case "4":
                // Handle changing pace here
                break;
            case "5":
                // Handle changing food rations here
                break;
            case "6":
                // Handle resting here
                break;
            case "7":
                // Handle trading here
                break;
            case "8":
                // Handle hunting for food here
                break;
        }
        this.userInput = "";
    }

    draw() {
        clear();
        image(this.background, 0, 0, width, height);
        let baseY = height * 0.2;
        let optionGap = height * 0.07;
        for (let i = 0; i < this.options.length; i++) {
            let txt = this.options[i];
            this.drawShadowedText(txt, width * 0.2, baseY + i * optionGap);
        }
        this.drawUserInput(width * 0.2, baseY + this.options.length * optionGap + (optionGap / 2));
    }

    drawUserInput(x, y) {
        let inputText = "Your choice: " + this.userInput;
        this.drawShadowedText(inputText, x, y);
    }

    keyTyped() {
        if (keyCode !== ENTER && keyCode !== BACKSPACE) {
            this.userInput += key;
        } else if (keyCode === ENTER) {
            this.handleUserInput(this.userInput);
        }
    }

    keyPressed() {
        if (keyCode === BACKSPACE && this.userInput.length > 0) {
            this.userInput = this.userInput.slice(0, -1);
        }
    }
}
