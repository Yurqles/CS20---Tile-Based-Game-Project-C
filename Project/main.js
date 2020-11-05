//Project - Tile Based Game

//Setup Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
// 17 rows and 17 columns - 32 x 32
initGraphics(544, 544)

//Create an array to represent the grid
let map = createMap();

//Stage - depending on what satge we are on, it will change many things
let stage = 1;

let controller = {
    left: false,
    right: false,
    up: false,
    //Function named keyboard
    keyboard: function (event) {
        batMove();
        slimeMove();
        switch (event.keyCode) {
            case 65: // a key
                player.col--
                if (player.col < 0) {
                    player.col = 0;
                }
                collideLeft();
                collideBottom();
                collideRight();
                collideTop();
                break;
            case 87: // w key
                player.row--
                if (player.row < 0) {
                    player.row = 0;
                }
                collideBottom();
                collideLeft();
                collideRight();
                collideTop();
                break;
            case 68: // d key
                player.col++
                if (player.col > 16) {
                    player.col = 16;
                }
                collideRight();
                collideLeft();
                collideBottom();
                collideTop();
                break;
            case 83: // s key
                player.row++
                if (player.row > 16) {
                    player.row = 16;
                }
                collideTop();
                collideLeft();
                collideBottom();
                collideRight();
            break;
        }
    }
};

document.addEventListener("keydown", controller.keyboard);

// Main Program Loop
requestAnimationFrame(draw);

function draw() {
    //Logic
    //Player
    player.x = player.col * 32;
    player.y = player.row * 32;
    //Enemies
    bat.x = bat.col * 32;
    bat.y = bat.row * 32;
    for (let n = 0; n < slime.length; n++) {
        slime[n].x = (slime[n].col * 32) - 18;
        slime[n].y = (slime[n].row * 32) - 8;
    }
    touched();
    levels();

    //Borders of the map for the bat- bats can fly over the water and trees
    if (bat.row > 16) {
        bat.row = 16;
    } else if (bat.row < 0) {
        bat.row = 0;
    }
    if (bat.col > 16) {
        bat.col = 16;
    } else if (bat.row < 0) {
        bat.col = 0;
    }
    getKey();
    openChest();

    // Drawing
    ctx.clearRect(0, 0, cnv.width, cnv.height);

    drawArray();

    //Draw the monsters
    for (let n = 0; n < slime.length; n++) {
        drawSlimes(n);
    }
    if (stage == 2 || stage == 3) {
        ctx.drawImage(bats, bat.spriteX, bat.spriteY, 16, 16, bat.x, bat.y, bat.w, bat.h);
    }

    //Draw the player
    ctx.drawImage(spriteSheetImg, spriteX, spriteY, 16, 16, player.x, player.y, player.w, player.h);

    // Request another Animation Frame
    requestAnimationFrame(draw);
}


