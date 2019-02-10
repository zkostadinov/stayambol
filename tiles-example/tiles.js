// Setup game and add canvas element to the HTML
var game = new Phaser.Game(
    800, // width of canvas
    600, // height of canvas
    Phaser.CANVAS, // use CANVAS and not WEBGL
    'game', // name of the game
    // object with the three functions required for Phaser to work
    {
        // зарежда начални данни в паметта
        preload: () => {
            // game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
            // game.load.image('tiles', 'simples_pimples.png');
            game.load.tilemap('map', 'super_mario.json', null, Phaser.Tilemap.TILED_JSON);
            game.load.image('tiles', 'super_mario.png');
        },
        // вика се при стартиране на играта
        create: create,
        // вика се при каквато и да е промяна на състоянието: 
        // натиснати бутони, клавиши, събития в самата игра като сблъсъци и др.
        update: update,
        render: () => {
        }
    }
);

function create() {
    game.stage.backgroundColor = '#787878';
    map = game.add.tilemap('map');
    // map.addTilesetImage('simples_pimples.tsx', 'tiles');
    // layer = map.createLayer('Tile Layer 1');
    map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
    layer = map.createLayer('World1');
    layer.resizeWorld();
}

function update() {
}
