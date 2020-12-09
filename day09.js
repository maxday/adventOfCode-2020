const fs = require('fs');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input09.txt'),
});

const numbers = [];
const offset = 25;

readInterface.on('line', function(line) {
    numbers.push(parseInt(line, 10));
});

readInterface.on('close', _ => {
    const resultat = checkStar1();
    let res = false;
    let begin = 0;
    while(!res) {
        res = checkStar2(begin, resultat);
        begin++;
    }
});

const checkStar1 = () => {
    for(let i = offset; i < numbers.length; ++i) {
        const toCheck = numbers[i];
        if(!isOK(toCheck, i)) {
            console.log(numbers[i]);
            return numbers[i];
        }
    }
}

const checkStar2 = (begin, nb) => {
    let sum = 0;
    for(let i = begin; i < numbers.length; ++i) {
       sum += numbers[i];
       if(sum > nb) {
           return false;
       }
       if(sum === nb) {
           const array = numbers.slice(begin, i);
           console.log(Math.min(...array) + Math.max(...array));
           return true;
       }
    }
}

const isOK = (number, currentOffset) => {
    return findNb(number, numbers.slice(currentOffset - offset, currentOffset));
}

const findNb = (nb, array) => {
    for(let i = 0; i < array.length; ++i) {
        for(let j = i + 1; j < array.length; ++j) {
            if(array[i] + array [j] === nb) {
                return true;
            }
        }
    }
}