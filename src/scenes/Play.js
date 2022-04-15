class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/CoreFighter2.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('pilot', './assets/pilot.png');
        this.load.image('boom', './assets/boom.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 100, frameHeight: 60, startFrame: 0, endFrame: 4});
    }

    

    create() {
        this.cur_time = 0;
        this.sound.play('sfx_background');

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        //starfield
        // green UI background
        //this.add.rectangle(0, borderUISize, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        //this.r1 = this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        //this.r1.depth = 2;

        //this.r2 =this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        //this.r2.depth = 2;

        //this.r3 =this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        //this.r3.depth = 2;

        //this.r4 =this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        //this.r4.depth = 2;

        // add Rocket (p1)
        this.p1Rocket = new Rocket(this, 480,342, 'rocket').setOrigin(0.5, 0);

        // add Spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width, 80, 'spaceship', 0, 100).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, 80*1.6, 'spaceship', 0, 50).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width + borderUISize*6, 80*2.3, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship01.setScale(0.8);
        //this.ship02.setScale(1);
        this.ship03.setScale(1.2);

        //pilot screen
        this.pilot = this.add.sprite(0, 0, 'pilot').setOrigin(0,0);
        this.pilot.depth = 2;

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 4, first: 0}),
            frameRate: 5
        });

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            //backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            //fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding,game.config.height- borderUISize*4, "Score:"+ this.p1Score, scoreConfig);
        
        //var time = new Date();
        this.see_delta = this.add.text(borderUISize + borderPadding, game.config.height - borderUISize*5, "delta", scoreConfig);
        this.see_time = this.add.text(borderUISize + borderPadding,game.config.height - borderUISize*6, "HighScore:" + high_score, scoreConfig);
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            if (this.p1Score > high_score) high_score = this.p1Score;
            game.settings.spaceshipSpeed = game.settings.spaceshipSpeed-2;
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            
        }, null, this);

        for(let i = 1; i <= game.settings.gameTimer/1000; i++){

            this.clock = this.time.delayedCall(1000*i, () => {
                this.cur_time++;

            }, null, this);
        }

        this.clock = this.time.delayedCall(30000, () => {
            
            game.settings.spaceshipSpeed = game.settings.spaceshipSpeed+2;
            
            

        }, null, this);

        var particles = this.add.particles('boom');

        this.emitter = particles.createEmitter({
            x: 100,
            y: 100,
            speed: 400,
            frequency: 100,
            angle: { min: -30, max: 30 },
            quantity: 0,
            lifespan: { min: 100, max: 300 },
            blendMode: 'ADD'
        });
        
        
    }

    update(delta) {

        if(60 - this.cur_time < 61)
        this.see_delta.text = "Time left:"+ (game.settings.gameTimer/1000 - this.cur_time); 
    
        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.game.sound.stopAll();
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.game.sound.stopAll();
            this.scene.start("menuScene");
        }


        this.starfield.tilePositionX -= 4;  // update tile sprite

        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
             this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship,scale) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {

        this.emitter.setPosition(ship.x+ship.width/2, ship.y+ship.height/2);

        this.emitter.setQuantity(.1);
        
        this.clock = this.time.delayedCall(500, () => {this.emitter.setQuantity(0);}, null, this);
    
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = "Score:" + this.p1Score; 
        
        this.sound.play('sfx_explosion');
        
        

      }
}