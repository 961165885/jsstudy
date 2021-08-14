const container = document.querySelector('#root');

const mainArea = document.createElement('div');
mainArea.setAttribute('id', 'main-area');

const width = 10;
const height = 15;

const grids = [];

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
            addClass: function(cls) {
                temp.classList.add(cls);
            },
            removeClass: function(cls) {
                temp.classList.remove(cls);
            }
        };
    }
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
];

grids.addItem = function(item) {
    item.forEach(pos => {
        this[pos[1]][pos[0]].addClass('active');
    });
}

grids.renderItem = function(item) {
    item.forEach(pos => {
        pos[1]++;

        if (pos[1] == 14) {
            clearInterval(timer);
        }
    });

    this.addItem(item);

    let timer = setInterval(() => {
        let maxY = 0;
        item.forEach(pos => {
            if (pos[1] > maxY) {
                maxY = pos[1];
            }
        });
        if (maxY == 14) {
            return;
        }

        item.forEach(pos => {
            this[pos[1]][pos[0]].removeClass('active');
        });

        item.forEach(pos => {
            pos[1]++;

            if (pos[1] == 14) {
                clearInterval(timer);
            }
        });

        this.addItem(item);
    }, 1000);
};
grids.moveLeft = function(item) {
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

    this.addItem(item);
}
grids.moveRight = function(item) {
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

    this.addItem(item);
}
grids.moveDown = function(item) {
    let maxY = 0;
    item.forEach(pos => {
        if (pos[1] > maxY) {
            maxY = pos[1];
        }
    });
    if (maxY == 14) {
        return;
    }

    const dy = 14-maxY;

    item.forEach(pos => {
        this[pos[1]][pos[0]].removeClass('active');
    });

    item.forEach(pos => {
        pos[1]+=dy;
    });

    this.addItem(item);
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
    let random = parseInt(Math.random() * itemGroup.length);

    return itemGroup[random];
}
function generateItem() {
    const itemIndex = parseInt(Math.random()*4);
    const itemGroup = itemPool[itemIndex];

    const item = setItemDirection(itemGroup);
    setItemPos(item);

    return item;
}

const item = generateItem();

grids.renderItem(item);

container.appendChild(mainArea);

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':

            break;
        case 'ArrowDown':
            grids.moveDown(item);

            break;
        case 'ArrowLeft':
            grids.moveLeft(item);
            break;
        case 'ArrowRight':
            grids.moveRight(item);
            break;

        default:
            break;
    }
})
console.log(grids);
