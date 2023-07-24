class LearnState extends BaseState {
    constructor() {
        super();
        this.pages = [
            // You can replace these with the actual text you want to show
            "Page 1: Information about the trail...",
            "Page 2: More information...",
            "Page 3: Even more information...",
            // Add as many pages as needed
        ];
        this.currentPage = 0;
    }

    update() {
        // No need to listen for the Space key here anymore
    }

    draw() {
        background(0);  // Clear the screen
        fill(255);  // Set the text color to white
        textSize(height / 30);
        text(this.pages[this.currentPage], width / 8, height / 4);
    }

    handleInput() {
        // No need to handle input here
    }

    keyPressed() {
        // Listen for the Space key to go to the next page
        if (keyCode === 32) {  // 32 is the key code for the Space key
            this.currentPage++;
            if (this.currentPage >= this.pages.length) {
                // Go back to the main menu after the last page
                currentState = new MainMenuState();
            }
        }
    }

    windowResized() {
        // Update any necessary properties here
    }
}
