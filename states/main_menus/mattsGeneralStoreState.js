class MattsGeneralStoreState extends BaseState {
    constructor() {
        super();
        this.offers = [
            new ItemOffer('oxen', 2, 40, "Yoke (2 Oxen)"),
            new ItemOffer('food', 1, 0.2, "Food"),
            new ItemOffer('clothing', 1, 10, "Set of Clothing"),
            new ItemOffer('ammo', 20, 2, "Ammo Box (20 Bullets)"),
            new ItemOffer('wheel', 1, 10, "Wagon Wheel"),
            new ItemOffer('axle', 1, 10, "Wagon Axle"),
            new ItemOffer('tongue', 1, 10, "Wagon Tongue")
        ];
        this.userInput = "";
        this.currentSelection = 0;
    }

    draw() {
        this.drawBackground();
        this.drawTitle();
        this.drawOptions();
        this.drawDetails();
        this.drawPrompt();
    }

    drawPrompt() {
        let txt = "Press enter to continue..."
        if (this.offers[this.currentSelection].purchaseQuantity == 0) {
            txt = `Enter quantity to purchase...`
        }else if (this.currentSelection === this.offers.length - 1) {
            txt = "Press enter to purchase..."
        }

        this.drawShadowedText(txt, width / 12, height * 9 / 10);
    }

    drawBackground() {
        image(gameData.assets.images["decisionBackground"], 0, 0, width, height);
    }

    drawTitle() {
        textSize(height / 15);
        textAlign(CENTER);
        this.drawShadowedText("Matt's General Store", width /2, height / 10);
        textAlign(LEFT);
    }

    drawOptions() {
        let yStart = height / 5;
        let yInterval = height / 14;
        for(let i = 0; i < this.offers.length; i++) {
            let txt = `${this.offers[i].description}`.padEnd(24)+ `$${this.offers[i].price.toFixed(2)} `.padEnd(8) + `Quantity: ${this.offers[i].purchaseQuantity}`;
            if(i === this.currentSelection) {
                txt += "_";
            }
            textSize(height / 25);
            this.drawShadowedText(txt, width / 7.5, yStart + i * yInterval);
        }
    }

    drawDetails() { // shows price of cart, current money, and remaining money
        textSize(height / 28);
        let yStart = height / 2.35;
        let yInterval = height / 24;
        this.drawShadowedText(`Total Price:`.padEnd(16)+` $${this.getTotalPrice().toFixed(2)}`, width / 2.1, yStart + this.offers.length * yInterval);
        this.drawShadowedText(`Current Money:`.padEnd(16)+` $${gameData.inventory.money.toFixed(2)}`, width / 2.1, yStart + (this.offers.length + 1) * yInterval);
        this.drawShadowedText(`Remaining Money:`.padEnd(16)+` $${(gameData.inventory.money - this.getTotalPrice()).toFixed(2)}`, width / 2.1, yStart + (this.offers.length + 2) * yInterval);
    }

    getTotalPrice(){
        let totalPrice = 0;
        for(let i = 0; i < this.offers.length; i++) {
            totalPrice += this.offers[i].price * this.offers[i].purchaseQuantity;
        }
        return totalPrice;
    }

    userConfirmed() {
        if (this.getTotalPrice() > gameData.inventory.money) {
            currentState = new ReadingState(["You don't have enough money to buy all of that.\nConsider being more frugal."], this);
        } else if (this.offers[0].purchaseQuantity === 0) { // if no oxen are purchased
            currentState = new ReadingState(["You need oxen for your journey."], this);
        } else if (this.offers[1].purchaseQuantity === 0) { // if no food is purchased
            currentState = new ReadingState(["You need food for your journey."], this);
        } else {
            console.log("now we send player to the offer accept/decline state")
        }

    }

    keyPressed() {
        if (keyCode === BACKSPACE) {
            this.offers[this.currentSelection].setPurchaseQuantity(String(this.offers[this.currentSelection].purchaseQuantity).slice(0, -1));
        } else if (keyCode === UP_ARROW) {
            this.currentSelection--;
            if (this.currentSelection < 0) {
                this.currentSelection = 0;
            }
        } else if (keyCode === DOWN_ARROW) {
            this.currentSelection++;
            if (this.currentSelection >= this.offers.length) {
                this.currentSelection = this.offers.length - 1;
            }
        }
    }

    keyTyped() {
        if (keyCode === ENTER) {
            if (this.currentSelection === this.offers.length - 1) {
                this.userConfirmed();
            } else if (this.offers[this.currentSelection].purchaseQuantity != 0) {
                this.currentSelection++;
            }
        } else {
            this.offers[this.currentSelection].setPurchaseQuantity(String(this.offers[this.currentSelection].purchaseQuantity) + key);
        }
    }

}
