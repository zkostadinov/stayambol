
// Setup game and add canvas element to the HTML
var game = new Phaser.Game(
    "90%", // width of canvas
    "90%", // height of canvas
    Phaser.CANVAS, // use CANVAS and not WEBGL
    'game', // name of the game
    {   // object with the three functions required for Phaser to work

        preload: preload,  // loads all the game resources before game start
        create: create,    // setups the initial state of the game
        update: update,    // loops infinitely and checks for collisions, movement, keyboard input
        render: render
    }
);

// global variables that are shared between functions
var guy, text, stars;
var weapon;
var fireButton;
var cursors;

function preload() {
    // spritesheet - collection of frames
    // first parameter - 'guy' - the name of the spritesheet to be referenced later from code
    // second param - relative path to the location of the file
    // third param - width of each frame
    // fourth param - height of each frame
    game.load.spritesheet('guy', 'assets/images/professor_walk_cycle_no_hat.png', 576/9, 256/4);
}

function create() {
    // changes background color
    game.stage.backgroundColor = "#eee";

    // THE HERO:
    // creates a sprite which is visible and can move 
    // (but does not have physics body - can not collide with other object)
    // X, Y, name of the image, index of initial frame to be displayed
    guy = game.add.sprite(200, 200, 'guy', 27);
    guy.anchor.x = 0.5;
    guy.anchor.y = 0.5;

    // registers animations for the hero
    // 1st: name of the animation
    // 2nd: array of frames which will be used for the animation
    // 3rd: framerate (frames per second)
    // 4th: if true loops through frames infinitely
    guy.animations.add('walkUp', [0, 1, 2, 3, 4, 5, 6, 7, 8], 12, true);
    guy.animations.add('walkLeft', [9, 10, 11, 12, 13, 14, 15, 16, 17], 12, true);
    guy.animations.add('walkDown', [18, 19, 20, 21, 22, 23, 24, 25, 26], 12, true);
    guy.animations.add('walkRight', [27, 28, 29, 30, 31, 32, 33, 34, 35], 12, true);

    // adds physics body to the HERO
    // so that we can collide with other objects
    game.physics.enable(guy, Phaser.Physics.ARCADE);

    // zlatko: stop at the ends of the world
    guy.body.collideWorldBounds = true;

    guy.body.bounce.setTo(1, 1);

    cursors = game.input.keyboard.createCursorKeys();

    game.time.events.repeat(Phaser.Timer.SECOND, 10000000, readServer, this);
}

function update() {
    
    // check for pressed keys
    var speed = 2;

    var moving = false;

    if (game.input.mousePointer.isDown) {
        game.physics.arcade.moveToPointer(guy, speed * 100);

        if (guy.body.velocity.x < 0) {
            guy.rotation = Math.PI;
            guy.animations.play('walkLeft');
        } else {
            guy.rotation = 0;
            guy.animations.play('walkRight');
        }
        moving = true;
    } else {
        // stop the move
        guy.body.velocity.setTo(0, 0);
    }
    
    if (isAnyCursorKeyPressed()) {
        if (cursors.up.isDown) {
            guy.y -= speed;
            guy.rotation = Math.PI * 3 / 2;
            guy.animations.play('walkUp');
        }
        if (cursors.down.isDown) {
            guy.y += speed;
            guy.rotation = Math.PI / 2;
            guy.animations.play('walkDown');
        }
        if (cursors.right.isDown) {
            guy.x += speed;
            guy.rotation = 0;
            guy.animations.play('walkRight');
        }
        if (cursors.left.isDown) {
            guy.x -= speed;
            guy.rotation = Math.PI;
            guy.animations.play('walkLeft');
        }
        // guy.body.angle = 0;
        moving = true;
    }

    if (!moving) {
        // if no keys are pressed stop the animation
        guy.animations.stop();
    } else {
        updateServer();
    }
}

function readServer() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(p) {
        s = p.target.responseText.trim();
        guy.x = parseInt(s.split('/')[0])
        guy.y = parseInt(s.split('/')[1])
    };
    xhr.open('GET', 'http://localhost:8000');
    xhr.send();
}

function updateServer() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000');
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.send(guy.x + '/' + guy.y + '\n');
}

// check for any cursor key press
function isAnyCursorKeyPressed() {
    return cursors.right.isDown ||
        cursors.left.isDown ||
        cursors.up.isDown ||
        cursors.down.isDown;
}


// added by Zlatko to debug the game state
function render() {

	// game.debug.bodyInfo(guy, 40, 24);

	// game.debug.body(sprite);
	// game.debug.body(sprite2);

}
