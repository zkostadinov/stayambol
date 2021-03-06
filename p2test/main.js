
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
    //  Turn on impact events for the world, without this we get no collision callbacks
    game.physics.p2.setImpactEvents(true);
    //game.physics.p2.restitution = 0.8;

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
    ball.body.velocity.x = -400;

    let collisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();
    pad.body.setCollisionGroup(collisionGroup);
    ball.body.setCollisionGroup(collisionGroup);
    ball.body.collides(collisionGroup);
    pad.body.collides(collisionGroup/*, hit*/);

    // можем да слушаме по още един начин за сблъсъци
    ball.body.onBeginContact.add(() => {console.log("contact")}, this);
    
    // незнайно защо това не работи
    ball.body.collides(game.physics.p2.boundsCollisionGroup, hit);
}

function myUpdateFunction() {

}

function hit(ball) {
    alert('hitWorldBounds');
    ball.body.velocity.x = 0;
    ball.body.velocity.y = 0;
}