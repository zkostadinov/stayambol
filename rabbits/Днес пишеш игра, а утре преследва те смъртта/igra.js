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
            // game.debug.body(Bomb);
            // game.debug.body(Lola, '#000000', true);
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
    // сблъсъкът с границите на света трябваше да се изключи
    Bunny.body.collideWorldBounds = false;
    Bunny.body.static = true;
    
    Lola = game.add.sprite(200,100,'Lola');
	game.physics.p2.enable(Lola, false);
    Lola.body.clearShapes();
    Lola.body.loadPolygon("physics", "Lola");
    Lola.scale.setTo(0.25,0.25);
    Lola.body.collideWorldBounds = false;
    Lola.body.static = true;
	
    keyUp = game.input.keyboard.addKey(Phaser.KeyCode.UP);
    keyDown = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);
    keyW = game.input.keyboard.addKey(Phaser.KeyCode.W);
    keyS = game.input.keyboard.addKey(Phaser.KeyCode.S);
	spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    CreateBomb();    

    let collisionGroup = game.physics.p2.createCollisionGroup();
    // по подразбиране всичко е в една група
    // ако направим друга, трябва да накараме физиката да си създаде наново
    // game.physics.p2.boundsCollisionGroup и после да се сблъскваме с него
    game.physics.p2.updateBoundsCollisionGroup();
    Bunny.body.setCollisionGroup(collisionGroup);
    Lola.body.setCollisionGroup(collisionGroup);
    Bomb.body.setCollisionGroup(collisionGroup);
	// T_Zamuk.body.setCollisionGroup(collisionGroup);
	// R_Zamuk.body.setCollisionGroup(collisionGroup);
    Bomb.body.collides(collisionGroup);
    Bomb.body.collides(game.physics.p2.boundsCollisionGroup);
    Bunny.body.collides(collisionGroup);
    Lola.body.collides(collisionGroup);

    setContactMatherials();

    // включваме малко дебъгване тука
    Lola.body.debug = true;
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
	Bomb = game.add.sprite(750, 320, 'Bomb', 1);
    Bomb.scale.setTo(0.03, 0.03);
    Bomb.anchor.x = 0.5;
    // Bomb.checkWorldBounds = true;
    // game.physics.enable(Bomb, Phaser.Physics.ARCADE);
    game.physics.p2.enable(Bomb);
    Bomb.body.collideWorldBounds = true;
    Bomb.body.velocity.y = -100;
    Bomb.body.velocity.x = -150;
    // това е, за да не забавя движението в света
    Bomb.body.damping = 0;
    Bomb.body.mass= 0.1;
}

function setContactMatherials() {
    var spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', Bomb.body);
    Bunny.body.setMaterial(spriteMaterial);
    Lola.body.setMaterial(spriteMaterial);

    var worldMaterial = game.physics.p2.createMaterial('worldMaterial');

    //  4 trues = the 4 faces of the world in left, right, top, bottom order
    game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);

    //  Here is the contact material. It's a combination of 2 materials, so whenever shapes with
    //  those 2 materials collide it uses the following settings.
    //  A single material can be used by as many different sprites as you like.
    var contactMaterial = game.physics.p2.createContactMaterial(spriteMaterial, worldMaterial);

    contactMaterial.friction = 0.3;     // Friction to use in the contact of these two materials.
    contactMaterial.restitution = 1.0;  // Restitution (i.e. how bouncy it is!) to use in the contact of these two materials.
    contactMaterial.stiffness = 1e7;    // Stiffness of the resulting ContactEquation that this ContactMaterial generate.
    contactMaterial.relaxation = 3;     // Relaxation of the resulting ContactEquation that this ContactMaterial generate.
    contactMaterial.frictionStiffness = 1e7;    // Stiffness of the resulting FrictionEquation that this ContactMaterial generate.
    contactMaterial.frictionRelaxation = 3;     // Relaxation of the resulting FrictionEquation that this ContactMaterial generate.
    contactMaterial.surfaceVelocity = 0;        // Will add surface velocity to this material. If bodyA rests on top if bodyB, and the surface velocity is positive, bodyA will slide to the right.
}