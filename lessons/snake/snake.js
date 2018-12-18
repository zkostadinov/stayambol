var keySpace;
var head;
var apples;
var points = 0;
var text;

var game = new Phaser.Game(
    '100%', // width of canvas
    '100%', // height of canvas
    Phaser.CANVAS, // use CANVAS and not WEBGL
    'game', // name of the game
    // object with the three functions required for Phaser to work
    {
        preload: function() {
            game.load.image('head', 'spinning-snake-29.png');
            game.load.image('apple', 'apple.png');
        },
        create: myCreateFunction,
        update: myUpdateFunction,
        render: () => {
            // oihiuh
        }
    }
);

function myCreateFunction() {        
    game.stage.backgroundColor='#229944';
    head = game.add.sprite(10, 10, 'head', 1);
    head.scale.setTo(-0.1, 0.1);
    keySpace = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    keyUp = game.input.keyboard.addKey(Phaser.KeyCode.UP);
    keyDown = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);
    keyLeft = game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
    keyRight = game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);

    game.physics.enable(head, Phaser.Physics.ARCADE);
    head.body.collideWorldBounds = true;
    head.anchor.x = 0.5;
    head.anchor.y = 0.5;        

    apples = [];
    apples.push(createApple(100, 100));
    apples.push(createApple(200, 200));
    apples.push(createApple(300, 400));
    // ...

    text = game.add.text(game.world.bounds.width - 200, 100, "");
}

function createApple(x, y) {
    var newApple = game.add.sprite(x, y, 'apple', 1);
    newApple.scale.setTo(0.5, 0.5);
    game.physics.enable(newApple, Phaser.Physics.ARCADE);
    return newApple;
}

function myUpdateFunction() {
    var speed = 300;
    if (keyUp.isDown) {
        head.body.velocity.x = 0;
        head.body.velocity.y = -speed;
        head.rotation = Math.PI * 3 / 2;
        head.scale.x = -0.1;
    }
    if (keyDown.isDown) {
        head.body.velocity.x = 0;
        head.body.velocity.y = speed;
        head.scale.x = -0.1;
        head.rotation = Math.PI / 2;
    }
    if (keyLeft.isDown) {
        head.body.velocity.x = -speed;
        head.body.velocity.y = 0;
        head.scale.x = 0.1;
        head.rotation = 0;
    }
    if (keyRight.isDown) {
        head.body.velocity.x = speed;
        head.body.velocity.y = 0;
        head.scale.x = -0.1;
        head.rotation = 0;
    }

    for (let i = 0; i < apples.length; i ++) {
        game.physics.arcade.collide(head, apples[i], spritesCollide);
    }

    text.setText("Точки: " + points);
}

function spritesCollide(head, apple) {
    apple.destroy();
    points = points + 5;
}