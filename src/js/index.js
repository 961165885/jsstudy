const container = document.querySelector('#root');

const mainArea = document.createElement('div');
mainArea.setAttribute('id', 'main-area');

const nextArea = document.createElement('div');
nextArea.setAttribute('id', 'prev-area');

const width = 10;
const height = 15;

const grids = [];

grids.timer = null;
grids.item = null;

for (let x = 0; x < height; x++) {
    grids[x] = [];
    for (let y = 0; y < width; y++) {
        const temp = document.createElement('div');
        mainArea.appendChild(temp);

        temp.classList.add(`grid-item`);
        temp.classList.add(`grid-item-row-${x}`);
        temp.classList.add(`grid-item-column-${y}`);

        grids[x][y] = {
            el: temp,
            isFilled: false,
            addClass: function(cls) {
                temp.classList.add(cls);
            },
            removeClass: function(cls) {
                temp.classList.remove(cls);
            }
        };
    }
}

const nextGrid = [];
nextGrid.item = null;

for (let x = 0; x < 4; x++) {
    nextGrid[x] = [];
    for (let y = 0; y < 4; y++) {
        const temp = document.createElement('div');
        nextArea.appendChild(temp);

        temp.classList.add(`grid-item`);
        temp.classList.add(`grid-item-row-${x}`);
        temp.classList.add(`grid-item-column-${y}`);

        nextGrid[x][y] = {
            el: temp,
            addClass: function(cls) {
                temp.classList.add(cls);
            },
            removeClass: function(cls) {
                temp.classList.remove(cls);
            }
        };
    }
}


nextGrid.addItem = function(item) {
    if (this.item) {
        this.item.forEach(pos => {
            this[pos[1]][pos[0]].removeClass('active');
        });
    }

    this.item = item;

    this.showItem();
}

nextGrid.showItem = function() {
    this.item.forEach(pos => {
        this[pos[1]][pos[0]].addClass('active');
    });
}

const itemPool = [
    [
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [0, 3],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [3, 0],
        ],
    ],
    [
        [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1],
        ],
    ],
    [
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [1, 2],
        ],
        [
            [1, 0],
            [2, 0],
            [0, 1],
            [1, 1],
        ],
    ],
    [
        [
            [0, 0],
            [1, 0],
            [1, 1],
            [1, 2],
        ],
        [
            [2, 0],
            [0, 1],
            [1, 1],
            [2, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [0, 2],
            [1, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [0, 1],
        ],
    ],
    [
        [
            [1, 0],
            [0, 1],
            [1, 1],
            [2, 1],
        ],
        [
            [0, 0],
            [0, 1],
            [1, 1],
            [0, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [1, 1],
        ],
        [
            [0, 1],
            [1, 0],
            [1, 1],
            [1, 2],
        ],
    ]
];

grids.createItem = function() {
    let item;
    if (nextGrid.item) {
        item = nextGrid.item;
    } else {
        item = generateItem();
    }

    const nextItem = generateItem();
    nextGrid.addItem(nextItem);

    setItemPos(item);

    this.addItem(item);
}

grids.addItem = function(item) {
    this.item = item;

    this.renderItem();
}
grids.showItem = function() {
    this.item.forEach(pos => {
        this[pos[1]][pos[0]].addClass('active');
    });
};

grids.onItemSet = function() {
    if (this.timer) {
        clearInterval(this.timer);
    }

    this.item.forEach(pos => {
        this[pos[1]][pos[0]].isFilled = true;
    });

    this.createItem();
}

grids.calItemDown = function(item) {
    let isSet = false;

    let tempItem = [];
    item.forEach(pos => {
        const newPos = [pos[0], pos[1] + 1];

        if (pos[1] == 14) {
            isSet = true;
        } else if (this[newPos[1]][newPos[0]].isFilled) {
            isSet = true;
        }

        tempItem.push(newPos);
    });

    if (isSet) {
        return false;
    }

    return tempItem;
}

grids.calItemLeft = function(item) {

}

grids.calItemRight = function(item) {

}

grids.renderItem = function() {
    this.item.forEach(pos => {
        if (pos[1] == 14) {
            this.onItemSet();
        }
    });

    this.showItem();

    this.timer = setInterval(() => {
        let maxY = 0;
        this.item.forEach(pos => {
            if (pos[1] > maxY) {
                maxY = pos[1];
            }
        });
        if (maxY == 14) {
            this.onItemSet();
            return;
        }

        this.item.forEach(pos => {
            this[pos[1]][pos[0]].removeClass('active');
        });

        const tempItem = this.calItemDown(this.item);

        if (!tempItem) {
            this.showItem();
            this.onItemSet();

            return;
        }

        this.item = tempItem;

        this.showItem();
    }, 500);
};
grids.moveLeft = function() {
    const item = this.item;

    let minX = 9;
    item.forEach(pos => {
        if (pos[0] < minX) {
            minX = pos[0];
        }
    });
    if (minX == 0) {
        return;
    }

    item.forEach(pos => {
        this[pos[1]][pos[0]].removeClass('active');
    });

    item.forEach(pos => {
        pos[0]--;
    });

    this.showItem();
}
grids.moveRight = function() {
    const item = this.item;

    let maxX = 0;
    item.forEach(pos => {
        if (pos[0] > maxX) {
            maxX = pos[0];
        }
    });
    if (maxX == 9) {
        return;
    }

    item.forEach(pos => {
        this[pos[1]][pos[0]].removeClass('active');
    });

    item.forEach(pos => {
        pos[0]++;
    });

    this.showItem();
}
grids.moveDown = function() {
    let maxY = 0;
    this.item.forEach(pos => {
        if (pos[1] > maxY) {
            maxY = pos[1];
        }
    });
    if (maxY == 14) {
        return;
    }

    this.item.forEach(pos => {
        this[pos[1]][pos[0]].removeClass('active');
    });

    let tempItem = this.item;
    let temp;
    while (temp = this.calItemDown(tempItem)) {
        tempItem = temp;
    }

    this.item = tempItem;

    this.showItem();
}

function setItemPos(item) {
    let random;
    let maxX = 0;

    item.forEach(pos => {
        if (maxX < pos[0]) {
            maxX = pos[0];
        }
    });

    random = parseInt(Math.random()*(9-maxX));

    item.forEach(pos => {
        pos[0] += random;
    });
}
function setItemDirection(itemGroup) {
}
function generateItem() {
    const groupIndex = parseInt(Math.random() * itemPool.length);

    const itemIndex = parseInt(Math.random() * itemPool[groupIndex].length);

    const selected = itemPool[groupIndex][itemIndex];

    const item = [];

    selected.forEach(pos => {
        const temp = [];
        temp[0] = pos[0];
        temp[1] = pos[1];

        item.push(temp);
    });

    return item;
}

grids.createItem();

container.appendChild(mainArea);
container.appendChild(nextArea);

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':

            break;
        case 'ArrowDown':
            grids.moveDown();

            break;
        case 'ArrowLeft':
            grids.moveLeft();
            break;
        case 'ArrowRight':
            grids.moveRight();
            break;

        default:
            break;
    }
})
console.log(grids);
