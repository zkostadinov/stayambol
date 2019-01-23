
var ball, pad;

var game = new Phaser.Game(
    '100%', // width of canvas
    '100%', // height of canvas
    Phaser.CANVAS, // use CANVAS and not WEBGL
    'game', // name of the game
    // object with the three functions required for Phaser to work
    {
        preload: function () {
            this.game.load.physics("physics", "p2 test.json");
            game.load.image('pad', 'pad.png');
            game.load.image('ball', 'ball.png');
        },
        create: myCreateFunction,
        update: myUpdateFunction,
        render: () => {
            game.debug.text(pad.body.velocity.y, 10, 20);
            // if (pad) {
            //     game.debug.spriteInfo(pad, 100, 100);
            // }
        }
    }
);

function myCreateFunction() {

    // KEEP SPRITES SMALL
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.x = 0;
    game.physics.p2.gravity.y = 0;

    game.stage.backgroundColor = "#ff00ff";
    pad = game.add.sprite(100, 100, 'pad');
 
    game.physics.p2.enable(pad, false);
    pad.body.clearShapes();
    pad.body.loadPolygon("physics", "pad");
    pad.body.static = true;

    ball = game.add.sprite(500, 100, 'pad');
    game.physics.p2.enable(ball, false);
    ball.body.clearShapes();
    ball.body.loadPolygon("physics", "pad");
    ball.body.data.gravityScale = 0;
    ball.body.velocity.x = -400;
}

function myUpdateFunction() {

}