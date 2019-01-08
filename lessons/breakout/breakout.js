var game = new Phaser.Game(
    '100%', // width of canvas
    '100%', // height of canvas
    Phaser.CANVAS, // use CANVAS and not WEBGL
    'game', // name of the game
    // object with the three functions required for Phaser to work
    {
        preload: function() {
            game.load.atlasXML('breakout', 
                'Breakout_Tile_Free.png', 
                'Breakout_Tile_Free.xml');
        },
        create: myCreateFunction,
        update: myUpdateFunction,
        render: () => {
                //game.debug.text("hello world!", 10, 20);                
        }
    }
);

var spaceKey;

function myCreateFunction() {     
    pad = game.add.sprite(0, 0, 'breakout');
    pad.anchor.x = 0.5;
    pad.animations.add('work', 
        Phaser.Animation.generateFrameNames('', 50, 52, 
                 '-Breakout-Tiles.png'), 
            10, true);
    pad.animations.play('work');
    pad.y = game.world.height - pad.height;
    game.physics.enable(pad, Phaser.Physics.ARCADE);

    spaceKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
}

var ball;

function myUpdateFunction() {
    var xmin = pad.width / 2;
    var xmax = game.world.width - pad.width / 2;
    var newX = game.input.x;
    if (newX < xmin) {
        newX = xmin;
    }
    if (newX > xmax) {
        newX = xmax;
    }
    pad.x = newX;

    if (spaceKey.isDown) {
        if (ball == undefined) {
            ball = game.add.sprite(0, 0, 'breakout', '58-Breakout-Tiles.png');
            ball.anchor.x = 0.5;
            ball.x = pad.x;
            ball.y = pad.y - ball.height;
            game.physics.enable(ball, Phaser.Physics.ARCADE);
            ball.body.velocity.y = -200;
            ball.body.velocity.x = -80;
            ball.body.collideWorldBounds = true;
            ball.body.bounce.set(1);
        }
    }

    
}
