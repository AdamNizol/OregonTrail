class PartySetupState extends GameState {
    constructor() {
        super();
        this.partyNames = ["", "", "", "", ""];
        this.currentMember = 0;  // Start with the player, then ask for the other party members
        this.prompt = "What is the first name of your leader\nand the four other members in your party?";
        this.tips = ["Enter names or press Enter"]
        this.userInput = "";
        this.background = gameData.assets.images.decisionBackground;
    }

    draw() {
        image(this.background, 0, 0, width, height);
        textSize(height / 25);

        let y = height / 5;
        let x = width / 6;
        this.drawShadowedText(this.prompt, x, y);

        let spacing = height / 18;
        y += Math.floor(spacing*1.5);
        for (let i = 0; i < 5; i++) {
            let name = this.partyNames[i];
            if (i === this.currentMember) {
                name += "_";
            }
            this.drawShadowedText((i + 1) + ". " + name, x, y + ((i + 1) * spacing));
        }
        // this.drawShadowedText(`[${this.tip}]`, x, height * 5 / 6);
        for (let i = 0; i < this.tips.length; i++) {
            this.drawShadowedText(`[${this.tips[i]}]`, x, height * 5 / 6 + (i * spacing));
        }
    }

    setDefaultText() {
        this.prompt = "What is the first name of your leader\nand the four other members in your party?";
        this.tips = ["Enter names or press Enter"]
    }

    handleUserInput(input) {
        if(this.currentMember === 5) {
            // gameData.partyNames = this.partyNames;
            for (let i = 0; i < this.partyNames.length; i++) {
                gameData.addPartyMember(new PartyMember(this.partyNames[i], (i===0)));
            }
            // TODO: Go to next state
            currentState = new DepartureMonthState();
            return;
        }

        if (input.trim() === "") {
            input = this.generateRandomName();
        }
        this.partyNames[this.currentMember] = input.trim();
        this.currentMember++;
        this.userInput = "";
        if (this.currentMember > 4) {
            this.prompt = "Here are the members of your party:";
            this.tips = ["Press Enter to accept", "press UP_ARROW to edit your party"];
            
        } else {
            this.setDefaultText();
        }
    }

    keyPressed() {
        if (keyCode === BACKSPACE) {
            this.partyNames[this.currentMember] = this.partyNames[this.currentMember].slice(0, -1);
        }else if (keyCode === UP_ARROW) {
            this.currentMember--;
            if (this.currentMember < 0) {
                this.currentMember = 0;
            }
            this.setDefaultText();
        }else if (keyCode === DOWN_ARROW) {
            if (this.partyNames[this.currentMember].trim() != "") {
                this.currentMember++;
                if (this.currentMember > 4) {
                    this.currentMember = 4;
                }
            }
        }
    }

    keyTyped() {
        if (keyCode === ENTER) {
            this.handleUserInput(this.partyNames[this.currentMember]);
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
}
