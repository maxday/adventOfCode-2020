const fs = require('fs');
const readline = require('readline');
let validPasswordFirstStar = 0;
let validPasswordSecondStar = 0;
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input02.txt'),
});

readInterface.on('line', function(line) {
    const tokens = line.split(' ');
    const limitToken = tokens[0].split('-');
    const firstNumber = parseInt(limitToken[0], 10);
    const secondNumber = parseInt(limitToken[1], 10);
    const letter = tokens[1].replace(':', '');
    const passwordToCheck = tokens[2];
    //first star
    let nbOfLetters = 0;
    for(let i = 0; i < passwordToCheck.length; ++i) {
        if(passwordToCheck[i] === letter) {
            nbOfLetters++;
        }
    }
    if(nbOfLetters >= firstNumber && nbOfLetters <= secondNumber) {
        validPasswordFirstStar++;
    }
    //second star
    if((passwordToCheck[firstNumber - 1] === letter && passwordToCheck[secondNumber - 1] !== letter) || 
        (passwordToCheck[secondNumber - 1] === letter && passwordToCheck[firstNumber - 1] !== letter)) {
            validPasswordSecondStar++;
    }
});

readInterface.on('close', _ => {
    console.log(validPasswordFirstStar);
    console.log(validPasswordSecondStar);
});
