const { triggerAsyncId } = require('async_hooks');
const fs = require('fs');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input08.txt'),
});

const originalLines = [];
let acc = 0;

readInterface.on('line', function(line) {
    originalLines.push({line, seen : false});
});

readInterface.on('close', _ => {
    checkStar1();
    checkStar2();
});

const checkStar1 = () => {
    acc = 0;
    compute(JSON.parse(JSON.stringify(originalLines)));
    console.log(acc);
}

const checkStar2 = () => {
    for(let i = 0; i < originalLines.length; ++i) {
        acc = 0;
        const res = compute(JSON.parse(JSON.stringify(originalLines)), i, true);
        if(res === originalLines.length - 1) {
            console.log(acc);
            break;
        }
    }
    for(let i = 0; i < originalLines.length; ++i) {
        acc = 0;
        const res = compute(JSON.parse(JSON.stringify(originalLines)), i, false);
        if(res === originalLines.length - 1) {
            console.log(acc);
            break;
        }
    }
}

const compute = (lines, idx, nopToJmp) => {
    if(idx) {
        const from = nopToJmp ? 'nop' : 'jmp';
        const to = nopToJmp ? 'jmp' : 'nop';
        if(lines[idx].line.startsWith(from)) {
            lines[idx].line = lines[idx].line.replace(from, to);
        } else {
            return -1;
        }
    }
    let i = 0;
    let shouldContinue = true;
    while(shouldContinue) {
        if(i === lines.length - 1) {
            return i;
        }
        if(lines[i].seen) {
            shouldContinue = false;
        } else {
            lines[i].seen = true;
            if(lines[i].line.startsWith('nop')) {
                i = i + 1;
            }
            else if(lines[i].line.startsWith('acc')) {
                if(lines[i].line.indexOf('+') !== -1) {
                    const nb = lines[i].line.split('+')[1];
                    acc+= parseInt(nb, 10);
                } else {
                    const nb = lines[i].line.split('-')[1];
                    acc-= parseInt(nb, 10);
                }
                i = i + 1;
            }
            else if(lines[i].line.startsWith('jmp')) {
                if(lines[i].line.indexOf('+') !== -1) {
                    const nb = lines[i].line.split('+')[1];
                    i = i + parseInt(nb, 10);
                } else {
                    const nb = lines[i].line.split('-')[1];
                    i = i - parseInt(nb, 10);
                }
            }
        }
    }
}
