class DepartureMonthState extends BaseState {
    constructor() {
        super();
        this.title = "Choose your departure month";
        this.options = [
            "1. March",
            "2. April",
            "3. May",
            "4. June",
            "5. July",
            "6. Ask for advice"
        ];
        this.userInput = "";
        this.monthNumbers = {
            "1": 2,  // March
            "2": 3,  // April
            "3": 4,  // May
            "4": 5,  // June
            "5": 6   // July
        };
        this.background = gameData.assets.images.decisionBackground;
    }

    // Display the state's title, options, and user input
    draw() {
        background(this.background);
        textAlign(CENTER);
        this.drawShadowedText(this.title, width / 2, height / 6);
        textAlign(LEFT);

        this.drawOptions(width / 2, height / 2);
        this.drawUserInput(width / 2, height * 0.75);
    }

    drawOptions() {
        let textScale = Math.floor(height/24);
        textSize(textScale);
        let y = Math.floor(height / 3.5);
        let yIncrement = textScale * 1.5;  // Adjust this to increase/decrease line spacing
        for (let option of this.options) {
            this.drawShadowedText(option, Math.floor(width / 3), y);
            y += yIncrement;
        }
    }
    

    drawUserInput() {
        textAlign(CENTER);
        let textScale = Math.floor(height/20);
        textSize(textScale);
        let y = height * (4/5);
        this.drawShadowedText("What is your choice?", width / 2, y);
        this.drawShadowedText(this.userInput, width / 2, y + textScale * 1.5);
        textAlign(LEFT);
    }
    


    // Handle the user's key presses
    handleUserInput(input) {
        if (input in this.monthNumbers) {
            gameData.currentDate.setMonth(this.monthNumbers[input]);
            print(gameData.currentDate);
            currentState = new GameState();  // Replace with the actual next state
        } else if (input === "6") {
            // Add logic for advice
        }
        this.userInput = "";
    }

    // Handle the user's key types
    keyTyped() {
        if (keyCode !== ENTER) {
            this.userInput += key;
        }
    }

    // Handle the user's key presses
    keyPressed() {
        if (keyCode === BACKSPACE) {
            this.userInput = this.userInput.slice(0, -1);
        } else if (keyCode === ENTER) {
            this.handleUserInput(this.userInput);
        }
    }

    windowResized() {
        // Empty for now, add necessary code here
    }
}
