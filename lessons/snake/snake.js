var game = new Phaser.Game(
    '100', // width of canvas
    '100', // height of canvas
    Phaser.CANVAS, // use CANVAS and not WEBGL
    'game', // name of the game
    // object with the three functions required for Phaser to work
    {
        preload: function() {
            game.load.image('head', 'spinning-snake-29.png');
        },
        create: function() {
            game.stage.backgroundColor='#239933';
            var head = game.add.sprite(10, 10, 'head', 1);
            head.scale.setTo(0.1, 0.1);
        }
    }
);