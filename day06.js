const fs = require('fs');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input06.txt'),
});

const lines = [];
const nbs = [];
let nbValid = 0;
let currentLine = '';
let currentNb = 0;
readInterface.on('line', function(line) {
   if(line === '') {
       lines.push(currentLine);
       nbs.push(currentNb);
       currentLine = '';
       currentNb = 0;
    
   } else {
       currentLine = currentLine + line;
       currentNb++;
   }

});

let total = 0;

readInterface.on('close', _ => {
    lines.push(currentLine);
    nbs.push(currentNb);
    checkStar1();
    checkStar2();
});


const checkStar1 = () => {
    for(let i = 0; i < lines.length; ++i) {
        let chars = [];
        for(let j = 0; j < lines[i].length; ++j) {
            chars.push(lines[i][j]);
        }
        let array = [...new Set(chars)].length;
        total += array;
    }
    console.log(total);
}

const charCount = (str, letter) => {
    let letterCount = 0;
    for (let position = 0; position < str.length; position++) {
        if (str.charAt(position) == letter) {
            letterCount++;
        }
    }
    return letterCount;
}

const checkStar2 = () => {
    for(let i = 0; i < lines.length; ++i) {
        let alreadySeen = [];
        for(let j = 0; j < lines[i].length; ++j) {
            if(charCount(lines[i], lines[i][j]) === nbs[i] && !alreadySeen.includes(lines[i][j])) {
                nbValid++;
            }
            alreadySeen.push(lines[i][j]);
        }
    }
    console.log(nbValid);
}