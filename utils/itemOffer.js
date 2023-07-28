class ItemOffer {
    constructor(id, quantity, price, description, purchaseQuantity = 0) {
        this.id = id;                   // Identifier for the item type
        this.quantity = quantity;       // Quantity per unit (e.g. 2 oxen per yoke)
        this.price = price;             // Price per unit
        this.description = description; // Description of the item
        this.purchaseQuantity = purchaseQuantity;      // Quantity to purchase, to be set by the player
    }

    setPurchaseQuantity(input) {
        if (typeof input === "number") {
            this.purchaseQuantity = Math.max(0, input);
        } else if (typeof input === "string") {
            let number = parseInt(input.replace(/\D/g,''), 10);
            this.purchaseQuantity = isNaN(number) ? 0 : number;
        } else {
            this.purchaseQuantity = 0;
        }
    }
}
