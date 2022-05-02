class PlayingScene extends Phaser.Scene {
    constructor() {
        super("playingScene");
    }

    preload() {
        this.load.atlas('Gerrard_atlas', './assets/Gerrad.png', './assets/Gerrad.json');
        this.load.atlas('gerald_atlas', './assets/gerald.png', './assets/gerald.json');
        this.load.atlas('main_atlas', './assets/main.png', './assets/main.json');

        this.load.image('platform', './assets/PLAT.png');
        this.load.image('Wall', './assets/Wall.png');
        this.load.image('NSWall', './assets/VWall.png');
        this.load.image('Spikes', './assets/Spike.png');
        this.load.image('Toast', './assets/toast.png');
    
        this.load.image('middleground', './assets/MiddleGround.png');
        this.load.image('foreground', './assets/ForeGround.png');
        this.load.image('background', './assets/BG_New.png');

        this.load.audio('slideSound', './assets/slideSound.wav');
        this.load.audio('ToastCollection', './assets/ToastCollection.wav');
        this.load.audio('FlutterJump', './assets/FlutterJump.wav');
        this.load.audio('GroundJump', './assets/GroundJump.wav');
        this.load.audio('HurtVoice', './assets/HurtVoice.wav');
        this.load.audio('BackgroundMusic', './assets/BGmusic.wav');


    }


    create() {

        mnMusic.stop();
        bkMusic = this.sound.add('BackgroundMusic',{volume: 0.3});
        bkMusic.loop = true; // Sets Loop
        bkMusic.play();

        this.anims.create({ 
            key: 'mainIdleMovement', 
            frames: this.anims.generateFrameNames('main_atlas', {      
                prefix: 'Idle-',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 1
            }), 
            frameRate: 5,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'mainHitMovement', 
            frames: this.anims.generateFrameNames('main_atlas', {      
                prefix: 'Ouch-',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 1
            }), 
            frameRate: 15,
            repeat: 0 
        });
        this.anims.create({ 
            key: 'mainRunMovement', 
            frames: this.anims.generateFrameNames('main_atlas', {      
                prefix: 'Run-',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 1
            }), 
            frameRate: 15,
            repeat: 0 
        });

        this.anims.create({ 
            key: 'geraldMovement', 
            frames: this.anims.generateFrameNames('gerald_atlas', {      
                prefix: 'gerald',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 2
            }), 
            frameRate: 5,
            repeat: -1 
        });



        this.anims.create({ 
            key: 'GerrardMovement', 
            frames: this.anims.generateFrameNames('Gerrard_atlas', {      
                prefix: 'Gerrard--',
                start: 1,
                end: 9,
                suffix: '',
                zeroPad: 1
            }), 
            frameRate: 10,
            repeat: -1 
        });
        


        //background
        this.background = this.add.tileSprite(0,0,4800*2,2700, 'background').setOrigin(0,0)
        this.foreground = this.add.tileSprite(0,0,4800*2,2700, 'foreground').setScale(.2).setOrigin(0,0);
        this.middleground = this.add.tileSprite(0,0,4800*2,2700, 'middleground').setScale(.2).setOrigin(0,0);
        this.physics.add.existing(this.foreground);
        this.physics.add.existing(this.middleground);
        this.physics.add.existing(this.background);


        this.backgrounds = this.physics.add.group({ allowGravity: false, immovable: true });
        this.backgrounds.add(this.foreground);
        this.backgrounds.add(this.middleground);
        this.backgrounds.add(this.background);
        this.backgrounds.depth = 1;


        //spawn in player
        this.player = new Player(this, 300, 442, 'main_atlas','Idle-1');
        //this.add.sprite(300, 200).play('GerrardMovement');

        //initialize controls
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keySlide = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        spawn = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        //spawn gerald
        this.gerald = new Gerald(this, -100, 100, 'gerald_atlas', 0).setOrigin(0, 0).setPushable(false).setScale(.2, .2);
        this.gerald.body.setOffset(-300,0);
        //ends game if hits gerald
        this.physics.add.overlap(this.player, this.gerald, function () {
            isGameOver = true;
        });
        this.gerald.depth = 3;

    
        

        //so player will fall through the ground
        this.physics.world.setBoundsCollision(true, true, true, true);

        //increase speed of platforms as time goes
        this.speeed();

        //spawn starting platform
        this.obs6();
        

    }//end of create

    update(time, delta) {
        this.gerald.anims.play('geraldMovement', true);
        //console.log(this.player.isIdle);


        //switch case for animation
        switch(this.player.state){
            case 0:
                //idle
                this.player.anims.play('mainIdleMovement', true);
                this.player.body.setSize(500, 1000);
                
                    break;
            case 1:
                
                //got hit
                this.player.anims.play('mainHitMovement', true);
                
                this.player.body.setOffset(700, 200);
                break;
            case 2:
                this.player.anims.play('mainRunMovement', true);
                
                this.player.body.setSize(500, 1000);
                this.player.body.setOffset(700, 120);
                
                break;

        }
        

        //If Middleground goes off screen loop back
        this.foreground.body.velocity.x = pspeed/2;
        this.middleground.body.velocity.x = pspeed;
        this.background.body.velocity.x = pspeed/3;
        
        if(this.foreground.body.x + this.foreground.body.width < game.config.width){
            this.foreground.body.x = 0;
        }
        if(this.middleground.body.x + this.middleground.body.width < game.config.width){
            this.middleground.body.x = 0;
        }
        if(this.background.body.x + this.background.body.width < game.config.width){
            this.background.body.x = 0;
        }

        //if player is under the map game over
        if (this.player.body.y > game.config.height + this.player.body.height) {
            isGameOver = true;
        }

        //spawn new platform
        if (shouldSpawnP) {
            shouldSpawnP = false;

            switch (Math.floor(Math.random() * 6)) {
                case 0:
                    this.obs1();
                    console.log("0");
                    break;
                case 1:
                    this.obs2();
                    console.log("1");
                    break;
                case 2:
                    this.obs3();
                    console.log("2");
                    break;
                case 3:
                    this.obs4();
                    console.log("3");
                    break;
                case 4:
                    this.obs5();
                    console.log("4");
                    break;
                case 5:
                    this.obs6();
                    console.log("t");
                    break;
                case 6:
                    this.obs7();
                    console.log("6");
                    break;
                case 7:
                    this.obs8();
                    console.log("7");
                    break;
                case 8:
                    this.obs9();
                    console.log("8");
                    break;
                case 9:
                    this.obs10();
                    console.log("9");
                    break;
                case 10:
                    this.obs11();
                    console.log("10");
            }
        }

        //update prefab
        this.player.update(time, delta);
        this.gerald.update();

        //spawn minions test
        if (spawn.isDown) {
            //This is the path the sprite will follow
            this.points = [1100, 400, 800, 500, 350, 300, 50, 400, 200, 400]
            this.makeSmolG(0.05,this.points);

        }
        if (isGameOver) {
            this.scene.start("end");
        }

    }//end of update

    //add speed as game goes on
    speeed() {
        this.clock = this.time.delayedCall(10000, () => {

            pspeed = pspeed - 20;
            
            if (pspeed > MaxPSpeed) {
                console.log("speed is increased, current speed:", + pspeed);
                this.speeed();
            }

        }, null, this);
    }
    //create small g
    makeSmolG(speed,points){

        this.smallG = this.physics.add.group({ allowGravity: false, immovable: true });
        this.path = new Path(this, 1000, 300, 'Gerrard_atlas','Gerrard--1', speed, points,this.player).setScale(.05);
        this.path.anims.play('GerrardMovement', true);
        
        this.smallG.add(this.path, true);

        this.smallG.runChildUpdate = true;

    }

    starting() {
        this.startp = this.physics.add.group({ allowGravity: false, immovable: true});
        //this.startingP = new Wall(this, 0, 500, 'platform', true).setOrigin(0, 0).setPushable(false).setScale(5, 1);

        this.startingP = new Walla(this, 0, 500,platsizeX*5,platsizeY, 'platform', true).setOrigin(0, 0);

        this.startp.add(this.startingP);
        this.startp.runChildUpdate = true;

        this.physics.add.collider(this.player, this.startingP);
    }

    obs1() {

        this.group = this.physics.add.group({ allowGravity: false, immovable: true });
        this.wall1 = new Walla(this, 100 + game.config.width, 500,platsizeX*2,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall2 = new Walla(this, 500 + game.config.width, 320,platsizeX*3,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall3 = new Walla(this, 900 + game.config.width, 500,platsizeX*2,platsizeY, 'platform', true).setOrigin(0, 0);

        this.group.add(this.wall1);
        this.group.add(this.wall2);
        this.group.add(this.wall3);
        this.group.runChildUpdate = true;

        this.physics.add.collider(this.player, this.group);

    }

    obs2() {
        this.group = this.physics.add.group({ allowGravity: false, immovable: true });
        this.wall1 = new Walla(this, 100 + game.config.width, 500,platsizeX*2,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall2 = new Walla(this, 400 + game.config.width, 400,platsizeX*2,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall3 = new Walla(this, 700 + game.config.width, 300,platsizeX*2,platsizeY, 'platform', true).setOrigin(0, 0);

        this.group.add(this.wall1);
        this.group.add(this.wall2);
        this.group.add(this.wall3);
        this.group.runChildUpdate = true;

        this.physics.add.collider(this.player, this.group);

    }

    obs3() {
        this.group = this.physics.add.group({ allowGravity: false, immovable: true });

        this.group2 = this.physics.add.group({ allowGravity: false });

        this.wall1 = new Walla(this, 100 + game.config.width, 400,platsizeX*.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall2 = new Walla(this, 300 + game.config.width, 400,platsizeX*.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall3 = new Walla(this, 500 + game.config.width, 400,platsizeX*.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall4 = new Walla(this, 700 + game.config.width, 400,platsizeX*.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall5 = new Walla(this, 900 + game.config.width, 400,platsizeX*.5,platsizeY, 'platform', true).setOrigin(0, 0);

        this.toast1 = new Toast(this, 600 + game.config.width, 450, 'Toast',this.player, false).setOrigin(0, 0).setPushable(false).setScale(1, 1);

        this.group.add(this.wall1);
        this.group.add(this.wall2);
        this.group.add(this.wall3);
        this.group.add(this.wall4);
        this.group.add(this.wall5);

        this.group2.add(this.toast1);

        this.group.runChildUpdate = true;
        this.group2.runChildUpdate = true;

        this.physics.add.collider(this.player, this.group);

    }

    obs4(){

        this.group = this.physics.add.group({ allowGravity: false, immovable: true });
        this.group2 = this.physics.add.group({ allowGravity: false });

        this.wall1 = new Walla(this, 100 + game.config.width, 400,platsizeX*3,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall2 = new Wall(this, 700 + game.config.width, 130, 'Wall', false).setOrigin(0, 0).setScale(2);
        this.wall3 = new Walla(this, 1000 + game.config.width, 400,platsizeX*2,platsizeY, 'platform', true).setOrigin(0, 0);


        this.toast1 = new Toast(this, 1000 + game.config.width, 250, 'Toast', this.player, false).setOrigin(0, 0).setPushable(false).setScale(1, 1);

        this.group.add(this.wall1);
        this.group.add(this.wall2);
        this.group.add(this.wall3);

        this.group2.add(this.toast1);

        this.group.runChildUpdate = true;
        this.group2.runChildUpdate = true;
        
        this.physics.add.collider(this.player, this.group);
    }

    obs5() {
        this.group = this.physics.add.group({ allowGravity: false, immovable: true });
        this.wall1 = new Walla(this, 100 + game.config.width, 500,platsizeX*5,platsizeY, 'platform', true).setOrigin(0, 0);
        this.toast1 = new Toast(this, 400 + game.config.width, 290, 'Toast', this.player, false).setOrigin(0.5, 0.5).setPushable(false).setScale(1, 1);
        this.spike1 = new Trap(this, 400 + game.config.width, this.toast1.y + this.toast1.height, 'Spikes', this.player).setOrigin(0.5, 0.5).setPushable(false).setScale(2, 2);
        this.spike2 = new Trap(this, 400 + game.config.width, this.toast1.y - this.toast1.height, 'Spikes', this.player).setOrigin(0.5, 0.5).setPushable(false).setScale(2, 2);

        this.group.add(this.wall1);
        this.group.add(this.toast1);
        this.group.add(this.spike1);
        this.group.add(this.spike2);
        this.group.runChildUpdate = true;

        this.physics.add.collider(this.player, this.group);

    }
    obs6(){
        this.group = this.physics.add.group({ allowGravity: false, immovable: true });
        this.wall1 = new Walla(this, game.config.width, 500,platsizeX*5,platsizeY, 'platform', true).setOrigin(0, 0);

        this.group.add(this.wall1);
        this.group.runChildUpdate = true;

        this.makeSmolG(0.001,[game.config.width*2, game.config.height*2, 700, 500, 350, 300, 0, 500 ]);
        this.makeSmolG(0.001,[game.config.width*2, game.config.height*2, 700, 300, 350, 500, 0, 300 ]);

        this.physics.add.collider(this.player, this.group);
    }
    obs7(){
        this.group = this.physics.add.group({ allowGravity: false, immovable: true });
        this.mainpath = new Walla(this, game.config.width, 300,platsizeX*3,platsizeY, 'platform', false).setOrigin(0, 0);

        this.pathEasy = new Walla(this, 800 + game.config.width, 150,platsizeX*7.75,platsizeY, 'platform', false).setOrigin(0, 0);
        this.pathHard1 = new Walla(this, 700 + game.config.width, 500,platsizeX*1.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.pathHard2 = new Walla(this, 1200 + game.config.width, 500,platsizeX*1.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.pathHard3 = new Walla(this, 1700 + game.config.width, 500,platsizeX*1.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.pathHard4 = new Walla(this, 2100 + game.config.width, 350,platsizeX*1.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.FinalPath = new Walla(this, 2500 + game.config.width, 500,platsizeX*3,platsizeY, 'platform', true).setOrigin(0, 0);

        this.group.add(this.pathEasy);
        this.group.add(this.pathHard1);
        this.group.add(this.pathHard2);
        this.group.add(this.pathHard3);
        this.group.add(this.pathHard4);
        this.group.add(this.mainpath);
        this.group.add(this.FinalPath);
        this.group.runChildUpdate = true;

        this.physics.add.collider(this.player, this.group);
    }
    obs8(){
        this.group = this.physics.add.group({ allowGravity: false, immovable: true });
        this.Vwall = new Wall(this, 510 + game.config.width, 320, 'NSWall', false).setOrigin(0, 0);
        this.wall1 = new Walla(this, 142 + game.config.width, 500,platsizeX*2.01,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall2 = new Walla(this, 512 + game.config.width, 320,platsizeX*1.5,platsizeY, 'platform', true).setOrigin(0, 0);

        this.spike1 = new Trap(this, 732 + game.config.width, this.wall2.y - 15, 'Spikes', this.player).setOrigin(0.5, 0.5).setPushable(false).setScale(2, 2);
        this.spike2 = new Trap(this, 762 + game.config.width, this.wall2.y - 15, 'Spikes', this.player).setOrigin(0.5, 0.5).setPushable(false).setScale(2, 2);

        this.group.add(this.wall1);
        this.group.add(this.wall2);
        this.group.add(this.Vwall);
        this.group.add(this.spike1);
        this.group.add(this.spike2);

        this.group.runChildUpdate = true;

        this.physics.add.collider(this.player, this.group);
    }

    obs9(){
        this.group = this.physics.add.group({ allowGravity: false, immovable: true });
        this.start = new Walla(this, 100 + game.config.width, 300,platsizeX*5,platsizeY, 'platform', false).setOrigin(0, 0);
        
        this.group.add(this.start);
        this.group.runChildUpdate = true;

        ht1 = Phaser.Math.Between(0, 1);
        ht2 = Phaser.Math.Between(0, 1);
        ht3 = Phaser.Math.Between(0, 1);
    
        this.makeSmolG(0.003,[game.config.width*2, game.config.height/2 - (100 * ht1) , 0, game.config.height/2 - (100 * ht1)]);
        this.makeSmolG(0.002,[game.config.width*3, game.config.height/2 - (100 * ht2), 0, game.config.height/2 - (100 * ht2)]);
        this.makeSmolG(0.0015,[game.config.width*6, game.config.height/2 - (100 * ht3), 0, game.config.height/2 - (100 * ht3)]);

        this.physics.add.collider(this.player, this.group);
    }

    obs10(){
        this.group = this.physics.add.group({ allowGravity: false, immovable: true });
        
        this.wall1 = new Walla(this, 142 + game.config.width, 500,platsizeX*2.01,platsizeY, 'platform', false).setOrigin(0, 0);
        this.step1 = new Wall(this, 610 + game.config.width, 320, 'NSWall', false).setOrigin(0, 0);
        this.step2 = new Wall(this, 660 + game.config.width, 280, 'NSWall', false).setOrigin(0, 0);
        this.step3 = new Wall(this, 710 + game.config.width, 240, 'NSWall', false).setOrigin(0, 0);
        this.wall2 = new Walla(this, 852 + game.config.width, 180,platsizeX*1.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall3 = new Walla(this, 852 + game.config.width, 180,platsizeX*1.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall3 = new Walla(this, 852 + game.config.width, 180,platsizeX*1.5,platsizeY, 'platform', false).setOrigin(0, 0);

        this.group.add(this.wall1);
        this.group.add(this.step1);
        this.group.add(this.step2);
        this.group.add(this.step3);
        this.group.add(this.wall2);
        this.group.add(this.wall3);
        this.group.runChildUpdate = true;

      

        this.physics.add.collider(this.player, this.group);
    }
    obs11(){

        this.group = this.physics.add.group({ allowGravity: false, immovable: true });
        
        this.wall1 = new Walla(this, 142 + game.config.width, 500,platsizeX*2.01,platsizeY, 'platform', false).setOrigin(0, 0);
        this.step1 = new Wall(this, 610 + game.config.width, 320, 'NSWall', false).setOrigin(0, 0);
        this.wall2 = new Walla(this, 852 + game.config.width, 180,platsizeX*1.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall3 = new Walla(this, 852 + game.config.width, 180,platsizeX*1.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall3 = new Walla(this, 852 + game.config.width, 180,platsizeX*1.5,platsizeY, 'platform', false).setOrigin(0, 0);

        this.group.add(this.wall1);
        this.group.add(this.step1);
        this.group.add(this.step2);
        this.group.add(this.step3);
        this.group.add(this.wall2);
        this.group.add(this.wall3);
        this.group.runChildUpdate = true;

        this.physics.add.collider(this.player, this.group);

    }
}
