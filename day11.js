const { count } = require('console');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const fs = require('fs');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input11.txt'),
});

let lines = [];

readInterface.on('line', function(line) {
    let row = [];
    for(let i = 0; i < line.length; ++i) {
        row.push(line[i]);
    }
    lines.push(row);
});

readInterface.on('close', _ => {
    checkStar1();
    checkStar2();
});

const deepCopy = (array) => {
    return JSON.parse(JSON.stringify(array));
}

const countSeat = (array) => {
    let nb = 0;
    for(let i = 0; i < array.length; ++i) {
        for(let j = 0; j < array[i].length; ++j) {
            if(array[i][j] === '#') {
                nb++;
            }
        }
    }
    return nb;
}

const checkStar1 = () => {
    const arrayCopy = deepCopy(lines);
    for(let i = 0; i < lines.length; ++i) {
        for(let j = 0; j < lines[i].length; ++j) {
            getNbOccupied(i, j, arrayCopy);
        }
    }
    let hasChange = true;
    while(hasChange) {
        let nb = 0;
        lines = deepCopy(arrayCopy);
        for(let i = 0; i < lines.length; ++i) {
            for(let j = 0; j < lines[i].length; ++j) {
                nb += getNbOccupied(i,j, arrayCopy);
            }
        }
        hasChange = JSON.stringify(lines) !== JSON.stringify(arrayCopy)
    }
    console.log(countSeat(arrayCopy));
}

const checkStar2 = () => {
    const arrayCopy = deepCopy(lines);
    for(let i = 0; i < lines.length; ++i) {
        for(let j = 0; j < lines[i].length; ++j) {
            getNbOccupied2(i, j, arrayCopy);
        }
    }
    let hasChange = true;
    while(hasChange) {
        lines = deepCopy(arrayCopy);
        for(let i = 0; i < lines.length; ++i) {
            for(let j = 0; j < lines[i].length; ++j) {
                getNbOccupied2(i,j, arrayCopy);
            }
        }
        hasChange = JSON.stringify(lines) !== JSON.stringify(arrayCopy)
    }
    console.log(countSeat(arrayCopy));
}

const check = (x,y) => {
    try {
        return (lines[x][y] === '#') ? 1 : 0;
    } catch {
        return 0;
    }
}

const getNbOccupied = (x, y, newArray) => {
    const top = check(x-1, y);
    const topRight = check(x-1, y+1);
    const right = check(x, y+1);
    const bottomRight = check(x+1, y+1);
    const bottom = check(x+1, y);
    const bottomLeft = check(x+1, y-1);
    const left = check(x, y-1);
    const topLeft = check(x-1, y-1);
    if(lines[x][y] === 'L') {
        if(top + topRight + right + bottomRight + bottom + bottomLeft + left + topLeft === 0) {
            newArray[x][y] = '#';
        }
    } 
    else if(lines[x][y] === '#') {
        if(top + topRight + right + bottomRight + bottom + bottomLeft + left + topLeft >= 4) {
            newArray[x][y] = 'L';
        }
    } 
}


const checkSeat = (x,y) => {
    try {
        if(lines[x][y] === '.') {
            return 0;
        }
        if(lines[x][y] === '#') {
            return 'occ';
        }
        if(lines[x][y] === 'L') {
            return 'free';
        }
    } catch {
        throw new Error();
    }
}

const searchAtSight = (x, y, offsetX, offsetY) => {
    let i = 0;
    let pos = 0
    do {
        try {
            pos = checkSeat(x + offsetX, y + offsetY);
            x = x + offsetX;
            y = y + offsetY;
        } catch {
            return 0;
        }
        
    } while(pos === 0);
    return pos;
}

const getNbOccupied2 = (x, y, newArray) => {
    const top = searchAtSight(x,y, -1, 0) === 'occ' ? 1 : 0 ;
    const topRight = searchAtSight(x,y, -1, 1) === 'occ' ? 1 : 0 ;
    const right = searchAtSight(x,y, 0, 1) === 'occ' ? 1 : 0 ;
    const bottomRight = searchAtSight(x,y, 1, 1) === 'occ' ? 1 : 0 ;
    const bottom = searchAtSight(x, y, 1, 0) === 'occ' ? 1 : 0 ;
    const bottomLeft = searchAtSight(x, y, 1, -1) === 'occ' ? 1 : 0 ;
    const left = searchAtSight(x, y, 0, -1) === 'occ' ? 1 : 0 ;
    const topLeft = searchAtSight(x, y, -1, -1) === 'occ' ? 1 : 0 ;
    if(lines[x][y] === 'L') {
        if(top + topRight + right + bottomRight + bottom + bottomLeft + left + topLeft === 0) {
            newArray[x][y] = '#';
        }
    } 
    else if(lines[x][y] === '#') {
        if(top + topRight + right + bottomRight + bottom + bottomLeft + left + topLeft >= 5) {
            newArray[x][y] = 'L';
        }
    } 
}