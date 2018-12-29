const COUNT_APPLES = 5;

const UP = 'up';
const DOWN = 'down';
const LEFT = 'left';
const RIGHT = 'right';

var direction;

var keySpace;
var head;
var apples;
var applesEatenBySnake;

var game = new Phaser.Game(
    '100%', // width of canvas
    '100%', // height of canvas
    Phaser.CANVAS, // use CANVAS and not WEBGL
    'game', // name of the game
    // object with the three functions required for Phaser to work
    {
        preload: function() {
            game.load.image('head', 'spinning-snake-29.png');
            game.load.image('apple', 'apple.png');
        },
        create: myCreateFunction,
        update: myUpdateFunction,
        render: () => {
                // game.debug.spriteInfo(head, 10, 100);
                // game.debug.bodyInfo(head, 10, 200);
                game.debug.text(direction, 10, 20);

                // render the sprites bounds
                /*if (head.getBounds()) {
                    game.debug.rectangle(head.getBounds(), '#ffffff', false);
                }
                applesEatenBySnake.forEach(apple => {
                    game.debug.rectangle(apple.getBounds(), '#ffffff', false);
                });*/
                
        }
    }
);

function myCreateFunction() {        
    game.stage.backgroundColor='#229944';
    head = game.add.sprite(10, 10, 'head', 1);
    head.scale.setTo(-0.1, 0.1);
    keySpace = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    keyUp = game.input.keyboard.addKey(Phaser.KeyCode.UP);
    keyDown = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);
    keyLeft = game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
    keyRight = game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);

    game.physics.enable(head, Phaser.Physics.ARCADE);
    head.body.collideWorldBounds = true;
    head.anchor.x = 0.5;
    head.anchor.y = 0.5;        

    apples = [];
    for (let i = 1; i <= COUNT_APPLES; i ++) {
        createApple(game.world.randomX, game.world.randomY);
    }
    
    // ...

    applesEatenBySnake = [];
}

function createApple(x, y) {
    var newApple = game.add.sprite(x, y, 'apple', 1);
    newApple.scale.setTo(0.5, 0.5);
    game.physics.enable(newApple, Phaser.Physics.ARCADE);
    apples.push(newApple);
    return newApple;
}

function myUpdateFunction() {
    var speed = 300;
    if (keyUp.isDown) {
        head.body.velocity.x = 0;
        head.body.velocity.y = -speed;
        head.rotation = Math.PI * 3 / 2;
        head.scale.x = -0.1;
        direction = UP;
    }
    if (keyDown.isDown) {
        head.body.velocity.x = 0;
        head.body.velocity.y = speed;
        head.scale.x = -0.1;
        head.rotation = Math.PI / 2;
        direction = DOWN;
    }
    if (keyLeft.isDown) {
        head.body.velocity.x = -speed;
        head.body.velocity.y = 0;
        head.scale.x = 0.1;
        head.rotation = 0;
        direction = LEFT;
    }
    if (keyRight.isDown) {
        head.body.velocity.x = speed;
        head.body.velocity.y = 0;
        head.scale.x = -0.1;
        head.rotation = 0;
        direction = RIGHT;
    }

    for (let i = 0; i < apples.length; i ++) {
        game.physics.arcade.collide(head, apples[i], snakeHitApple);
    }

    if (direction === LEFT) {
        var x = head.body.x + head.body.width;
        var y = head.body.y;
        for (let i = 0; i < applesEatenBySnake.length; i ++) {
            let eaten = applesEatenBySnake[i];
            eaten.x = x;
            eaten.y = y;
            x += eaten.width;
        }
    } else if (direction === RIGHT ||
         direction === UP || 
         direction === DOWN) {
        if (applesEatenBySnake.length > 0){
            var x = head.body.x - applesEatenBySnake[0].width;
            var y = head.body.y;
            for (let i = 0; i < applesEatenBySnake.length; i ++) {
                let eaten = applesEatenBySnake[i];
                eaten.x = x - eaten.width;
                eaten.y = y;
                x -= eaten.width;
            }
        }
    }
}

function snakeHitApple(head, apple) {
    apples.splice(apples.indexOf(apple), 1);
    applesEatenBySnake.push(apple);
    head.body.velocity.x = head.body.velocity.x + apple.body.velocity.x;
    head.body.velocity.y = head.body.velocity.y + apple.body.velocity.y;
    apple.body.velocity.setTo(0,0);

    // scale the size of the apple to the size of the head
    apple.scale.setTo(1, 1);
    apple.scale.setTo(Math.abs(head.width / apple.width), Math.abs(head.height / apple.height));

    // create new apple
    createApple(game.world.randomX, game.world.randomY);
}