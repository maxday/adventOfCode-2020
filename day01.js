/* very small input (200 lines) -> O(n3) no issues with triple nested loop
for higher inputs, I would use another solution such as : 
2020 - first number => is the result in the list ?
loop
*/

const fs = require('fs');
const readline = require('readline');
const lines = [];
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input1.txt'),
    console: false
});

readInterface.on('line', function(line) {
    lines.push(parseInt(line, 10));
});

const computeFirstStart = () => {
    for(let i = 0; i < lines.length; ++i) {
        for(let j = i + 1; j < lines.length; ++j) {
            if(lines[i] + lines[j] === 2020) {
                return lines[i] * lines[j];
            }
        }
    }
}

const computeSecondStar = () => {
    for(let i = 0; i < lines.length; ++i) {
        for(let j = i + 1; j < lines.length; ++j) {
            for(let k = j + 1; k < lines.length; ++k) {
                if(lines[i] + lines[j] + lines[k] === 2020) {
                    return lines[i] * lines[j] * lines[k];
                }
            }
        }
    }
}

readInterface.on('close', _ => {
    console.log(computeFirstStart());
    console.log(computeSecondStar());
});

