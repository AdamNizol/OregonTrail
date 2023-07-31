class GameData {
    constructor() {
        this.reset();
    }

    reset() {
        this.confirmationStrings = ["yes", "y", "yeah","confirm", "affirmative", "ok", "okay", "sure", "yep", "accept", "agree", "approve", "i do", "aye", "oui", "si", "ja", "alright", "fine"]
        this.denialStrings = ["no", "n", "nope", "deny", "negative", "decline", "nah", "nay", "refuse", "reject", "cancel", "disagree", "disapprove", "i don't", "i do not", "non", "nein"]
        this.assets = {
            images: {
                mainMenuBackground: loadImage("assets/images/background_MainMenu.png"),
                decisionBackground: loadImage("assets/images/background_decision.png")
            },
            sounds: {
            }
        };

        // Game mode: Classic or Extended
        this.gameMode = "Extended"; 

        // The profession of the player: Banker, Carpenter, Farmer
        this.profession = "";

        // The distance travelled by player
        this.distance = 0;

        // The point multiplier based on the profession of the player
        this.pointMultiplier = 1; 

        // The health status of the party
        this.health = "Good"; // Good, Fair, Poor, Very Poor

        // The pace at which the party is moving
        this.pace = "Steady"; // Steady, Strenuous, Grueling

        // The rations of the party
        this.rations = "Filling"; // Filling, Meager, Bare Bones

        // The current weather condition
        this.weather = "Fair"; // TODO: figure out what the weather conditions are

        // The inventory of the player
        this.inventory = {
            bullets: 0,
            wagonWheels: 0,
            wagonAxles: 0,
            wagonTongues: 0,
            oxen: 0,
            clothes: 0,
            food: 0,
            money: 0
        };

        // The members of the party
        this.partyMembers = [];

        // The current date in the game
        this.currentDate = new Date(1848, 2, 1); // March 1, 1848
    }

    // Methods for interacting with the data ...

    // Examples:
    addPartyMember(member) {
        this.partyMembers.push(member);
    }

    removePartyMember(member) {
        const index = this.partyMembers.indexOf(member);
        if (index > -1) {
            this.partyMembers.splice(index, 1);
        }
    }

    advanceDate(days) {
        this.currentDate.setDate(this.currentDate.getDate() + days);
    }

    // Continue adding other methods as needed to interact with the game data
}
