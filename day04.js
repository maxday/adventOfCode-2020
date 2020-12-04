const fs = require('fs');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input04.txt'),
});
const lines = [];
let nbValid = 0;
let currentLine = '';
readInterface.on('line', function(line) {
   if(line === '') {
       lines.push(currentLine);
       currentLine = '';
   } else {
       currentLine = currentLine + ' ' + line;
   }
});

readInterface.on('close', _ => {
    lines.push(currentLine);
    check(false);
    console.log(nbValid);
    nbValid = 0;
    check(true);
    console.log(nbValid);
});

const check = (moreCheck) => {
    for(let i=0; i<lines.length; ++i) {
        if(
            (lines[i].indexOf('byr:') !== -1) &&
            (lines[i].indexOf('iyr:') !== -1) &&
            (lines[i].indexOf('eyr:') !== -1) &&
            (lines[i].indexOf('hgt:') !== -1) &&
            (lines[i].indexOf('hcl:') !== -1) &&
            (lines[i].indexOf('ecl:') !== -1) &&
            (lines[i].indexOf('pid:') !== -1)
        ) {
            if(!moreCheck) {
                nbValid++;
            }
            else if (
                checkByr(lines[i]) &&
                checkIyr(lines[i]) &&
                checkEyr(lines[i]) &&
                (checkHgtCm(lines[i]) || checkHgtIn(lines[i])) &&
                checkHcl(lines[i]) &&
                checkEcl(lines[i]) &&
                checkPid(lines[i]) &&
                moreCheck
            ) {
                nbValid++;
            }
        }
    }
}

const checkByr = (line) => {
    const regex = /.*byr:([0-9]{4}).*/
    try {
        let res = line.match(regex)[1];
        return (parseInt(res, 10) >= 1920) && (parseInt(res, 10) <= 2002);
    } catch {
        return false;
    }
}

const checkIyr = (line) => {
    try {
        const regex = /.*iyr:([0-9]{4}).*/
        let res = line.match(regex)[1];
        return (parseInt(res, 10) >= 2010) && (parseInt(res, 10) <= 2020)
    } catch {
        return false;
    }
}

const checkEyr = (line) => {
    try {
        const regex = /.*eyr:([0-9]{4}).*/
        let res = line.match(regex)[1];
        return (parseInt(res, 10) >= 2020) && (parseInt(res, 10) <= 2030)
    } catch {
        return false;
    }
}

const checkHgtCm = (line) => {
    const regex = /.*hgt:([0-9]+)cm.*/
    try {
        let res = line.match(regex)[1];
        return (parseInt(res, 10) >= 150) && (parseInt(res, 10) <= 193);
    } catch {
        return false;
    }
}

const checkHgtIn = (line) => {
    const regex = /.*hgt:([0-9]+)in.*/
    try {
        let res = line.match(regex)[1];
        return (parseInt(res, 10) >= 59) && (parseInt(res, 10) <= 76)
    } catch {
        return false;
    }
}

const checkHcl = (line) => {
    const regex = /.*hcl:#([0-9a-f]{6}).*/
    return regex.test(line);
}

const checkEcl = (line) => {
    const regex = /.*ecl:(amb|blu|brn|gry|grn|hzl|oth).*/
    return regex.test(line);
}

const checkPid = (line) => {
    const regex = /.*pid:([0-9]+).*/
    try {
        let res = line.match(regex)[1];
        return res.length === 9 && regex.test(line)
    } catch {
        return false;
    }
}

