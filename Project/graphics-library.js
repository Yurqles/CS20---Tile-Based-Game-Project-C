//GRAPHICS LIBRARY
//Requires a global cnv and ctx


function initGraphics(initWidth, initHeight) {
    cnv.width = initWidth;
    cnv.height = initHeight;

    //DRAW FUNCTIONS
    ctx.fillTriangle = function(x1, y1, x2, y2, x3, y3) {
        //Draw a filled triangle with verticles
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.fill();
    }

    ctx.strokeTriangle = function(x1, y1, x2, y2, x3, y3) {
        //Draw an outline triangle with verticles
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath()
        ctx.stroke()
    }

    ctx.fillCircle = function(x, y, r) {
        //Draw an filled circle with center (x, y) and radius (r)
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI)
        ctx.fill();
    }

    ctx.strokeCircle = function(x, y, r) {
        //Draw an outlined circle with center (x, y) and radius (r)
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI)
        ctx.stroke();
    }

    ctx.line = function(x1, y1, x2, y2) {
        //Draw a line segment from (x1, y1) to (x2, y2)
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

//Project stuff
//Variables
let player = {
    x: 1,
    y: 1,
    w: 32,
    h: 32,
    col: 7,
    row: 8,
    alive: true,
}

let bat = {
    x: 1,
    y: 1,
    w: 32,
    h: 32,
    col: 8,
    row: 8,
    spriteX: 0,
    spriteY: 0,
}

let slime = []
slime.push({
    x: 1,
    y: 1,
    w: 64,
    h: 64,
    col: 11,
    row: 10,
    spriteX: 0,
    spriteY: 0,
},{
    x: 1,
    y: 1,
    w: 64,
    h: 64,
    col: 8,
    row: 16,
    spriteX: 0,
    spriteY: 0,
})

//Spritesheet 16 x 16
let spriteSheetImg = document.getElementById('sprite-sheet');
let spriteY = 0;
let spriteX = 66;
let bats = document.getElementById('bat');
let slimes = new Image();
slimes.src = 'images/idle.png';
let key = new Image();
key.src = 'images/key.png';
// tileSheet 192 x 256 - 12 x 16
let tilemap = new Image();
tilemap.src = 'images/Tilemap.png';
let chest = new Image();
chest.src = 'images/chest.png';

//Collision detection
function isPathTile(map, x, y, num, i, j) {
    return (map[x][y] === num[i][j]);
}
//For odd cases
function isPathTile2(map, x, y, num) {
    return (map[x][y] === num);
}

//Right - Left - Top - Bottom (in order)
let blocks = [[31, 49, 51, 53, 55, 29, 25, 27, 28],
              [27, 30, 50, 52, 54, 56, 33, 29, 25, 27],
              [26, 27, 49, 50, 53, 54, 25, 29],
              [28, 31, 32, 51, 52, 55, 56, 33, 46, 47, 48, 29]]


function collideRight() {
    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks[i].length; j++) {
            if (isPathTile(map, player.row, player.col , blocks, 0, j)){
                player.col--;
            }
            for (let n = 0; n < slime.length; n++) {
                if (isPathTile(map, slime[n].row, slime[n].col, blocks, 0, j)) {
                    slime[n].col--
                }
            }
        }
    } // The if statement below is because one of the tiles did not look proper
    if (isPathTile2(map, player.row, player.col + 1, 29)) {
        player.col--;
    }
}

function collideLeft() {
    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks[i].length; j++) {
            if (isPathTile(map, player.row, player.col, blocks, 1, j)){
                player.col++;
            }
            for (let n = 0; n < slime.length; n++) {
                if (isPathTile(map, slime[n].row, slime[n].col, blocks, 1, j)) {
                    slime[n].col++
                }
            }
        }
    }
}

function collideTop() {
    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks[i].length; j++) {
            if (isPathTile(map, player.row, player.col, blocks, 2, j)){
                player.row--;
            }
            for (let n = 0; n < slime.length; n++) {
                if (isPathTile(map, slime[n].row, slime[n].col, blocks, 2, j)) {
                    slime[n].row--
                }
            }
        } if (isPathTile2(map, player.row - 1, player.col, 34)) {
            player.row--;
        } if (isPathTile2(map, player.row - 1, player.col, 35)) {
            player.row--;
        } if (isPathTile2(map, player.row - 1, player.col, 36)) {
            player.row--;
        }
    }
}

function collideBottom() {
    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks[i].length; j++) {
            if (isPathTile(map, player.row, player.col, blocks, 3, j)){
                player.row++;
            }
            for (let n = 0; n < slime.length; n++) {
                if (isPathTile(map, slime[n].row, slime[n].col, blocks, 3, j)) {
                    slime[n].row++
                }
            }
        }
    }
}
function drawSlimes(n) {
    if (stage == 2 || stage == 3) {
        ctx.drawImage(slimes, slime[n].spriteX, slime[n].spriteY, 32, 32, slime[n].x, slime[n].y, slime[n].w, slime[n].h);
    }
}

function slimeMove() {
    for (let n = 0; n < slime.length; n++) {
        //Vertical
        if (player.row < slime[n].row) {
            slime[n].row -= Math.randomInt(0, 2);
        } else if (player.row > slime[n].row) {
            slime[n].row += Math.randomInt(0, 2);
        }
        //Horizontal
        if (player.col < slime[n].col) {
            slime[n].col -= Math.randomInt(0, 2);
        } else if (player.col > slime[n].col) {
            slime[n].col += Math.randomInt(0, 2);
        }
    }
}

//Very basic bat pathing system
function batMove() {
    //Vertical
    if (player.row < bat.row) {
        bat.row -= Math.randomInt(0, 2);
    } else if (player.row > bat.row) {
        bat.row += Math.randomInt(0, 2);
    }
    //Horizontal
    if (player.col < bat.col) {
        bat.col -= Math.randomInt(0, 2);
    } else if (player.col > bat.col) {
        bat.col += Math.randomInt(0, 2);
    }
}

setInterval(animateBat, 160);
function animateBat() {
    bat.spriteY = 0;
    bat.spriteX += 16;
    if (bat.spriteX >= 64) {
        bat.spriteX = 0;
    }
}

setInterval(animateSlime, 440);
function animateSlime() {
    for (let n = 0; n < slime.length; n++) {
        slime[n].y = 0;
        slime[n].spriteX += 32;
        if (slime[n].spriteX >= 33) {
            slime[n].spriteX = 0;
        } 
    }
}


function levels() {
    if (stage == 1) {
        if (player.row == 16) {
            if (player.col == 7 || player.col == 8) {
                stage = 2;
                nextLevel();
                player.col = 7;
                player.row = 1;
            }
        }
        if (player.row == 8) {
            if (player.col == 16 || player.col == 16) {
                stage = 3; 
                    nextLevel();
                    player.col = 1;
                    player.row = 8;
            }
        }
        if (player.row == 8) {
            if (player.col == 0) {
                stage = 4; 
                    nextLevel();
                    player.col = 15;
                    player.row = 8;
            }
        }
        if (player.row == 0) {
            if (player.col == 7 || player.col == 8) {
                stage = 5; 
                    nextLevel();
                    player.col = 8;
                    player.row = 15;
            }
        }
    }
    else if (stage == 2) {
        if (player.row  == 0) {
            if (player.col == 7 || player.col == 7) {
                stage = 1;
                nextLevel();
                player.row = 15;
                player.col = 7;
                
            }
        }
    } else if (stage == 3) {
        if (player.row  == 8) {
            if (player.col == 0 || player.col == 0) {
                stage = 1;
                nextLevel();
                player.row = 8;
                player.col = 15;
                
            }
        }
    } else if (stage == 4) {
        if (player.row  == 8) {
            if (player.col == 16 || player.col == 16) {
                stage = 1;
                nextLevel();
                player.row = 8;
                player.col = 1;
                
            }
        }
    } else if (stage == 5) {
        if (player.row  == 16) {
            if (player.col == 7 || player.col == 8) {
                stage = 1;
                nextLevel();
                player.row = 1;
                player.col = 7;
                
            }
        }
    }

}

function touched() {
    if (stage == 2 || stage == 3) {
        //If a bat or slime touches the player
        for (let n = 0; n < slime.length; n++) {
            if (player.row == slime[n].row && player.col == slime[n].col) {
                stage = 1;
                nextLevel();
                player.col = 7;
                player.row = 7;
                inventory = [];
            }
            if (player.row == bat.row && player.col == bat.col) {
                stage = 1;
                nextLevel();
                player.col = 7;
                player.row = 8;
                inventory = [];
            }
        }
    }
}

let inventory = [];

function getKey() {
    if (stage == 2) {
        if (isPathTile2(map, player.row, player.col, 61)) {
            inventory.push('key1');
        }
    } else if (stage == 3) {
        if (isPathTile2(map, player.row, player.col, 61)) {
            inventory.push('key2');
        }
    } else if (stage == 4) {
        if (isPathTile2(map, player.row, player.col, 61)) {
            inventory.push('key3');
        }
    }
}

function openChest() {
    if (stage == 5) {
        if (isPathTile2(map, player.row, player.col, 62)) { 
            if (inventory.includes('key1', 'key2', 'key3')) {
                stage = 6;
                nextLevel();
                console.log('worked')
            }
        }
    }
}


