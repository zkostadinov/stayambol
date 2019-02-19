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
            // game.load.image('tiles', 'simples_pimples.png');
            game.load.spritesheet('tiles', 'simples_pimples.png', 16, 16);
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
    map.setCollisionBetween(200, 300);

    food = game.add.group();
    // food.enableBody = true;
    map.createFromObjects('Object Layer 1', 928, 'tiles', 927, true, false, food);
    map.createFromObjects('Object Layer 1', 1283, 'tiles', 1282, true, false, food);
    food.forEach((круша) => {
        game.physics.enable(круша);
        круша.body.immovable = true;
        круша.body.allowGravity = false;
    });

    // objects = map.createLayer('Object Layer 1');
    // map.createFromTiles(928, null, 'tiles', objects, food);

    cursors = game.input.keyboard.createCursorKeys();

    player = game.add.sprite(32, 32, 'player');
    player.scale.setTo(0.1, 0.1);
    game.physics.enable(player);
    player.body.collideWorldBounds = true;

    // включваме някаква гравитация за играта
    game.physics.arcade.gravity.y = 250;

    createBlankSprite();
}

function update() {
    // играчът да се сблъсква с нашия слой
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(player, food, (p, f) => {f.destroy();});
    
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

function createBlankSprite() {
    // blank sprite will add last used texture
    var sprite = game.add.sprite(10,10)
    var g = new Phaser.Graphics(game, 0,0)

    g.beginFill(0xFF0000,0.5)
    g.drawRect(0,0,100,100)
    g.endFill()
    
    sprite.addChild(g)
}