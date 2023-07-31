class TradeOfferState extends BaseState {
    constructor(offers, acceptState, rejectState) {
        super();
        this.offers = offers.filter(offer => offer.purchaseQuantity > 0);
        this.acceptState = acceptState; // The state to transition to if the offer is accepted
        this.rejectState = rejectState; // The state to transition to if the offer is rejected
        this.userInput = "";
        this.confirmationMessage = "Do you accept this trade offer?";
        this.totalCost = this.calculateTotalCost();
    }

    calculateTotalCost() {
        let total = 0;
        for (const offer of this.offers) {
            total += offer.purchaseQuantity * offer.price;
        }
        return total;
    }

    draw() {
        background(gameData.assets.images.decisionBackground);
        let fontSize = height * 0.04;
        textSize(fontSize);
        // Draw trade offers
        let y = height * 0.1;
        for (const offer of this.offers) {
            this.drawShadowedText(`${offer.description}:`, width * 0.1, y);
            textAlign(RIGHT);
            this.drawShadowedText(`${offer.purchaseQuantity} x ${offer.price.toFixed(2).padStart(6)} = ${('$'+(offer.purchaseQuantity * offer.price).toFixed(2)).padStart(6)}`, width * 0.9, y);
            textAlign(LEFT);
            y += height * 0.06;
        }

        textSize(height / 28);
        let yStart = y
        let yInterval = height / 24;
        this.drawShadowedText(`Total Price:`.padEnd(16)+` $${this.totalCost.toFixed(2)}`, width / 2.1, yStart);
        this.drawShadowedText(`Current Money:`.padEnd(16)+` $${gameData.inventory.money.toFixed(2)}`, width / 2.1, yStart + yInterval);
        this.drawShadowedText(`Remaining Money:`.padEnd(16)+` $${(gameData.inventory.money - this.totalCost).toFixed(2)}`, width / 2.1, yStart + (2 * yInterval));

        // Draw user input
        this.drawUserInput();
    }

    drawUserInput() {
        textSize(height * 0.045);
        // Draw confirmation message
        let y = height * 0.8;
        this.drawShadowedText(this.confirmationMessage, width * 0.1, y);
        y += height * 0.07;
        this.drawShadowedText(this.userInput + '_', width * 0.1, y);
    }

    keyTyped() {
        if (keyCode === ENTER) {
            this.userInput = this.userInput.trim();
            if (gameData.confirmationStrings.includes(this.userInput.toLowerCase())) {
                if (gameData.inventory.money >= this.totalCost) {
                    // Process the trade here, e.g., update the player's inventory and balance
                    for (const offer of this.offers) {
                        gameData.inventory.money -= offer.purchaseQuantity * offer.price;
                        gameData.inventory[offer.item] += offer.purchaseQuantity * offer.quantity;
                    }
                    // Transition to the accept state after a confirmation message
                    currentState = new ReadingState(["You have accepted the trade offer."], this.acceptState);
                } else{
                    currentState = new ReadingState(["You don't have enough money to buy all of that.\nConsider being more frugal."], this);
                }
            } else if (gameData.denialStrings.includes(this.userInput.toLowerCase())) {
                // Transition to the reject state without processing the trade
                currentState = this.rejectState;
            }
            this.userInput = "";
        } else {
            this.userInput += key;
        }
    }

    keyPressed() {
        if (keyCode === BACKSPACE) {
            this.userInput = this.userInput.slice(0, -1);
        }
    }
}
