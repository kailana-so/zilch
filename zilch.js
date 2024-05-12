const prompt = require('prompt-sync')();

// Function to roll the dice
function rollDice(numDice) {
    const dice = [];
    for (let i = 0; i < numDice; i++) {
        dice.push(Math.floor(Math.random() * 6) + 1);
    }
    return dice;
    // return [2,2,3,3,6,6]
}

function isStraight(dice) {
    return Object.keys(dice).length === 6 ? true : false
}
function isThreePairs(dice) {
    return Object.keys(dice).length === 3 ? true : false
}
function noScoringDice(dice) {
    console.log(dice, "dice")

}
// Function to score the roll
function scoreRoll(dice) {

    let specialRoll = false;
    const counts = Array.from({ length: 6 }, () => 0);
    // map to empty array
    dice.forEach((die) => {
        counts[die - 1]++;
    });
    
    const scores = []
    let diceCount = {}

    for (let i = 0; i < counts.length; i++) {
        if(counts[i] !== 0) {
            diceCount[i + 1] = counts[i] || 1;
        }
    }    

    if (noScoringDice(diceCount)) {
        // No scoring dice, 500 and a free roll
        console.log(`No scoring dice, 500 added to your score. Roll again...`)
    }

    // handle straight (five dice in a consecutive number order) = 1750
    if (isStraight(diceCount)) {
        specialRoll = true;
        console.log("that's a Straight")
        scores.push(1750)
    } 
    // handle three pairs (in any order) = 1500
    if (isThreePairs(diceCount)) {
        specialRoll = true;
        console.log("that's 3 pairs")
        scores.push(1500)
    }
    
    if (!specialRoll) {
        // handle non special rolls
        for (const [key, value] of Object.entries(diceCount)) {
            // handle 5
            if(key === '5') {
                if (value < 3) {
                    scores.push(50 * value)
                } else if (value === 3) {
                    // Three of a kind - times 100 by key ie 5 5 5 = 500
                    console.log(`3 of a kind: ${key}`)
                    scores.push(key * 100)
                } else {
                    console.log(`${value - 3} of a kind: ${key}`)
                    scores.push(key * (value - 3))
                }
            }
            // handle 1
            if(key === '1') {
                if (value < 3) {
                    scores.push(100 * value)
                } else if (value === 3) {
                    // Three of a kind - times 100 by value ie 1 1 1 = 1000
                    console.log(`3 of a kind: ${key}`)
                    scores.push(1000)
                } else if (value === 3)  {
                    // Four or more of a kind - 3 of a kind to the power of kind over 3 ie 1 1 1 1 = 2,000
                    console.log(`${value - 3} of a kind: ${key}`)
                    scores.push(1000 * 2)
                }
            }
            // handle all other numbers
            if(key !== '1' && key !== '5') {
                // Three of a kind
                if(value === 3) {
                    console.log(`3 of a kind: ${key}`)
                    scores.push(100 * key)
                } else if (value > 3) {
                    // Four or more of a kind - 3 of a kind to the power of kind over 3 ie
                    console.log(`${value - 3} of a kind: ${key}`)
                    scores.push((100 * key) * Math.pow(2, value - 3))
                }
            }
        }

    }
    console.log(scores,"scores")

    const total = scores.reduce((acc, value) => acc + value, 0)

    return total
}

function validateSelection(roll, selection) {
    console.log(...roll, "roll")
    console.log(typeof selection,'selection')
    const copyRoll = [...roll];
    for (const num of selection) {
        const index = copyRoll.findIndex((el) => el.toString() === num.toString());
        if (index === -1) {
            return false;
        }
        copyRoll.splice(index, 1);
    }
    return true;
}

// Main function to play the game
function playGame() {
    let takenDice = 0;
    let numDice = 6;
    const rolls = numDice - takenDice;
    let totalScore = 0;
    let totalDicePlayed = 0;

    for (let roll = 0; roll <= rolls; roll++) {


        console.log(`\nRolling ${numDice} dice...`);
        const dice = rollDice(numDice);
        console.log("Dice:", dice);

        //  validte roll ie. 6 in length and has a scoring dice or no scoring dice which is a free roll and 500 points,
        //  if less than 6 dice sand no scoring dice that the end

        // Prompt user to select dice to keep
        const answer = prompt("Take the dice you want to keep (e.g., 1 3 5): ");
        let keptDice = answer.trim().split("");

        const isValid = validateSelection(dice, keptDice);
        if (!isValid) {
            console.log("You didn't roll:", keptDice);
            const answer = prompt("Retry selection: ", dice);
            keptDice = answer.split(" ");
        }

        takenDice = keptDice.length
        totalDicePlayed += takenDice;
        numDice -= keptDice.length;
        console.log("Kept dice:", keptDice);

        const rollScore = scoreRoll(keptDice);
        totalScore += rollScore;

        console.log("Score for this roll:", rollScore);
        console.log("Total score:", totalScore);

        if (rollScore === 0){
            console.log("\nGame over. Final score:", totalScore);
            break;
        } 
        if (rollScore === 0 && roll === rolls - 1) {
            console.log("\nGame over. Final score:", totalScore);
            break;
        }
        if (rollScore !== 0 && (totalDicePlayed % 6) === 0){
            console.log("Nice. Keep playing...")
            numDice = 6
        } else {
            console.log(`You have ${rolls - roll - 1} roll(s) remaining.`);
            console.log("Remaining dice:", numDice);
        }
    }
}

// Start the game
playGame();
