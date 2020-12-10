const fs = require('fs');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input10.txt'),
});

const numbers = [];

readInterface.on('line', function(line) {
    numbers.push(parseInt(line, 10));
});

readInterface.on('close', _ => {
    checkStar1();
    checkStar2();
});

const checkStar1 = () => {
    let diff = 0;
    let nbDiff1 = 0;
    let nbDiff3 = 0;
    const sorted = numbers.sort(function(a, b) {
        return a - b;
    });
    for(let i = 0; i < sorted.length; ++i) {
        if(sorted[i] - diff === 1) {
            nbDiff1++;
        }
        if(sorted[i] - diff === 3) {
            nbDiff3++;
        }
        diff = sorted[i];
    }
    console.log(nbDiff1 * (nbDiff3 + 1));
}

const checkStar2 = () => {
    numbers.push(0);
    const sorted = numbers.sort(function(a, b) {
        return a - b;
    });
    const resultMap = new Map();
    resultMap.set(0,1);
    for(let i = 0; i < sorted.length; i++) {
        let next = i + 1;
        while(sorted[next] - sorted[i] < 4) {
            if(!resultMap.has(next)) {
                resultMap.set(next, 0);
            }
            resultMap.set(next, resultMap.get(i) + resultMap.get(next));
            next++;
        }
    }
    console.log(resultMap.get(sorted.length - 1));
}