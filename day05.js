const fs = require('fs');
const readline = require('readline');
const { checkServerIdentity } = require('tls');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input05.txt'),
});

const lines = [];
const all = [];
let missingSeats = [];

readInterface.on('line', function(line) {
    lines.push(line);
});

readInterface.on('close', _ => {
    check();
    console.log(Math.max(...all));
    all.sort(function(a, b) {
        return a - b;
    });
    let previous = all[0];
    for(let i = 1; i < all.length; ++i) {
        if(all[i] - previous !== 1) {
            missingSeats.push(all[i] - 1);
        }
        previous = all[i];
    }
    missingSeats = [...new Set(missingSeats)];
    for(let i = 0; i < missingSeats.length; ++i) {
        if(all.includes(missingSeats[i]-1) && all.includes(missingSeats[i]+1)) {
            console.log(missingSeats[i]);
        }
    }
});

const check = () => {
    for(let i = 0; i < lines.length; ++i) {
        let min = 0;
        let max = 127;
        for(let j = 0; j < 7; ++j) {
            const letter = lines[i][j];
            if(letter === 'F') {
                max =  min + Math.floor(((max) - min) / 2)
            } else {
                min =  min + Math.ceil((max - min) / 2)
            }
        }
        let row = min;
        min = 0;
        max = 7;
        for(let j = 7; j < 10; ++j) {
            const letter = lines[i][j];
            if(letter === 'L') {
                max =  min + Math.floor(((max) - min) / 2)
            } else {
                min =  min + Math.ceil((max - min) / 2)
            }
        }
        all.push(row * 8 + min, 10);
    }
}