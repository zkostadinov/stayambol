var game = new Phaser.Game('100%', '100%', Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.atlasXML('breakout', 'Breakout_Tile_Free.png', 'Breakout_Tile_Free.xml');
    game.load.image('starfield', 'starfield.png');

}

var pad;

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
    // pad.body.collideWorldBounds = true;
    // pad.body.bounce.set(1);
    // pad.body.immovable = true;
}

function update () {
    pad.x = Math.min(game.input.x, game.world.width - pad.width / 2);
}

function render() {
    game.debug.spriteInfo(pad, 0, 0);
}