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
            game.debug.bodyInfo(Bunny, 100, 100);
        }
    }
);

function myCreateFunction() {        
				
	game.stage.backgroundColor='#FFC0CB';
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.setImpactEvents(true);
	game.physics.p2.gravity.x = 0;
	game.physics.p2.gravity.y = 0;

	
	
	
	Bunny = game.add.sprite(1200,100,'Bunny');
	game.physics.p2.enable(Bunny, false);
    Bunny.body.clearShapes();
    Bunny.body.loadPolygon("physics", "Bunny");
	Bunny.scale.setTo(0.25,0.25);
	// Bunny.body.collideWorldBounds = true;
	
	
	
	/*
	Lola = game.add.sprite(300,320,'Lola',1);
	Lola.scale.setTo(0.3,0.3);
	
	Lola.anchor.x = 0.5;
	Lola.anchor.y = 0.5;
	*/
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
	var speed=600;
    
	if (keyW.isDown) {
       Lola.body.velocity.x = 0;
       Lola.body.velocity.y = -speed;
    }
    if (keyS.isDown) {
       Lola.body.velocity.x = 0;
       Lola.body.velocity.y = speed;
    }
	if (keyUp.isDown) {
       Bunny.body.velocity.x = 0;
       Bunny.body.velocity.y = -speed;
    }
    if (keyDown.isDown) {
       Bunny.body.velocity.x = 0;
       Bunny.body.velocity.y = speed;
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