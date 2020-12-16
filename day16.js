const fs = require('fs');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input16.txt'),
});

let tickets = [];
let masks = [];
let toSum = [];
let ticketToRemove = [];
let myTicket;
let nbDeparture = 0;

let current = 0;
readInterface.on('line', function(line) {
    if(line === '') {
        current++;
    } else {
        if(current === 0) {
            const regex = /.*: ([0-9]+)\-([0-9]+) or ([0-9]+)\-([0-9]+)/
            const matches = line.match(regex);
            const minA = parseInt(matches[1]) - 1;
            const maxA = parseInt(matches[2]) - 1;
            const minB = parseInt(matches[3]) - 1;
            const maxB = parseInt(matches[4]) - 1;
            const newMask = new Array(maxB + 1);
            for(let i = 0; i < newMask.length; ++i) {
                newMask[i] = false;
            }
            for(let i = minA; i <= maxA; ++i) {
                newMask[i] = true;
            }
            for(let i = minB; i <= maxB; ++i) {
                newMask[i] = true;
            }
            if(line.startsWith('departure')) {
                nbDeparture++;
            }
            masks.push(newMask);
        }
        else if(current === 1) {
            if(line.indexOf(',') !== -1) {
                myTicket = line.split(',').map(e => parseInt(e, 10));
            }
        } else {
            if(line.indexOf(',') !== -1) {
                tickets.push(line.split(',').map(e => parseInt(e, 10)));
            }
        }
    }
});

readInterface.on('close', _ => {
    checkStar1();
    checkStar2();
});

const checkStar1 = () => {
    for(let i = 0; i < tickets.length; ++i) {
        checkTicket(tickets[i]);
    }
    let sum = 0;
    for(let i = 0; i < toSum.length; ++i) {
        sum += toSum[i];
    }
    console.log(sum);
}

const checkTicket = (ticket) => {
    for(let i = 0; i < ticket.length; ++i) {
        let nbOk = 0;
        for(let j = 0; j < masks.length; ++j) {
            if(masks[j][ticket[i]-1]) {
                nbOk++;
            }
        }
        if(nbOk === 0) {
            toSum.push(ticket[i]);
            ticketToRemove.push(ticket);
        }
    }
} 

const checkStar2 = () => {
    const validTickets = [...tickets].filter(e => !ticketToRemove.includes(e));
    const values = [];
    for(let i = 0; i < validTickets[0].length; ++i) {
        const innerValues = [];
        for(let j = 0; j < validTickets.length; ++j) {
            innerValues.push(validTickets[j][i]);
        }
        values.push(innerValues);
    }
    
    let resMap = new Map();
    for(let i = 0; i < masks.length; ++i) {
        resMap.set(i, []);
    }

    for(let i = 0; i < values.length; ++i) {
        for(let j = 0; j < masks.length; ++j) {
            let nbValid = 0;
            for(k = 0; k < values[i].length; ++k) {
                if(masks[j][values[i][k]-1]) {
                    nbValid++;
                }
            }
            if(nbValid === values[i].length) { // perfect match
                let array = resMap.get(j);
                array.push(i);
                resMap.set(j, array);
            }
        }
    }
    const finalSolution = {};
    while(Object.keys(finalSolution).length !== masks.length) {
        findOnlyOnePossible(resMap, finalSolution); // remove step by step the only possibility
    }

    let ticketValue = 1;
    for(let i = 0; i < nbDeparture; ++i) {
        ticketValue *= myTicket[finalSolution[i]];
    }
    console.log(ticketValue);
};

const findOnlyOnePossible = (map, solution) => {
    map.forEach((value, key) => {
        if(value.length === 1) {
            solution[key] = value[0];
            toRemove = value[0];
        }
    });
    Object.keys(solution).forEach(key => {
        map.delete(parseInt(key, 10));
        const allKeys = Array.from(map.keys());
        allKeys.forEach(innerkey => {
            const array = map.get(parseInt(innerkey, 10));
            if (array.indexOf(toRemove) !== -1) {
                array.splice(array.indexOf(toRemove), 1);
                map.set(innerkey, array);
            }
        })
    }); 
}