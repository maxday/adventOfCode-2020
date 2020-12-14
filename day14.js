const fs = require('fs');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input14.txt'),
});

let resMap;
let maskArray = [];

let lastMask;
let lastArray;
readInterface.on('line', function(line) {
    if(line.startsWith('mask')) {
        if(lastMask) {
            maskArray.push({mask: lastMask, array: lastArray});
        }
        lastMask = line.split('=')[1].trim();
        lastArray = [];
    } else {
        const idx = parseInt(line.match(/.*\[([0-9]+)\].*/)[1], 10);
        const nb = line.split('=')[1].trim();
        lastArray.push({idx, nb});
    }
});

readInterface.on('close', _ => {
    maskArray.push({mask: lastMask, array: lastArray});
    checkStar1();
    checkStar2();
});


const compute = (mask, array) => {
    for(let i = 0; i < array.length; ++i) {
        const binary = toBinary(array[i].nb);
        const length = (binary+"").length;
        const padding = 36 - length;
        let full = "";
        for(let j = 0; j < padding; ++j) {
            full= `${full}0`;
        }
        full= `${full}${binary}`;
        let res = '';
        for(let j = 0; j < 36; ++j) {
            if(mask[j] === 'X') {
                res= `${res}${full[j]}`;
            } else {
                res= `${res}${mask[j]}`;
            }
        }
        resMap.set(array[i].idx, parseInt(res, 2))
    }
}

const checkStar1 = () => {
    resMap = new Map();
    for (let i = 0; i < maskArray.length; ++i) {
        compute(maskArray[i].mask, maskArray[i].array);
    }
    let sum = 0
    for (const [_ , value] of resMap.entries()) {
        sum += value;
      }
    console.log(sum);
}

const toBinary = (nb) => {
    return (nb >>> 0).toString(2);
}

const compute2 = (mask, array) => {
    for(let i = 0; i < array.length; ++i) {
        const binary = toBinary(array[i].idx);
        const length = (binary+"").length;
        const padding = 36 - length;
        let full = "";
        for(let j = 0; j < padding; ++j) {
            full= `${full}0`;
        }
        full= `${full}${binary}`;
        let res = '';
        for(let j = 0; j < 36; ++j) {
            if(mask[j] === 'X') {
                res= `${res}X`;
            } else {
                if(full[j] === mask[j]) {
                    res= `${res}${full[j]}`;
                } else {
                    res= `${res}1`;
                }
                
            }
        }
        const permutation = computePermutation(res, 0);
        for(let j = 0; j < permutation.length; ++j) {
            const num = parseInt(permutation[j], 2);
            resMap.set(num, parseInt(array[i].nb, 10));
        }
    }
}

const checkStar2 = () => {
    resMap = new Map();
    for (let i = 0; i < maskArray.length; ++i) {
        compute2(maskArray[i].mask, maskArray[i].array);
    }
    let sum = 0
    for (const [_ , value] of resMap.entries()) {
        sum += value;
      }
    console.log(sum);
};

const computePermutation = (number, idx) => {
    if(idx >= number.length) {
      return [number];
    }
    if(number[idx] === 'X') {
      const before = number.substring(0, idx);
      const after = number.substring(idx + 1);
      const permutations = [`${before}0${after}`,`${before}1${after}`,
      ];
      return permutations.flatMap(singlePerm => [...computePermutation(singlePerm, idx + 1)]);
    }
    return computePermutation(number, idx + 1);
}