var game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.atlasXML('breakout', 'Breakout_Tile_Free.png', 'Breakout_Tile_Free.xml');
    game.load.image('starfield', 'starfield.png');

}

var pad, ball;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    s = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'starfield');

    pad = game.add.sprite(0, 0, 'breakout');
    pad.animations.add('work', Phaser.Animation.generateFrameNames('', 50, 52, '-Breakout-Tiles.png'), 10, true);
    pad.animations.play('work');
    pad.y = game.world.bounds.height - pad.height;
    pad.x = game.world.bounds.width / 2 - pad.width / 2;
    pad.anchor.x = 0.5;
    game.physics.enable(pad, Phaser.Physics.ARCADE);
    // make the ball bounce on pad
    pad.body.bounce.set(1);
    pad.body.immovable = true;

    weapon = game.add.weapon(15, 'breakout', '59-Breakout-Tiles.png');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 600;
    weapon.fireRate = 100;
    weapon.fireAngle = Phaser.ANGLE_UP;
    weapon.trackSprite(pad, 0, 0, false);

    game.input.activePointer.leftButton.onDown.add(() => {weapon.fire()});
    game.input.activePointer.middleButton.onDown.add(startBall);
    game.physics.arcade.checkCollision.down = false;
}

function startBall() {
    if (ball) {
        ball.destroy();
    }
    ball = game.add.sprite(0, 0, 'breakout', '58-Breakout-Tiles.png');
    ball.anchor.x = 0.5;
    ball.y = pad.y - ball.width;
    ball.x = pad.x;
    ball.checkWorldBounds = true;
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.collideWorldBounds = true;
    // make the ball bounce on pad
    ball.body.bounce.set(1);
    ball.body.velocity.y = -1000;
    ball.body.velocity.x = -150;
}

function update () {
    pad.x = Math.max(Math.min(game.input.x, game.world.width - pad.width / 2), pad.width / 2);

    game.physics.arcade.collide(ball, pad, reflectBall, null, this);
}

function render() {
    game.debug.spriteInfo(pad, 0, 0);
}

function reflectBall(ball, pad) {

    var diff = 0;

    if (ball.x < pad.x)
    {
        //  Ball is on the left-hand side of the paddle
        diff = pad.x - ball.x;
        ball.body.velocity.x = (-10 * diff);
    }
    else if (ball.x > pad.x)
    {
        //  Ball is on the right-hand side of the paddle
        diff = ball.x -pad.x;
        ball.body.velocity.x = (10 * diff);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        ball.body.velocity.x = 2 + Math.random() * 8;
    }

    return false;
}
