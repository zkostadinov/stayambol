var head;

// Setup game and add canvas element to the HTML
var game = new Phaser.Game(
    "100", // width of canvas
    "100", // height of canvas
    Phaser.CANVAS, // use CANVAS and not WEBGL
    'game', // name of the game
    // object with the three functions required for Phaser to work
    {
        // зарежда начални данни в паметта
        preload: () => {
            game.load.spritesheet('snake', 'images/snake.png', 16, 16);
        },
        // вика се при стартиране на играта
        create: create,
        // вика се при каквато и да е промяна на състоянието: 
        // натиснати бутони, клавиши, събития в самата игра като сблъсъци и др.
        update: update,
        render: () => {
            game.debug.bodyInfo(head, 32, 32);
        }
    }
);

function create() {
    head = game.add.sprite(game.world.randomX, game.world.randomY, 'snake', 1);
    cursors = game.input.keyboard.createCursorKeys();
    head.scale.setTo(3, 3);
    game.physics.enable(head, Phaser.Physics.ARCADE);
    head.body.collideWorldBounds = true;
    head.body.velocity.x = 100;
    head.anchor.x = 0.5;
    head.anchor.y = 0.5;
}

function update() {
    speed = 100;
    if (cursors.up.isDown) {
        head.rotation = Math.PI * 3 / 2;
        head.body.velocity.y = -speed;
        head.body.velocity.x = 0;
    }
    if (cursors.down.isDown) {
        head.rotation = Math.PI / 2;
        head.body.velocity.y = speed;
        head.body.velocity.x = 0;
    }
    if (cursors.right.isDown) {
        head.rotation = 0;
        head.body.velocity.x = speed;
        head.body.velocity.y = 0;
    }
    if (cursors.left.isDown) {
        head.rotation = Math.PI;
        head.body.velocity.x = -speed;
        head.body.velocity.y = 0;
    }
}