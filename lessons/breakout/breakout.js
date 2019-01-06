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

function myCreateFunction() {     
    pad = game.add.sprite(0, 0, 'breakout');
    pad.animations.add('work', 
        Phaser.Animation.generateFrameNames('', 50, 52, 
                 '-Breakout-Tiles.png'), 
            10, true);
    pad.animations.play('work');
    pad.y = game.world.height - pad.height;
}

function myUpdateFunction() {
    pad.x = game.input.x;
}
