var Bunny,Lola,T_Zamuk,R_Zamuk,Bomb;


var game = new Phaser.Game(
    '100', // width of canvas
    '100', // height of canvas
    Phaser.CANVAS, // use CANVAS and not WEBGL
    'game', // name of the game
    // object with the three functions required for Phaser to work
    {
        preload: function() {
            game.load.image('Bunny', 'Buny.png');
            game.load.image('Bomb', 'Bomb.png');
			game.load.image('Lola', 'Lola.png');
			game.load.image('Zamuk-Lola', 'R_Zamuk.png');
			game.load.image('Zamuk-Bunny', 'T_Zamuk.png');
			 this.game.load.physics("physics", "Fiziki na vsichko.json");
        },
        create: myCreateFunction,
        update: myUpdateFunction,
        render: () => {
            game.debug.spriteInfo(Bunny, 100, 100);
        }
    }
);

function myCreateFunction() {        
				
	game.stage.backgroundColor='#222222';
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.setImpactEvents(true);
	game.physics.p2.gravity.x = 0;
	game.physics.p2.gravity.y = 0;

	
	
	
	Bunny = game.add.sprite(1200,100,'Bunny');
	game.physics.p2.enable(Bunny, false);
    Bunny.body.clearShapes();
    Bunny.body.loadPolygon("physics", "Bunny");
    Bunny.scale.setTo(0.25,0.25);
    // сблъсъкът с границите на света трябваше да се изключи
    Bunny.body.collideWorldBounds = false;
    
    Lola = game.add.sprite(200,100,'Lola');
	game.physics.p2.enable(Lola, false);
    Lola.body.clearShapes();
    Lola.body.loadPolygon("physics", "Lola");
    Lola.scale.setTo(0.25,0.25);
	Lola.body.collideWorldBounds = false;
	
    keyUp = game.input.keyboard.addKey(Phaser.KeyCode.UP);
    keyDown = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);
    keyW = game.input.keyboard.addKey(Phaser.KeyCode.W);
    keyS = game.input.keyboard.addKey(Phaser.KeyCode.S);
	spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
   	
	
	/*
	 let collisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();
    Bunny.body.setCollisionGroup(collisionGroup);
    Lola.body.setCollisionGroup(collisionGroup);
	T_Zamuk.body.setCollisionGroup(collisionGroup);
	R_Zamuk.body.setCollisionGroup(collisionGroup);
	Bomb.body.setCollisionGroup(collisionGroup);
    Bunny.body.collides(collisionGroup);
    Bunny.body.collides(collisionGroup, hit);*/
	
	
}


function myUpdateFunction() {
	var speed=15;
    
    // трябва да местин директно body-то, а не спрайта
    // Лола сме я ограничили до границите на света
	if (keyW.isDown) {
        Lola.body.y = Math.max(Lola.body.y - speed, 
            game.world.y + Lola.height / 2);
    }
    if (keyS.isDown) {
        Lola.body.y = Math.min(Lola.body.y + speed, 
            game.world.bounds.bottom - Lola.height / 2);
    }
	if (keyUp.isDown) {
        Bunny.body.y = Bunny.body.y - speed;
    }
    if (keyDown.isDown) {
        Bunny.body.y = Bunny.body.y + speed;
    }
	
}

function CreateBomb(){
	var Bomb = game.add.sprite(750, 320, 'Bomb', 1);
    Bomb.scale.setTo(0.03, 0.03);
    Bomb.anchor.x = 0.5;
    Bomb.checkWorldBounds = true;
    game.physics.enable(Bomb, Phaser.Physics.ARCADE);
    Bomb.body.collideWorldBounds = true;
    Bomb.body.velocity.y = -1000;
    Bomb.body.velocity.x = -150;
}