const fs = require('fs');
const readline = require('readline');
const readInterface = readline.createInterface({
    input: fs.createReadStream('./input07.txt'),
});

const lines = [];

readInterface.on('line', function(line) {
    lines.push(line);
});

readInterface.on('close', _ => {
    const searchMap = buildSearchMap();
    checkStar1(searchMap);
    checkStar2(searchMap);
});

const checkStar1 = (searchMap) => {
    console.log([...searchMap.keys()].filter(e => {
        const res = [];
        list(searchMap, e, res);
        return res.includes('shiny gold');
    }).length);
}

const checkStar2 = (searchMap) => {
    console.log(compute(searchMap, 'shiny gold'));
}

const list = (searchMap, bagName, res) => {
    const colors = [...searchMap.get(bagName).map(e => e.bagName)];
    for(let i = 0; i < colors.length; ++i) {
        if(!res.includes(colors[i])) {
            res.push(...list(searchMap, colors[i], res))
            res.push(colors[i]);
        }
    }
    return colors;
};

const getItem = (line) => {
    let reg = /(.*)contain(.*)\./;
    let groups = line.match(reg);
    const leftColor = groups[1].replace('bags', '').replace('bag', '').trim();
    let right = groups[2];
    right = right.split(',');
    right = right.map(e => e.replace('bags', '').replace('bag', '').trim());
    const rightArray = [];
    for(let i = 0; i < right.length; ++i) {
        const search = right[i].match(/[0-9]/);
        if(search) {
            const qty = parseInt(search[0], 10);
            rightArray.push({bagName: right[i].replace(qty, '').trim(), qty});
        }
    }
    return { leftColor, rightArray };
}

const buildSearchMap = () => {
    const searchMap = new Map();
    for(let i = 0; i < lines.length; ++i) {
        const item = getItem(lines[i]);
        searchMap.set(item.leftColor, item.rightArray);
    }
   return searchMap;
}

const compute = (searchMap, bagName) => {
    let total = 0;
    let entry = searchMap.get(bagName);
    for(let i = 0; i < entry.length; ++i) {
        total += entry[i].qty * compute(searchMap, entry[i].bagName) + entry[i].qty;
    }
    return total;
};