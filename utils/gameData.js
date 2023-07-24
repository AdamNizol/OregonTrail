class GameData {
    constructor() {
        this.reset();
    }

    reset() {
        this.gameMode = "Extended"; // Classic or Extended
        this.profession = ""; // Banker, Carpenter, Farmer
        this.money = 0;
        this.food = 0;
        this.distance = 0;
        this.pointMultiplier = 1; // 1, 2, or 3
        // Add other game-related variables as needed
    }

    setMode(mode) {
        this.gameMode = mode;
    }

    setProfession(profession) {
        this.profession = profession;
        switch(profession) {
            case "Banker":
                this.money = 1600;
                this.pointMultiplier = 1;
                break;
            case "Carpenter":
                this.money = 800;
                this.pointMultiplier = 2;
                break;
            case "Farmer":
                this.money = 400;
                this.pointMultiplier = 3;
                break;
        }
    }

    addMoney(amount) {
        this.money += amount;
    }

    useMoney(amount) {
        if (amount <= this.money) {
            this.money -= amount;
            return true;
        }
        return false; // Not enough money
    }

    addFood(amount) {
        this.food += amount;
    }

    useFood(amount) {
        if (amount <= this.food) {
            this.food -= amount;
            return true;
        }
        return false; // Not enough food
    }

    advance(distance) {
        this.distance += distance;
    }

    // Add other methods as needed to interact with the game data
}
