// Zilch

// 1. create an array of 6
// 2. "on roll" populate array with 6 random numbers
// 3. calc basic score, running
// 4. score value lookup
//

const prompt = require('prompt-sync')();


function rollChoice(){

    const values = {
            '1': 100,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 50,
            '6': 0,
            '111': 1000,
            '222': 200, 
            '333': 300,
            '444': 400,
            '666': 600
        }

    
    let playerScore = [0]
    let sit = []
    let rollLength = 6  
    let diceTaken = [0]
    
    while(sit.includes('sit') == false && rollLength > diceTaken.length - 1){
        console.log(playerScore.includes('sit'))
        let roll = [...Array(rollLength - diceTaken.reduce((acc, num) => acc + num))].map(() => Math.floor(Math.random() * 6) + 1)
        console.log(roll)

        const playerChoice = prompt('Choose your dice: ')

        // if str length != 3 split and search each value : search for the set of 3 in lookup

        values[playerChoice] ? playerScore.push(values[playerChoice]) && diceTaken.push(playerChoice.split('').length) : sit.push(playerChoice)
        console.log(diceTaken)
        
        
        console.log(`You have choosen ${playerChoice}, your current score is ${playerScore}`)


    }

    return playerScore.reduce((acc, score) => acc + score)
}
console.log(rollChoice())