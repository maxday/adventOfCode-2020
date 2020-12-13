const fs = require('fs');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input12.txt'),
});

let lines = [];
let direction = 'E';
let northPos = 0;
let eastPos = 0;

let waypointNorthPos = 1;
let waypointEastPos = 10;

let boatNorthPos = 0;
let boatEastPos = 0;

readInterface.on('line', function(line) {
    lines.push({
        command : line[0],
        size : parseInt(line.substr(1, line.length -1), 10)
    });
});

readInterface.on('close', _ => {
    checkStar1();
    checkStar2();
});

const checkStar1 = () => {
    for(let i = 0; i < lines.length; ++i) {
        if(lines[i].command === 'F') {
            if(direction === 'N') {
                northPos += lines[i].size;
            } else if (direction === 'S') {
                northPos -= lines[i].size;
            } else if (direction === 'E') {
                eastPos += lines[i].size;
            } else {
                eastPos -= lines[i].size;
            }
        }
        if(lines[i].command === 'N') {
            northPos += lines[i].size;
        }
        if(lines[i].command === 'S') {
            northPos -= lines[i].size;
        }
        if(lines[i].command === 'E') {
            eastPos += lines[i].size;
        }
        if(lines[i].command === 'W') {
            eastPos -= lines[i].size;
        }
        if(lines[i].command === 'R') {
            const nbRotation = lines[i].size / 90;
            for(let r = 0; r < nbRotation; ++r) {
                turnRight();
            }
        }
        if(lines[i].command === 'L') {
            const nbRotation = lines[i].size / 90;
            for(let r = 0; r < nbRotation; ++r) {
                turnLeft();
            }
        }
    }
    console.log(Math.abs(northPos) + Math.abs(eastPos));
}

const checkStar2 = () => {
    for(let i = 0; i < lines.length; ++i) {
        if(lines[i].command === 'F') {
            boatNorthPos += lines[i].size * waypointNorthPos;
            boatEastPos += lines[i].size * waypointEastPos;
        }
        if(lines[i].command === 'N') {
            waypointNorthPos += lines[i].size;
        }
        if(lines[i].command === 'S') {
            waypointNorthPos -= lines[i].size;
        }
        if(lines[i].command === 'E') {
            waypointEastPos += lines[i].size;
        }
        if(lines[i].command === 'W') {
            waypointEastPos -= lines[i].size;
        }
        if(lines[i].command === 'R') {
            const nbRotation = lines[i].size / 90;
            for(let r = 0; r < nbRotation; ++r) {
                turnWaypointRight();
            }
        }
        if(lines[i].command === 'L') {
            const nbRotation = lines[i].size / 90;
            for(let r = 0; r < nbRotation; ++r) {
                turnWaypointLeft();
            }
        }
    }
    console.log(Math.abs(boatNorthPos) + Math.abs(boatEastPos));
}

const turnLeft = () => {
    if(direction === 'N') {
        direction = 'W';
    } else if(direction === 'W') {
        direction = 'S';
    } else if(direction === 'S') {
        direction = 'E';
    } else {
        direction = 'N'
    }
}

const turnRight = () => {
    if(direction === 'N') {
        direction = 'E';
    } else if(direction === 'E') {
        direction = 'S';
    } else if(direction === 'S') {
        direction = 'W';
    } else {
        direction = 'N'
    }
}

const turnWaypointRight = () => {
    const tmp = waypointEastPos;
    waypointEastPos = waypointNorthPos;
    waypointNorthPos = -tmp
}

const turnWaypointLeft = () => {
    const tmp = waypointEastPos;
    waypointEastPos = -waypointNorthPos;
    waypointNorthPos = tmp
}
