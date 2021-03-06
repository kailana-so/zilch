// Zilch

// 1. create an array of 6
// 2. "on roll" populate array with 6 random numbers
// 3. calc basic score, running
// 4. score value lookup
//

const prompt = require('prompt-sync')();


function playerRoll(){

    const values = {
            '1': 100,
            '5': 50,
            '111': 1000,
            '222': 200, 
            '333': 300,
            '444': 400,
            '666': 600
        }

    
    let playerScore = []
    let sit = []
    let rollLength = 6  
    let diceTaken = [0]
    
    while(!sit.includes('sit') && rollLength > diceTaken.length - 1){

        let roll = [...Array(rollLength - diceTaken.reduce((acc, num) => acc + num))].map(() => Math.floor(Math.random() * 6) + 1)
        console.log(roll)

        // if roll length ie. dice left == ''(- empty) break out of loop
        if(roll == '') {
          break
        }
        
        // if roll is valid - testing
        let hasDuplicate = roll.some((val, i) => roll.indexOf(val) !== i);
        // console.log(hasDuplicate)
        // console.log(roll.includes(1))
        // console.log(roll.includes(5) )
        if(!hasDuplicate && !roll.includes(1) && !roll.includes(5) ) {
          console.log('invalid')
          break
        }

        // prompt player for choice
        const playerChoice = prompt('Choose your dice: ')

        // if str length != 3 split and search each value : search for the set of 3 in lookup



        // if the player choice is a valid score, push it to player score and split the length to add to dice taken array
        // else check is the player choice is 'sit' and add to sit arr
        // else score not valid
        values[playerChoice] 
          ? playerScore.push(values[playerChoice]) && diceTaken.push(playerChoice.split('').length)
          : playerChoice.split(',').forEach(choice => playerScore.push(values[choice]) && diceTaken.push(choice.length))
            
        playerChoice === 'sit' 
          ? sit.push(playerChoice) && playerScore.push(0)
          : null
        playerChoice === '' 
          ? console.log(`that's not valid!`) && playerScore.push(0)
          : null

        console.log(`You have choosen ${playerChoice}, your current score is ${playerScore.reduce((acc, num) => acc + num)}`)
        
        
        


        // tracking dice
        // console.log(diceTaken)


    }

    return playerScore.length != 0 
    ? `Your score is ${playerScore.reduce((acc, score) => acc + score)}` 
    : 'You Zilched!'
}
console.log(playerRoll())