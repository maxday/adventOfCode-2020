const fs = require('fs');
const { parse } = require('path');
const path = require('path');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input13.txt'),
});
let nb = 0;
let lines = [];
let linesSecondStar;
let computedTimes = [];
let shouldContinue = [];
let startTime = 0;


readInterface.on('line', function(line) {
    if(nb === 0) {
        startTime = parseInt(line);
        nb++;
    } else {
        lines = line.split(",").filter(e => e !== 'x');
        linesSecondStar = line.split(",");
    }
});

readInterface.on('close', _ => {
    checkStar1();
    checkStar2();
});

const checkStar1 = () => {
    let shouldLoop = true;
    for(let i = 0; i < lines.length; ++i) {
        computedTimes.push(0);
    }
    for(let i = 0; i < lines.length; ++i) {
        shouldContinue.push(true);
    }
    while(shouldLoop) {
        for(let i = 0; i < lines.length; ++i) {
            if(shouldContinue[i]) {
                computedTimes[i] += parseInt(lines[i], 10);
            }
        }
        for(let i = 0; i < lines.length; ++i) {
            if(computedTimes[i] >= startTime) {
                shouldContinue[i] = false;
            }
        }
        shouldLoop = shouldContinue.filter(e => e === false).length < lines.length;
    }
    let min = 10e10;
    for(let i = 0; i < lines.length; ++i) {
        if(computedTimes[i]>= startTime && computedTimes[i] <= min) {
            min = computedTimes[i];
        }
    }
    console.log((min - startTime) * lines[computedTimes.indexOf(min)]);
}

const checkStar2 = () => {
    const all = [];
    for(let i = 0; i < linesSecondStar.length; ++i) {
        const busLine = parseInt(linesSecondStar[i], 10);
        if(!Number.isNaN(busLine)) {
            all.push({
                busLine, offset: i
            });
        }
    }
    const first = all.shift();
    let skip = first.busLine;
    let res = 0;
    for(let i = 0; i < all.length; ++i) {
        let shouldContinue = true;
        while (shouldContinue) {
            if ((res + all[i].offset) % all[i].busLine === 0) {
                skip *= all[i].busLine;
                shouldContinue = false;
            }
            if(shouldContinue) {
                res += skip;
            }
        }
    }
    console.log(res);
};