var game = new Phaser.Game(
    '100%', // width of canvas
    '100%', // height of canvas
    Phaser.CANVAS, // use CANVAS and not WEBGL
    'game', // name of the game
    // object with the three functions required for Phaser to work
    {
        preload: function () {
            game.load.atlasXML('breakout',
                'Breakout_Tile_Free.png',
                'Breakout_Tile_Free.xml');
        },
        create: myCreateFunction,
        update: myUpdateFunction,
        render: () => {
            //game.debug.text("hello world!", 10, 20);
            if (ball) {
                game.debug.bodyInfo(ball, 100, 100);
            }            
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
    pad.body.immovable = true;

    spaceKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    spaceKey.onDown.add(startBall);

    // добавяме тухлички
    var countBricks = 12;
    const brickWidthDistanceProportion = 1.3;
    var brickWidth = game.world.width / (countBricks * brickWidthDistanceProportion + 0.9);
    var x = brickWidth / 2;
    for (let i = 0; i < countBricks; i ++) {
        createBrick(x, brickWidth);
        x = x + brickWidth * brickWidthDistanceProportion;
    }
}

var bricks = [];

function createBrick(x, width) {
    var brick = game.add.sprite(x, 0, 'breakout', '01-Breakout-Tiles.png');
    brick.height = brick.height * width / brick.width;
    brick.width = width;
    game.physics.enable(brick, Phaser.Physics.ARCADE);
    brick.body.immovable = true;
    bricks.push(brick);
}

var ball;
var points = 0;

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

    game.physics.arcade.collide(ball, pad, reflectBallFromPad, null, this);
    
    game.physics.arcade.collide(ball, bricks, ballHitBrick);

    if (ball) {
        ball.angle = ball.angle + 4;
    }
}

function startBall() {
    if (ball) return;

    ball = game.add.sprite(0, 0, 'breakout', '59-Breakout-Tiles.png');
    ball.anchor.x = 0.5;
    ball.anchor.y = 0.5;
    ball.x = pad.x;
    ball.y = pad.y - ball.height;
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.velocity.y = -500;
    ball.body.velocity.x = -80;
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
}

function reflectBallFromPad(ball, pad) {
    var x1, y1, x2, y2, A;
    x1 = ball.body.velocity.x;
    y1 = ball.body.velocity.y;
    A = 2 * (ball.x - pad.x);
    x2 = x1 + A;
    y2 = - Math.sqrt(x1*x1 + y1*y1 - x2*x2);
    ball.body.velocity.x = x2;
    ball.body.velocity.y = y2;
}

function ballHitBrick(ball, brick) {
    brick.destroy();
}