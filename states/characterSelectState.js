class CharacterSelectState extends BaseState {
    constructor() {
        super();
        this.options = [
            "1. Be a banker from Boston",
            "2. Be a carpenter from Ohio",
            "3. Be a farmer from Illinois",
            "4. Find out the differences between\n   these choices"
        ];
        this.userInput = "";
        this.background = gameData.assets.images.decisionBackground;
    }

    draw() {
        image(this.background, 0, 0, width, height);
        textSize(height / 25);

        let y = height / 4;
        let spacing = height / 18;
        for (let option of this.options) {
            this.drawShadowedText(option, width / 6, y);
            y += spacing;
        }
        y += spacing*1.5;
        this.drawShadowedText("What is your choice?", width / 6, y);
        this.drawShadowedText(this.userInput, width / 6, y + spacing);
    }

    handleUserInput(input) {
        switch(input) {
            case "1":
                gameData.profession = "banker";
                gameData.inventory.money = 1600;
                gameData.pointsMultiplier = 1;
                currentState = new PartySetupState();
                break;
            case "2":
                gameData.profession = "carpenter";
                gameData.inventory.money = 800;
                gameData.pointsMultiplier = 2;
                currentState = new PartySetupState();
                break;
            case "3":
                gameData.profession = "farmer";
                gameData.inventory.money = 400;
                gameData.pointsMultiplier = 3;
                currentState = new PartySetupState();
                break;
            case "4":
                let classicProfessionPages = [
                    "Traveling to Oregon isn't easy! But if you're a\nbanker, you'll have more money for supplies and\nservices than a carpenter or a farmer.\n\nHowever, the harder you have to try, the more\npoints you deserve! Therefore, the farmer earns\nthe greatest number of points and the banker\nearns the least."
                ];
                let extendedProfessionPages = [
                    "Setting off on the Oregon Trail is a monumental\ntask. The nature of your profession can greatly\nimpact your journey. Each profession offers\ndifferent resources and challenges, affecting your\noverall experience and score potential.",
                    "If you opt to be a banker from Boston, you'll start\nthe journey with the most monetary resources.\nThis can make it easier for you to purchase\nsupplies and services, providing a relatively\ncomfortable journey. However, this advantage is\nreflected in the scoring, where bankers earn the\nleast points.",
                    "Choosing to be a carpenter from Ohio provides a\nmiddle-ground option. You'll start with fewer\nresources than a banker, but more than a farmer.\nYour skills as a carpenter could come in handy\nduring the journey. The scoring for carpenters is\nbalanced, providing a moderate number of points.",
                    "The hardest but potentially most rewarding choice\nis to be a farmer from Illinois. As a farmer, you\nstart with the least resources, making your\njourney more challenging. However, overcoming\nthese challenges earns you the greatest number of\npoints, reflecting your perseverance and\nresourcefulness.",
                    "The choice of profession adds a strategic element\nto your journey. Whether you seek a comfortable\njourney or the glory of a high score, choose wisely!",
                    "To give you a clearer picture, here are the starting\nresources for each profession:\nBanker:    $1600\nCarpenter: $800 (2x Points)\nFarmer:    $400 (3x Points)\n\nChoose your profession keeping in mind that more\nresources make the journey easier, but the true\nreward lies in overcoming challenges."
                ];
                let professionPages = gameData.gameMode === "Classic" ? classicProfessionPages : extendedProfessionPages;
                currentState = new ReadingState(professionPages, this);
                break;
        }
        this.userInput = "";
    }

    keyPressed() {
        if (keyCode === BACKSPACE) {
            this.userInput = this.userInput.slice(0, this.userInput.length - 1);
        }
    }

    keyTyped() {
        if (keyCode === ENTER) {
            this.handleUserInput(this.userInput);
        } else if (keyCode !== BACKSPACE && (this.userInput.length > 0 || key !== " ")) {
            this.userInput += key;
        }
    }

    windowResized() {
        // Empty for now, add necessary code here
    }
}
