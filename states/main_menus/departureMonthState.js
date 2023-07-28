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
            print(gameData.currentDate.getMonth());
            let classicReadingPages = [
                `Before leaving Independence, you should buy\nequipment and supplies. You have $${gameData.inventory.money.toFixed(2)} in cash,\nbut you don't have to spend it all now.`,
                "You can buy whatever you need at Matt's General\nStore."
            ]
            let extendedReadingPages = [
                `As you stand on the brink of your journey, you\nglance at the pouch containing your funds. It holds\n$${gameData.inventory.money.toFixed(2)}, a sum that must cover your equipment and\nprovisions. However, remember that frugality can be\na virtue, and you need not deplete all your\nresources before setting out.`,
                `Matt's General Store stands invitingly nearby,\noffering a wealth of supplies to aid you on your\npath.\n\nRemember, wise choices here can mean the difference\nbetween survival and tragedy on the trail ahead.`,
                `You've chosen to embark on your journey in ${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(gameData.currentDate)}.\n\nThe month of departure can significantly influence\nthe challenges you'll face. Choose your supplies\ncarefully considering the varying weather and\nconditions of your chosen month.`
            ];
            
            currentState = new ReadingState(
                gameData.gameMode === "Classic" ? classicReadingPages : extendedReadingPages, 
                new MattsGeneralStoreState()
            );
        } else if (input === "6") {
            // TODO: add ReadingState
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
}
