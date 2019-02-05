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
            game.load.spritesheet('frames', 'spritesheet.png', 84, 84);
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

// можем да пропуснем тези декларации, но предпочитам да са ми описани
var spacebar, weapon, enemy;

function create() {

    weapon = game.add.weapon(30, 'frames', 21);
    // The bullet will be automatically killed when it leaves the world bounds
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    // скорост на куршума
    weapon.bulletSpeed = 600;
    // скорост на стрелбата
    weapon.fireRate = 100;

    // създаваме танка втори, 
    // че иначе куршумът тръгва от неговия anchor и минава над него
    let tank = game.add.sprite(500, 400, 'frames', 1);
    weapon.trackSprite(tank, 0, 0, true);
    tank.anchor.setTo(0.5, 0.5);
    // като го завъртим пак си стреля накъдето трябва
    tank.angle = -90;

    spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    // тука е врагът, който да застреляме
    enemy = game.add.sprite(450, 100, 'frames', 29);
    game.physics.enable(enemy, Phaser.Physics.ARCADE);
}

function update() {
    if (spacebar.isDown) {
        weapon.fire();
    }

    game.physics.arcade.overlap(weapon.bullets, enemy, killEnemy);
}

function killEnemy() {
    enemy.destroy();
}