const fs = require('fs');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input03.txt'),
});
const lines = [];
readInterface.on('line', function(line) {
   lines.push(line);
});

const computeSlope = (x, y) => {
    let nbTrees = 0;
    let currentXIndex = x;
    for(let i=y; i<lines.length; i = i + y) {
        if(lines[i][currentXIndex] === '#') {
            nbTrees++;
        }
        currentXIndex = (currentXIndex + x) % lines[i].length;
    }
    return nbTrees;
}

readInterface.on('close', _ => {
    //first star
    console.log(computeSlope(3, 1));
    //second star
    console.log(computeSlope(1, 1) * computeSlope(3, 1) * computeSlope(5, 1) * computeSlope(7, 1) * computeSlope(1, 2));
});