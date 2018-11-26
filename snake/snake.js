const COUNT_APPLES = 3;
const TIME_FOR_APPLE = Phaser.Timer.SECOND * 5;

// Setup game and add canvas element to the HTML
var game = new Phaser.Game(
    "100", // width of canvas
    "100", // height of canvas
    Phaser.CANVAS, // use CANVAS and not WEBGL
    'game', // name of the game
    // object with the three functions required for Phaser to work
    {
        // зарежда начални данни в паметта
        preload: () => {
            game.load.spritesheet('snake', 'images/snake.png', 16, 16);
            game.load.image('apple', 'images/apple.png');
        },
        // вика се при стартиране на играта
        create: create,
        // вика се при каквато и да е промяна на състоянието: 
        // натиснати бутони, клавиши, събития в самата игра като сблъсъци и др.
        update: update,
        render: () => {
            game.debug.bodyInfo(head, 32, 32);
        }
    }
);

var head;
var cursors;
var apples;

function create() {
    // общи инициализации
    cursors = game.input.keyboard.createCursorKeys();
    game.stage.backgroundColor = '#5db737';

    // инициализираме змията
    head = game.add.sprite(game.world.randomX, game.world.randomY, 'snake', 1);
    head.scale.setTo(3, 3);
    game.physics.enable(head, Phaser.Physics.ARCADE);
    head.body.collideWorldBounds = true;
    head.body.velocity.x = 100;
    head.anchor.x = 0.5;
    head.anchor.y = 0.5;

    // инициализираме ябълки
    apples = [];
    game.time.events.repeat(TIME_FOR_APPLE, 10000, fillApples, this);
}

function update() {
    speed = 100;
    if (cursors.up.isDown) {
        head.rotation = Math.PI * 3 / 2;
        head.body.velocity.y = -speed;
        head.body.velocity.x = 0;
    }
    if (cursors.down.isDown) {
        head.rotation = Math.PI / 2;
        head.body.velocity.y = speed;
        head.body.velocity.x = 0;
    }
    if (cursors.right.isDown) {
        head.rotation = 0;
        head.body.velocity.x = speed;
        head.body.velocity.y = 0;
    }
    if (cursors.left.isDown) {
        head.rotation = Math.PI;
        head.body.velocity.x = -speed;
        head.body.velocity.y = 0;
    }
}

class Apple {
    constructor() {
        this.born = Date.now();
        this.sprite = game.add.sprite(game.world.randomX, game.world.randomY, 'apple', 1);
    }

    isExpired() {
        return Date.now() - this.born > 10000;
    }
}

function fillApples() {
    apples.forEach((apple, index) => {
        if (apple.isExpired()) {
            apples.splice(index, 1);
            apple.sprite.destroy();
        }
    });

    if (apples.length < COUNT_APPLES) {
        apples.push(new Apple());
    }
}
