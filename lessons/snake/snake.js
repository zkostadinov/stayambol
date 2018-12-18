var head;
var apples;
var applesEatenBySnake;
var text;

var headTurningPoints = [];
var MAX_HEAD_TURNING_POINTS = 10;

var game = new Phaser.Game(
    '100%', // width of canvas
    '100%', // height of canvas
    Phaser.CANVAS, // use CANVAS and not WEBGL
    'game', // name of the game
    // object with the three functions required for Phaser to work
    {
        preload: function () {
            game.load.image('head', 'spinning-snake-29.png');
            game.load.image('apple', 'apple.png');
        },
        create: myCreateFunction,
        update: myUpdateFunction,
        render: () => {
            // game.debug.spriteInfo(head, 10, 100);
            // game.debug.bodyInfo(head, 10, 200);

            // game.debug.text(headTurningPoints, 10, 10);
            game.debug.text('direction: ' + direction.x + ' / ' + direction.y, 500, 10);
            game.debug.text('center: ' + head.position, 500, 30);
            if (applesEatenBySnake.length > 0) {
                game.debug.text('apple: ' + applesEatenBySnake[0].position, 500, 50);
            }

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
    game.stage.backgroundColor = '#229944';
    head = game.add.sprite(10, 10, 'head', 1);
    head.scale.setTo(-0.1, 0.1);
    let keyUp = game.input.keyboard.addKey(Phaser.KeyCode.UP);
    let keyDown = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);
    let keyLeft = game.input.keyboard.addKey(Phaser.KeyCode.LEFT);
    let keyRight = game.input.keyboard.addKey(Phaser.KeyCode.RIGHT);

    game.physics.enable(head, Phaser.Physics.ARCADE);
    head.body.collideWorldBounds = true;
    head.anchor.x = 0.5;
    head.anchor.y = 0.5;

    apples = [];
    apples.push(createApple(100, 100));
    apples.push(createApple(200, 200));
    apples.push(createApple(300, 400));
    apples.push(createApple(400, 330));
    apples.push(createApple(500, 400));
    apples.push(createApple(600, 230));
    apples.push(createApple(130, 400));
    apples.push(createApple(110, 430));
    apples.push(createApple(400, 330));
    apples.push(createApple(900, 830));
    apples.push(createApple(1100, 230));
    apples.push(createApple(420, 730));
    apples.push(createApple(411, 830));
    // ...

    text = game.add.text(game.world.bounds.width - 200, 100, "");

    applesEatenBySnake = [];
    eatenApplesOldLocations = [];

    // movement handling code
    var speed = 300;
    function addHeadTurningPoint() {
        headTurningPoints.unshift(new Phaser.Point(head.centerX, head.centerY));
        if (headTurningPoints.length >= MAX_HEAD_TURNING_POINTS) {
            headTurningPoints.splice(MAX_HEAD_TURNING_POINTS, headTurningPoints.length - MAX_HEAD_TURNING_POINTS);
        }
    }

    keyUp.onDown.add(() => {
        head.body.velocity.x = 0;
        head.body.velocity.y = -speed;
        head.rotation = Math.PI * 3 / 2;
        head.scale.x = -0.1;
        addHeadTurningPoint();
    });
    keyDown.onDown.add(() => {
        head.body.velocity.x = 0;
        head.body.velocity.y = speed;
        head.scale.x = -0.1;
        head.rotation = Math.PI / 2;
        addHeadTurningPoint();
    });
    keyLeft.onDown.add(() => {
        head.body.velocity.x = -speed;
        head.body.velocity.y = 0;
        head.scale.x = 0.1;
        head.rotation = 0;
        addHeadTurningPoint();
    });
    keyRight.onDown.add(() => {
        head.body.velocity.x = speed;
        head.body.velocity.y = 0;
        head.scale.x = -0.1;
        head.rotation = 0;
        addHeadTurningPoint();
    });
    addHeadTurningPoint(); // remember the initial point as a turning point
    // end of movement handling code
}

function createApple(x, y) {
    var newApple = game.add.sprite(x, y, 'apple', 1);
    newApple.scale.setTo(0.5, 0.5);
    game.physics.enable(newApple, Phaser.Physics.ARCADE);
    return newApple;
}

function myUpdateFunction() {
    for (let i = 0; i < apples.length; i++) {
        game.physics.arcade.collide(head, apples[i], snakeHitApple);
    }

    current = new Phaser.Point(head.centerX, head.centerY);
    var stack = headTurningPoints.slice().reverse();

    // this considers only the last point
    var previous = stack.pop();
    direction = new Phaser.Point(
        Math.sign(Math.round(previous.x - current.x)),
        Math.sign(Math.round(previous.y - current.y)));
    // we need the abs width here, as the scaling screwes it up
    var x = current.x + Math.abs(head.width) * direction.x;
    var y = current.y + head.height * direction.y;
    for (let i = 0; i < applesEatenBySnake.length; i++) {
        let eaten = applesEatenBySnake[i];
        eaten.centerX = x;
        eaten.centerY = y;
        x += eaten.width * direction.x;
        y += eaten.height * direction.y;

        // load the next turning point if needed
        if (direction.x > 0 && x >= previous.x ||
            direction.x < 0 && x <= previous.x ||
            direction.y > 0 && y >= previous.y ||
            direction.y < 0 && y <= previous.y
            && stack.length > 0) {
            current = previous;
            previous = stack.pop();
            direction = new Phaser.Point(
                Math.sign(Math.round(previous.x - current.x)),
                Math.sign(Math.round(previous.y - current.y)));
                // x = current.x + Math.abs(head.width) * direction.x;
                // y = current.y + head.height * direction.y;
            }
    }
}

function snakeHitApple(head, apple) {
    apples.splice(apples.indexOf(apple), 1);
    applesEatenBySnake.push(apple);
    apple.body.velocity.setTo(0, 0);

    // scale the size of the apple to the size of the head
    apple.scale.setTo(1, 1);
    apple.scale.setTo(Math.abs(head.width / apple.width), Math.abs(head.height / apple.height));
}