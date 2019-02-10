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
            // зареждаме картата
            game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
            game.load.image('tiles', 'simples_pimples.png');
            game.load.image('player', '../test/assets/images/mushroom.png');
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
    // добавяме картата към играта
    map = game.add.tilemap('map');
    // сменяме размера на екрана според картата
    game.scale.setGameSize(map.widthInPixels, map.heightInPixels);
    // казваме къде са картинките
    map.addTilesetImage('simples_pimples', 'tiles');
    // добавяме единия слой с картинки
    layer = map.createLayer('Tile Layer 1');

    // казваме на обектите да се блъскат в нашите спрайтове
    // map.setCollision(108);
    map.setCollision(201);
    map.setCollision(251);

    cursors = game.input.keyboard.createCursorKeys();

    player = game.add.sprite(32, 32, 'player');
    player.scale.setTo(0.1, 0.1);
    game.physics.enable(player);

    // включваме някаква гравитация за играта
    game.physics.arcade.gravity.y = 250;
}

function update() {
    // играчът да се сблъсква с нашия слой
    game.physics.arcade.collide(player, layer);

    // малко да го раздвижим

    if (cursors.up.isDown)
    {
        if (player.body.onFloor())
        {
            player.body.velocity.y = -200;
        }
    }

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;
    }
}
