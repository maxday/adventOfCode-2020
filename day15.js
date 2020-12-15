const fs = require('fs');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input15.txt'),
});

let numbers = [];
let lastSpoken;
let res;

readInterface.on('line', function(line) {
    numbers = line.split(',');

});

readInterface.on('close', _ => {
    checkStar1();
    checkStar2();
});

const speakCurrent = (nb, currentId) => { 
    if(!res.has(nb)) {
        res.set(nb,[]);
    }
    const array = res.get(nb);
    array.push(currentId);
    res.set(nb, array);
    lastSpoken = nb;
}

const checkStar1 = () => {
    play(2020);
}

const play = (max) => {
    res = new Map();
    for (let i = 0; i < numbers.length; ++i) {
        res.set(parseInt(numbers[i], 10), [i+1]);
    }
    let shouldContinue = true;
    let turnIdx = numbers.length+1;
    lastSpoken = parseInt(numbers[numbers.length-1], 10);
    while(shouldContinue) {
        const foundArray = res.get(lastSpoken);
        if(foundArray.length === 1) {
            speakCurrent(0, turnIdx);
        } else {
            const diff = foundArray[foundArray.length-1] -  foundArray[foundArray.length-2]; 
            speakCurrent(diff, turnIdx);
        }
        turnIdx++;
        if(turnIdx > max) {
            shouldContinue = false;
        }
    }
    console.log(lastSpoken);
}

const checkStar2 = () => {
    play(30000000);
};
