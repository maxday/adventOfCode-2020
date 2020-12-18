const fs = require('fs');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input18.txt'),
});

let all = [];

readInterface.on('line', function(line) {
    all.push('(' + line.replace(/ /g,'') + ')'); // add extra parenthesis to avoid dealing with no parenthesis
});

readInterface.on('close', _ => {
    checkStar1();
    checkStar2();
});


const loop = (computeMethod) => {
    let sum = 0;
    for(let i = 0; i < all.length; ++i) {
        let current = all[i];
        let lastOpen;
        let result;
        while(true) {
            lastOpen = findLastIdx(current);
            if(lastOpen === -1)  {
                sum += result;
                break;
            }
            const close = findFirstIdx(current.substr(lastOpen,current.length - lastOpen));
            const firstGroup = current.substr(lastOpen, close);
            result = computeMethod(firstGroup);
            current = current.replace(firstGroup, result);
        }
    }
    console.log(sum);
}


const checkStar1 = () => {
    loop(compute);
}

const checkStar2 = () => {
    loop(compute2);
}

const findLastIdx = (str) => {
    let idx = -1;
    for(let i = 0; i < str.length; ++i) {
        if(str[i] === '(') {
            idx = i;
        }
    }
    return idx;
}

const findFirstIdx = (str) => {
    for(let i = 0; i < str.length; ++i) {
        if(str[i] === ')') {
            return i + 1;
        }
    }
    return -1;
}

const compute = (str) => {
    const toCompute = str.replace('(', '').replace(')', '');
    let lastSign = '+';
    let result = 0;
    let number = '';
    for(let i = 0; i < toCompute.length; ++i) {
        if(toCompute[i] === '+') {
            if(lastSign === '+') {
                result += parseInt(number, 10);
            }
            if(lastSign === '*') {
                result *= parseInt(number, 10);
            }
            lastSign = '+';
            number = '';
        } else if(toCompute[i] === '*') {
            if(lastSign === '+') {
                result += parseInt(number, 10);
            }
            if(lastSign === '*') {
                result *= parseInt(number, 10);
            }
            lastSign = '*';
            number = '';
        } else {
            number += toCompute[i];
        }
    }
    if(lastSign === '+') {
        result += parseInt(number, 10);
    }
    if(lastSign === '*') {
        result *= parseInt(number, 10);
    }
    return result;
}


const compute2 = (str) => {
    const toCompute = str.replace('(', '').replace(')', '');
    const array = toCompute.split('*').map(e => compute(e));
    let res = compute(array.join('*'));
    return res;
}