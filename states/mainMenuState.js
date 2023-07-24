class MainMenuState extends BaseState {
    constructor() {
        super();
        this.options = [
            "1. Travel the trail",
            "2. Learn about the trail",
            "3. Switch to Classic Mode"
        ];
        this.userInput = "";
        this.background = gameData.assets.images.mainMenuBackground;
    }

    draw() {
        image(this.background, 0, 0, width, height);
        textSize(height / 27);
        let y = Math.floor(height / 3.07);
        let spacing = height / 17;
        for (let option of this.options) {
            this.drawShadowedText(option, width / 6, y);
            y += spacing;
        }
        this.drawShadowedText("What is your choice?", width / 6, y);
        this.drawShadowedText(this.userInput, width / 6, y + spacing);
    }

    handleUserInput(input) {
        switch(input) {
            case "1":
                currentState = new CharacterSelectState();
                break;
            case "2":
                let classicLearnPages = [
                    "Try taking a journey by covered wagon across 2000\nmiles of plains, rivers, and mountains.Try! On the\nplains, will you slosh your oxen through mud and\nwater-filled ruts or will you plod through dust six\ninches deep?",
                    "How will you cross the rivers? If you have money,\nyou might take a ferry(if there is a ferry). Or, you can\nford the river and hope you and your wagon aren't\nswallowed alive!",
                    "What about supplies? Well, if you're low on food\nyou can hunt. You might get a buffalo... you might.\nAnd there are bear in the mountains.",
                    "At the Dalles, you can try navigating the Columbia\nRiver, but if running the rapids with a makeshift\nraft makes you queasy, better take the Barlow Road.",
                    "If for some reason you don't survive -- your wagon\nburns, or thieves steal your oxen, or you run out of\nsupplies, or you die of cholera -- don't give up! Try\nagain...and again."
                ];
                let extendedLearnPages = [
                    "Embarking on a journey to Oregon by covered\nwagon involves traversing 2000 miles of diverse\nterrains, from plains and rivers to mountain ranges.\nWhether it's maneuvering through deep dust and\nmuddy ruts on the plains or navigating treacherous\nmountain paths, your decision-making skills will\nbe put to the test.",
                    "Crossing rivers presents its own set of challenges.\nIf your funds allow, you may opt to take a ferry,\nprovided one is available. Alternatively, you could\ndecide to ford the river, braving the potential risk\nof your wagon and its occupants being swallowed\nby the waters.",
                    "Supplies, particularly food, are another crucial\naspect of your journey. If you find yourself running\nlow on food, hunting becomes a vital activity. You\nmight be fortunate enough to catch a buffalo, or\neven encounter a bear in the mountains.",
                    "Upon reaching the Dalles, you'll face the choice of\nnavigating the Columbia River or taking the Barlow\nRoad. If the thought of tackling the river's rapids\nwith a makeshift raft makes you uneasy, the Barlow\nRoad might be the safer choice.",
                    "Survival is not guaranteed -- numerous dangers\nawait, from wagon fires and oxen thieves to food\nshortages and diseases like cholera. However, don't\nlose heart! You can always try again, using your\nprevious experiences to inform your future\ndecisions. Remember, persistence is key on the\nOregon Trail."
                ];                
                let learnPages = gameData.gameMode === "Classic" ? classicLearnPages : extendedLearnPages;
                currentState = new ReadingState(learnPages, this);
                break;
            case "3":
                if (gameData.gameMode === "Classic") {
                    gameData.gameMode = "Extended";
                    this.options[2] = "3. Switch to Classic Mode";
                } else {
                    gameData.gameMode = "Classic";
                    this.options[2] = "3. Switch to Extended Mode";
                }
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
        // No need to handle resizing here
    }
}
