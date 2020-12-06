const fs = require('fs');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input06.txt'),
});

const lines = [];

readInterface.on('line', function(line) {
    lines.push(line);
});

readInterface.on('close', _ => {
    check();
    console.log(lines);
});

const check = () => {
    for(let i = 0; i < lines.length; ++i) {
    }
}