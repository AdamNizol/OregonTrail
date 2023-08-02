class TravelingState extends BaseState {
    constructor() {
        super();
        this.travelingMessage = "You are on the trail...";
        this.lastUpdateTime = null; // Tracks the last update time
        this.speed = 1; // Speed of travel in miles per second
    }

    update() {
        // Get the current time
        let currentTime = millis();

        // If this is the first update, initialize lastUpdateTime
        if (this.lastUpdateTime === null) {
            this.lastUpdateTime = currentTime;
        }

        // Calculate the elapsed time since the last update in seconds
        let elapsedTimeInSeconds = (currentTime - this.lastUpdateTime) / 1000;

        // Update the distance traveled based on the elapsed time in seconds
        gameData.distanceTraveled += this.speed * elapsedTimeInSeconds;

        // Update the last update time
        this.lastUpdateTime = currentTime;

        // Check for any events or changes in state
        this.checkForEvents();
    }

    checkForEvents() {
        // Logic for handling random events or changes in the game's state while traveling
        // This could include encountering other travelers, finding landmarks, getting sick, etc.

        // Example: check if the party has reached a landmark
        if (gameData.distanceTraveled >= gameData.nextLandmark) {
            // Transition to a new state to handle the landmark
            currentState = new LandmarkState();
        }
    }

    draw() {
        clear();
        image(gameData.assets.images.travelingBackground, 0, 0, width, height); // Replace with appropriate background image

        let textY = height * 0.1;
        let textX = width * 0.1;

        // Display the traveling message
        this.drawShadowedText(this.travelingMessage, textX, textY);
        textY += height * 0.1;

        // Display the current date
        this.drawShadowedText(`Date: ${gameData.currentDate.toDateString()}`, textX, textY);
        textY += height * 0.05;

        // Display the weather
        this.drawShadowedText(`Weather: ${gameData.weather}`, textX, textY);
        textY += height * 0.05;

        // Display the health
        this.drawShadowedText(`Health: ${gameData.health}`, textX, textY);
        textY += height * 0.05;

        // Display the food
        this.drawShadowedText(`Food: ${Math.floor(gameData.inventory.food)} lbs`, textX, textY);
        textY += height * 0.05;

        // Display the distance to the next landmark
        this.drawShadowedText(`Distance to Next Landmark: 100 miles`, textX, textY);
        textY += height * 0.05;

        // Display the miles traveled
        this.drawShadowedText(`Miles Traveled: ${Math.floor(gameData.distanceTraveled)} miles`, textX, textY);
    }

    keyPressed() {
        // Logic for handling user input while traveling
        // This could include opening the traveling menu, making decisions, etc.

        // Example: open the traveling menu if the player presses 'M'
        if (keyCode === 77) { // 'M' key
            currentState = new TravelingMenuState();
        }
    }
}
