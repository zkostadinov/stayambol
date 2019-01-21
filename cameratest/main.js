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
            game.load.image('starfield', 'starfield.png');

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

function myCreateFunction() {
    
    game.world.setBounds(-1000, -1000, 5000, 5000); // !!!

    game.add.tileSprite(game.world.x, game.world.y, game.world.width, game.world.height, 'starfield');
    ball = game.add.sprite(0, 0, 'breakout', '58-Breakout-Tiles.png');
    star = game.add.sprite(100, 100, 'breakout', '59-Breakout-Tiles.png');
    
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.enable(ball);

    game.camera.follow(ball);

}

function myUpdateFunction() {
    playerSpeed = 5;
    cursors = game.input.keyboard.createCursorKeys();

    if (cursors.up.isDown) {
        ball.y -= playerSpeed;
    } else if (cursors.down.isDown) {
        ball.y += playerSpeed;
    } else if (cursors.left.isDown) {
        ball.x -= playerSpeed;
    } else if (cursors.right.isDown) {
        ball.x += playerSpeed;
    }
}