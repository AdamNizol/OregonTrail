class PartySetupState extends GameState {
    constructor() {
        super();
        this.partyNames = ["", "", "", "", ""];
        this.currentMember = 0;  // Start with the player, then ask for the other party members
        this.title = "Who is in your party?";
        this.prompt = "What is the first name of the wagon leader?";
        this.userInput = "";
        this.background = gameData.assets.images.decisionBackground;
    }

    draw() {
        image(this.background, 0, 0, width, height);
        textSize(height / 25);

        let y = height / 5;
        let x = width / 6;
        this.drawShadowedText("What are the first name of your leader\nand the four other members in your party?", x, y);

        let spacing = height / 18;
        y += Math.floor(spacing*1.5);
        for (let i = 0; i < 5; i++) {
            let name = this.partyNames[i];
            if (i === this.currentMember) {
                name += "_";
            }
            this.drawShadowedText((i + 1) + ". " + name, x, y + ((i + 1) * spacing));
        }
        this.drawShadowedText("[Enter names or press Enter]", x, height * 5 / 6);
    }

    handleUserInput(input) {
        if (input.trim() === "") {
            input = this.generateRandomName();
        }
        this.partyNames[this.currentMember] = input.trim();
        this.currentMember++;
        this.userInput = "";
        if (this.currentMember > 4) {
            gameData.partyNames = this.partyNames;
            // Transition to the next state
        } else {
            this.prompt = `Enter the name of party member ${this.currentMember + 1}:`;
        }
    }

    keyTyped() {
        if (keyCode === ENTER) {
            this.handleUserInput(this.partyNames[this.currentMember]);
        } else if (keyCode === BACKSPACE) {
            this.partyNames[this.currentMember] = this.partyNames[this.currentMember].slice(0, -1);
        } else {
            this.partyNames[this.currentMember] += key;
        }
    }
    

    generateRandomName() {
        // Add a list of random names
        let randomNames = ["Emma", "Liam", "Olivia", "Noah", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia"];
        let result = randomNames[Math.floor(Math.random() * randomNames.length)];
        while (this.partyNames.includes(result)) {
            result = randomNames[Math.floor(Math.random() * randomNames.length)];
        }
        return result;
    }

    windowResized() {
        // Empty for now, add necessary code here
    }
}
