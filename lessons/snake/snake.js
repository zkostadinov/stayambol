var keySpace;
var head;

var game = new Phaser.Game(
    '100%', // width of canvas
    '100%', // height of canvas
    Phaser.CANVAS, // use CANVAS and not WEBGL
    'game', // name of the game
    // object with the three functions required for Phaser to work
    {
        preload: function() {
            game.load.image('head', 'spinning-snake-29.png');
        },
        create: function() {
            game.stage.backgroundColor='#229944';
            head = game.add.sprite(10, 10, 'head', 1);
            head.scale.setTo(0.1, 0.1);
            keySpace = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
            keyUp = game.input.keyboard.addKey(Phaser.KeyCode.UP);
            keyDown = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);
            keyLeft = game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
            keyRight = game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);

            game.physics.enable(head, Phaser.Physics.ARCADE);
            head.body.collideWorldBounds = true;
            head.anchor.x = 0.5;
            head.anchor.y = 0.5;        
        },
        update: () => {
            var speed = 300;
            if (keyUp.isDown) {
                head.body.velocity.x = 0;
                head.body.velocity.y = -speed;
            }
            if (keyDown.isDown) {
                head.body.velocity.x = 0;
                head.body.velocity.y = speed;
            }
            if (keyLeft.isDown) {
                head.body.velocity.x = -speed;
                head.body.velocity.y = 0;
            }
            if (keyRight.isDown) {
                head.body.velocity.x = speed;
                head.body.velocity.y = 0;
            }
        }
    }
);