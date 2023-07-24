class GameData {
    constructor() {
        this.reset();
    }

    reset() {
        this.confirmationStrings = ["yes", "y", "yeah","confirm", "affirmative", "ok", "okay", "sure", "yep", "accept", "agree", "approve"]
        this.denialStrings = ["no", "n", "nope", "deny", "negative", "decline", "nah", "nay", "refuse", "reject", "cancel", "disagree", "disapprove"]
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

        // The amount of money player has
        this.money = 0;

        // The amount of food player has
        this.food = 0;

        // The distance travelled by player
        this.distance = 0;

        // The point multiplier based on the profession of the player
        this.pointMultiplier = 1; 

        // The health status of the party, value between 0-100
        this.health = 100; 

        // The pace at which the party is moving
        this.pace = "steady";

        // The current weather condition
        this.weather = "fair"; 

        // The inventory of the player
        this.inventory = {
            bullets: 0,
            wagonParts: 0,
            clothes: 0,
        };

        // The members of the party
        this.partyMembers = [];

        // The current date in the game
        this.currentDate = new Date(1848, 3, 1); // April 1, 1848

        // Miles travelled by the party
        this.milesTraveled = 0;

        // Miles to the next landmark
        this.milesToNextLandmark = 0;
    }

    // Methods for interacting with the data ...

    // Examples:
    setWeather(newWeather) {
        this.weather = newWeather;
    }

    setPace(newPace) {
        this.pace = newPace;
    }

    addInventoryItem(item, quantity) {
        if (this.inventory[item] !== undefined) {
            this.inventory[item] += quantity;
        }
    }

    useInventoryItem(item, quantity) {
        if (this.inventory[item] !== undefined && this.inventory[item] >= quantity) {
            this.inventory[item] -= quantity;
            return true;
        }
        return false; // Not enough items
    }

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
