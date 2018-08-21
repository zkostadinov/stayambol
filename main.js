
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
var score = 0;
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

    // loads image
    game.load.image('star', 'assets/images/star.png');
    game.load.image('bullet', 'assets/images/bullet.png');
}

function create() {
    // changes background color
    game.stage.backgroundColor = "#eee";

    // adds text to the canvas
    // X, Y, text value
    text = game.add.text(20, 20, score);

    // STARS:
    // creates an array of physics objects 
    // (they have physics body that can collide with other physics bodies)
    stars = game.add.physicsGroup();
    for (var i = 0; i < 15; i++) { // add 15 stars to the array of physics bodies
        // create a star
        // X, Y, name of the image
        var star = stars.create(game.world.randomX, game.world.randomY, 'star');

        // changes the size of the star (20% of initial)
        star.scale.setTo(0.2);
    }

    // THE HERO:
    // creates a sprite which is visible and can move 
    // (but does not have physics body - can not collide with other object)
    // X, Y, name of the image
    guy = game.add.sprite(200, 200, 'guy');

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

    // WEAPON:
    // Creates a weapon that can fire bullets
    // 1st param: number of bullets
    // 2nd param: image for each bullet
    weapon = game.add.weapon(15, 'bullet');

    // remove bullets when they reach end of canvas
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    // moving speed of each bullet (higher number means faster bullet)
    weapon.bulletSpeed = 600;

    // rate of fire in milliseconds (higher number means less fired bullets per second)
    weapon.fireRate = 100;

    // give the weapon to the HERO
    // 1st: the sprite which will use the weapon
    // X and Y of the weapon relative to the HERO position
    // 4th: if true the weapon rotates with the HERO
    weapon.trackSprite(guy, 30, 20, true);

    // register the SPACEBAR as a button to fire the weapon
    fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    // register the cursor keys of the keyboard (left, right, down, up)
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    
    // check for collision between the HERO and the group of STARS
    game.physics.arcade.collide(
        guy,
        stars,
        // callback function which is invoked
        // when a collision is detected
        function (guy, star) {
            // star is the concrete member of the group of stars
            // that the HERO has collided with

            // removes the star from the CANVAS
            star.kill();
        }
    );

    // check for collision between any bullet and any star
    game.physics.arcade.collide(
        weapon.bullets,
        stars,
        function(bullet, star) {
            bullet.kill();
            star.kill();

            // update the score when we hit a star
            score += 10;

            // update text with the new score
            text.setText(score);
        }
    );

    // check for pressed keys
    var speed = 2;
    if (isAnyCursorKeyPressed()) {
        if (cursors.right.isDown) {
            guy.x += speed; // move to the right with 10 pixels
            // guy.rotation = 0; // look to the right;
            // play the registered animation
            guy.animations.play('walkRight');
        }
        if (cursors.left.isDown) {
            guy.x -= speed; // move to the left with 10 pixes
            // guy.rotation = 3.14; // look to the left
            guy.animations.play('walkLeft');
        }
        if (cursors.up.isDown) {
            guy.y -= speed;
            // guy.rotation = 3.14 * 3 / 2;
            guy.animations.play('walkUp');
        }
        if (cursors.down.isDown) {
            guy.y += speed;
            // guy.rotation = 3.14 / 2;
            guy.animations.play('walkDown');
        }
    }
    else {
        // if no keys are pressed stop the animation
        guy.animations.stop();
    }

    // fire when the SPACEBAR is pressed
    if (fireButton.isDown) {
        weapon.fire();
    }
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

	game.debug.bodyInfo(guy, 40, 24);

	// game.debug.body(sprite);
	// game.debug.body(sprite2);

}
