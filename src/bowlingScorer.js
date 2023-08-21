class BowlingScorer {
    constructor() {
        this.rolls = [];
        this.currentRole = 0;
    }

    // Static factory method to create an instance of BowlingScorer
    static create = () => new BowlingScorer();

    // Method to record the number of pins knocked down in a roll
    roll = pins => (this.rolls[this.currentRole++] = pins);

    // Method to reset the rolls and current role
    reset = () => {
        this.rolls = [];
        this.currentRole = 0;
    };

    // Method to determine the number of pins standing after a frame
    pinsUp = () => {
        const scoreData = this.score();
        let pinsUp = 10;
        scoreData.forEach(obj => {
            if (obj.pinsUp !== null && !isNaN(obj.pinsUp)) {
                pinsUp = obj.pinsUp;
            }
        });
        return pinsUp;
    };

    // Method to calculate the scores for each frame
    score = () => {
        let scoreData = [];
        let score = 0;
        let frameIndex = 0;

        // Helper functions to get the values of each roll
        const roll1 = () => this.rolls[frameIndex];
        const roll2 = () => this.rolls[frameIndex + 1];
        const roll3 = () => this.rolls[frameIndex + 2];

        // Helper function to calculate the sum of the current frame's rolls
        const sumOfFrameRolls = () => roll1() + roll2();

        // Helper function to get the bonus points for a spare
        const spareBonus = () => roll3();

        // Helper function to get the bonus points for a strike
        const strikeBonus = () => roll2() + roll3();

        // Helper function to check if the current roll is a strike
        const isStrike = () => roll1() === 10;

        // Helper function to check if the current frame is a spare
        const isSpare = () => sumOfFrameRolls() === 10;

        // Method to save frame data to the scoreData array
        const saveFrame = (scoreData, leftBox, rightBox, score, pinsUp) => {
            if (scoreData.length < 9) {
                // For frames 1-9, add the frame data to the scoreData array
                scoreData.push({
                    leftBox,
                    rightBox,
                    cumulativeScore: score,
                    pinsUp
                });
            } else {
                // Handle the 10th frame
                const box1 = roll1() === 10 ? "X" : roll1();
                const box2 = roll2() === 10 ? "X" : isSpare() ? "/" : roll2();
                let box3;
                if (roll3() === 10) {
                    box3 = "X";
                } else if (roll1() === 10 || roll1() + roll2() === 10) {
                    box3 = roll3();
                } else {
                    box3 = "";
                }

                // Add the 10th frame data to the scoreData array
                scoreData.push({
                    leftBox: box1,
                    rightBox: box2,
                    cumulativeScore: score,
                    pinsUp,
                    extraBox: box3
                });
            }
        };

        // Loop through 10 frames to calculate scores
        [...Array(10)].forEach((_, frame) => {
            if (isStrike()) {
                // If it's a strike, add 10 plus the strike bonus to the score
                score += 10 + strikeBonus();
                // Save the frame data for display
                saveFrame(scoreData, "", "X", score, 10);
                frameIndex++;
            } else if (isSpare()) {
                // If it's a spare, add 10 plus the spare bonus to the score
                score += 10 + spareBonus();
                // Save the frame data for display
                saveFrame(scoreData, roll1(), "/", score, 10);
                frameIndex += 2; // Move to the next frame (skip the next roll)
            } else {
                // If it's neither a strike nor a spare
                score += sumOfFrameRolls(); // Add the sum of both rolls to the score
                // Calculate the pins left standing after the first roll
                const pinsUp = roll2() !== undefined ? 10 : 10 - roll1();
                // Save the frame data for display
                saveFrame(scoreData, roll1(), roll2(), score, pinsUp);
                frameIndex += 2; // Move to the next frame
            }
        });

        return scoreData;
    };
}

export default BowlingScorer;
