class PlayingScene extends Phaser.Scene {
    constructor() {
        super("playingScene");
    }

    create() {
        
        this.game.sound.stopAll();
        bkMusic = this.sound.add('BackgroundMusic',{volume: 0.3});
        bkMusic.loop = true; // Sets Loop
        bkMusic.play();

        this.anims.create({ 
            key: 'getToast', 
            frames: this.anims.generateFrameNames('gettoast_atlas', {      
                prefix: 'Toast-Collected-',
                start: 1,
                end: 7,
                suffix: '',
                zeroPad: 1
            }), 
            frameRate: 30,
            repeat: 0 
        });

        this.anims.create({ 
            key: 'Toast', 
            frames: this.anims.generateFrameNames('toast_atlas', {      
                prefix: 'Toast-',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 1
            }), 
            frameRate: 5,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'slide', 
            frames: this.anims.generateFrameNames('main_atlas', {      
                prefix: 'slide_',
                start: 1,
                end: 15,
                suffix: '',
                zeroPad: 3
            }), 
            frameRate: 50,
            repeat: 0 
        });

        this.anims.create({ 
            key: 'jumpMovement', 
            frames: this.anims.generateFrameNames('main_atlas', {      
                prefix: 'jump_',
                start: 1,
                end: 13,
                suffix: '',
                zeroPad: 3
            }), 
            frameRate: 20,
            repeat: 0 
        });

        this.anims.create({ 
            key: 'mainIdleMovement', 
            frames: this.anims.generateFrameNames('main_atlas', {      
                prefix: 'idle_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 3
            }), 
            frameRate: 5,
            repeat: -1 
        });
        this.anims.create({ 
            key: 'mainHitMovement', 
            frames: this.anims.generateFrameNames('main_atlas', {      
                prefix: 'ouch_',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 3
            }), 
            frameRate: 15,
            repeat: 0 
        });
        this.anims.create({ 
            key: 'mainRunMovement', 
            frames: this.anims.generateFrameNames('main_atlas', {      
                prefix: 'run_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 3
            }), 
            frameRate: 5,
            repeat: 0 
        });
        this.anims.create({ 
            key: 'mainRunMovement2', 
            frames: this.anims.generateFrameNames('main_atlas', {      
                prefix: 'run_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 3
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
        this.player = new Player(this, 300, 442, 'main_atlas','idle_001').setScale(.5);
        
        //this.add.sprite(300, 200).play('GerrardMovement');

        //score set up
        this.player.score = 0;
        this.scoreText = this.add.bitmapText(50, 50, 'bm', 'Score: ' + this.player.score, 24).setDepth(2);

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
        this.physics.world.setBoundsCollision(true, true, true, false);

        //increase speed of platforms as time goes
        this.speeed();

        //spawn starting platform
        this.starting();
        

    }//end of create

    update(time, delta) {
        this.gerald.anims.play('geraldMovement', true);
        //console.log(this.player.isIdle);

        //update score
        this.player.score += delta/1000;
        this.scoreText.text = 'Score: ' + (this.player.score + nubToast*10).toFixed(0);

    
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

            switch (Math.floor(Math.random() * 14)) {
                case 0:
                    this.obs1();
                    console.log("0 is OK");
                    break;
                case 1:
                    this.obs2();
                    console.log("1 is OK");
                    break;
                case 2:
                    this.obs3();
                    console.log("2 is OK");
                    break;
                case 3:
                    this.obs4();
                    console.log("3 is Ok");
                    break;
                case 4:
                    this.obs5();
                    console.log("4 is Ok");
                    break;
                case 5:
                    this.obs6();
                    console.log("5 is Ok");
                    break;
                case 6:
                    this.obs7();
                    console.log("6");
                    break;
                case 7:
                    this.obs8();
                    console.log("7 is OK");
                    break;
                case 8:
                    this.obs9();
                    console.log("8 is OK");
                    break;
                case 9:
                    this.obs10();
                    console.log("9 is OK");
                    break;
                case 10:
                    this.obs11();
                    console.log("10 is OK");
                    break;
                case 11:
                    this.obs12();
                    console.log("11 is OK");
                    break;
                case 12: 
                    this.obs13();
                    console.log("12 is done");
                    break;
                case 13:
                    this.obs14();
                    console.log('13 needs Mini Gerald looked at');
                    break;
                case 14:
                    this.obs15();
                    console.log("14 is OK");
            }
        }

        //update prefab
        this.player.update(time, delta);
        this.gerald.update();

        //spawn minions test
        if (spawn.isDown) {
            //This is the path the sprite will follow
            this.points = [1100, 400, 800, 500, 350, 300, 50, 400, 200, 400]
            this.makeSmolG(0.05*(pspeed*-.01),this.points);

        }
        if (isGameOver) {
            runScore = this.player.score + nubToast*10;
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

    //add to score when collecting toast
    toastScore() {
        this.player.score += 10;
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
        this.wall1 = new Walla(this, 200 + game.config.width, 500,platsizeX*2,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall2 = new Walla(this, 500 + game.config.width, 320,platsizeX*2,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall3 = new Walla(this, 1050 + game.config.width, 500,platsizeX*2,platsizeY, 'platform', true).setOrigin(0, 0);

        this.Vwall = new Wall(this, 675 + game.config.width, 80, 'Wall', false).setOrigin(.5, 0).setScale(.2);

        this.spike1 = new Trap(this, 400 + game.config.width, this.wall1.y - 25, 'Spikes', this.player).setOrigin(0.5,0.5).setPushable(false).setScale(0.1,0.1);
        this.spike2 = new Trap(this, 1250 + game.config.width, this.wall3.y - 25, 'Spikes', this.player).setOrigin(0.5,0.5).setPushable(false).setScale(0.1,0.1);

        

        this.group.add(this.wall1);
        this.group.add(this.wall2);
        this.group.add(this.wall3);
        this.group.add(this.Vwall);
        this.group.add(this.spike1);
        this.group.add(this.spike2);
        
        this.group.runChildUpdate = true;

        this.physics.add.collider(this.player, this.group);

    }

    obs2() {
        this.group = this.physics.add.group({ allowGravity: false, immovable: true });
        this.wall1 = new Walla(this, 200 + game.config.width, 500,platsizeX*1.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall2 = new Walla(this, 500 + game.config.width, 400,platsizeX*1.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall3 = new Walla(this, 800 + game.config.width, 300,platsizeX*1.5,platsizeY, 'platform', true).setOrigin(0, 0);

        this.spike1 = new Trap(this, 450 + game.config.width, this.wall1.y - 25, 'Spikes', this.player).setOrigin(0.5,0.5).setPushable(false).setScale(0.1,0.1);
        this.spike2 = new Trap(this, 750 + game.config.width, this.wall2.y - 25, 'Spikes', this.player).setOrigin(0.5,0.5).setPushable(false).setScale(0.1,0.1);
        this.spike3 = new Trap(this, 1050 + game.config.width, this.wall3.y - 25, 'Spikes', this.player).setOrigin(0.5,0.5).setPushable(false).setScale(0.1,0.1);


        this.group.add(this.wall1);
        this.group.add(this.wall2);
        this.group.add(this.wall3);
        this.group.add(this.spike1);
        this.group.add(this.spike2);
        this.group.add(this.spike3);
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

        this.toast1 = new Toast(this, 600 + game.config.width, 450, 'toast_atlas',this.player, false).setOrigin(0, 0).setPushable(false).setScale(.1, .1);

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
        this.wall2 = new Wall(this, 700 + game.config.width, 150, 'Wall', false).setOrigin(.5, 0).setScale(.2);
        this.wall3 = new Walla(this, 1000 + game.config.width, 400,platsizeX*2,platsizeY, 'platform', true).setOrigin(0, 0);


        this.toast1 = new Toast(this, 1000 + game.config.width, 250, 'toast_atlas', this.player, false).setOrigin(0, 0).setPushable(false).setScale(.1, .1);

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
        this.toast1 = new Toast(this, 400 + game.config.width, 290, 'toast_atlas', this.player, false).setOrigin(0.5, 0.5).setPushable(false).setScale(.1, .1);
        this.spike1 = new Trap(this, 400 + game.config.width, 500, 'Spikes', this.player).setOrigin(0.5, 1).setPushable(false).setScale(.1, .1);
        this.spike2 = new Trap(this, 800 + game.config.width, 500, 'Spikes', this.player).setOrigin(0.5, 1).setPushable(false).setScale(.1, .1);

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

        this.makeSmolG(0.001*(-(pspeed / 100)),[game.config.width*2, game.config.height*2, 700, 500, 350, 300, 0, 500 ]);
        this.makeSmolG(0.001*(-(pspeed / 100)),[game.config.width*2, game.config.height*2, 700, 300, 350, 500, 0, 300 ]);

        this.physics.add.collider(this.player, this.group);
    }
    obs7(){
        this.group = this.physics.add.group({ allowGravity: false, immovable: true });
        
        this.mainpath = new Walla(this, game.config.width + 50, 320,platsizeX*3,platsizeY, 'platform', false).setOrigin(0, 0);
        
        this.pathEasy = new Walla(this, 800 + game.config.width, 175,platsizeX*7.75,platsizeY, 'platform', false).setOrigin(0, 0);
        this.pathHard1 = new Walla(this, 700 + game.config.width, 500,platsizeX*1.75,platsizeY, 'platform', false).setOrigin(0, 0);
        this.pathHard2 = new Walla(this, 1200 + game.config.width, 500,platsizeX*1.75,platsizeY, 'platform', false).setOrigin(0, 0);
        this.pathHard3 = new Walla(this, 1700 + game.config.width, 500,platsizeX*1.75,platsizeY, 'platform', false).setOrigin(0, 0);
        this.pathHard4 = new Walla(this, 2100 + game.config.width, 350,platsizeX*1.75,platsizeY, 'platform', false).setOrigin(0, 0);
        this.FinalPath = new Walla(this, 2500 + game.config.width, 500,platsizeX*3,platsizeY, 'platform', true).setOrigin(0, 0);

        this.Vwall = new Wall(this, this.mainpath.x + 350, 75, 'Wall', false).setOrigin(.5, 0).setScale(.2);
        this.Vwall2 = new Wall(this, this.FinalPath.x - 75, 105, 'Wall', false).setOrigin(.5, 0).setScale(.2);

        this.spike1 = new Trap(this, 1080 + game.config.width, this.pathEasy.y - 25, 'Spikes', this.player).setOrigin(0.5,0.5).setPushable(false).setScale(0.1,0.1);
        this.spike2 = new Trap(this, 1480 + game.config.width, this.pathEasy.y - 25, 'Spikes', this.player).setOrigin(0.5,0.5).setPushable(false).setScale(0.1,0.1);
        this.spike3 = new Trap(this, 1880 + game.config.width, this.pathEasy.y - 25, 'Spikes', this.player).setOrigin(0.5,0.5).setPushable(false).setScale(0.1,0.1);
        this.spike4 = new Trap(this, 1350 + game.config.width, this.pathHard3.y - 25, 'Spikes', this.player).setOrigin(0.5,0.5).setPushable(false).setScale(0.1,0.1);

        this.toast1 = new Toast(this, 2200 + game.config.width, this.pathEasy.y - 40, 'toast_atlas', this.player, false).setOrigin(0.5, 0.5).setPushable(false).setScale(.1, .1);

        this.group.add(this.pathEasy);
        this.group.add(this.pathHard1);
        this.group.add(this.pathHard2);
        this.group.add(this.pathHard3);
        this.group.add(this.pathHard4);
        this.group.add(this.mainpath);
        this.group.add(this.FinalPath);
        this.group.add(this.Vwall);
        this.group.add(this.Vwall2);
        this.group.add(this.spike1);
        this.group.add(this.spike2);
        this.group.add(this.spike3);
        this.group.add(this.spike4);
        this.group.add(this.toast1);
        this.group.runChildUpdate = true;

        this.physics.add.collider(this.player, this.group);
    }
    obs8(){
        this.group = this.physics.add.group({ allowGravity: false, immovable: true });
        this.Vwall = new Wall(this, 720 + game.config.width, 260, 'Wall', false).setOrigin(.5, 0).setScale(.2);
      
        this.wall1 = new Walla(this, game.config.width + 200, 500,platsizeX*5,platsizeY, 'platform', true).setOrigin(0, 0);
        this.spike1 = new Trap(this, 1102 + game.config.width, this.wall1.y - 25, 'Spikes', this.player).setOrigin(0.5, 0.5).setPushable(false).setScale(.1,.1);
        this.spike2 = new Trap(this, 1157 + game.config.width, this.wall1.y - 25, 'Spikes', this.player).setOrigin(0.5, 0.5).setPushable(false).setScale(.1,.1);
        this.spike3 = new Trap(this, 452 + game.config.width, this.wall1.y - 25, 'Spikes', this.player).setOrigin(0.5, 0.5).setPushable(false).setScale(.1,.1);

        this.group.add(this.wall1);
        this.group.add(this.Vwall);
        this.group.add(this.spike1);
        this.group.add(this.spike2);
        this.group.add(this.spike3);

        this.group.runChildUpdate = true;

        this.physics.add.collider(this.player, this.group);
    }

    obs9(){
        this.group = this.physics.add.group({ allowGravity: false, immovable: true });
        this.start = new Walla(this, 100 + game.config.width, 350,platsizeX*5,platsizeY, 'platform', true).setOrigin(0, 0);
        
        this.group.add(this.start);
        this.group.runChildUpdate = true;

        ht1 = Phaser.Math.Between(0, 1);
        ht2 = Phaser.Math.Between(0, 1);
        ht3 = Phaser.Math.Between(0, 1);
    
        this.makeSmolG(0.003*(-(pspeed / 100)),[game.config.width*2, game.config.height/2 + 60 - (50 * ht1) , 0, game.config.height/2 + 60 - (50 * ht1)]);
        this.makeSmolG(0.002*(-(pspeed / 100)),[game.config.width*3, game.config.height/2 + 60 - (50 * ht2), 0, game.config.height/2 + 60 - (50 * ht2)]);
        this.makeSmolG(0.0015*(-(pspeed / 100)),[game.config.width*6, game.config.height/2 + 60 - (50 * ht3), 0, game.config.height/2 + 60 - (50 * ht2)]);

        this.physics.add.collider(this.player, this.group);
    }

    obs10(){
        this.group = this.physics.add.group({ allowGravity: false, immovable: true });
        
        this.wall1 = new Walla(this, 142 + game.config.width, 350,platsizeX*2.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall2 = new Walla(this, 652 + game.config.width, 180,platsizeX*2.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall3 = new Walla(this, 1142 + game.config.width, 350,platsizeX*2.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall4 = new Walla(this, 1652 + game.config.width, 180,platsizeX*2.5,platsizeY, 'platform', true).setOrigin(0, 0);

        this.Vwall = new Wall(this, this.wall1.x + 250, 105, 'Wall', false).setOrigin(.5, 0).setScale(.2);
        this.Vwall2 = new Wall(this, this.wall2.x + 250, -65, 'Wall', false).setOrigin(.5, 0).setScale(.2);
        this.Vwall3 = new Wall(this, this.wall3.x + 250, 105, 'Wall', false).setOrigin(.5, 0).setScale(.2);
        this.Vwall4 = new Wall(this, this.wall4.x + 250, -65, 'Wall', false).setOrigin(.5, 0).setScale(.2);

        this.group.add(this.wall1);
        this.group.add(this.wall2);
        this.group.add(this.wall3);
        this.group.add(this.wall4);
        this.group.add(this.Vwall);
        this.group.add(this.Vwall2);
        this.group.add(this.Vwall3);
        this.group.add(this.Vwall4);
        this.group.runChildUpdate = true;

      

        this.physics.add.collider(this.player, this.group);
    }
    obs11(){

        this.group = this.physics.add.group({ allowGravity: false, immovable: true });
        
        this.wall1 = new Walla(this, 200 + game.config.width, 500,platsizeX*7,platsizeY, 'platform', true).setOrigin(0, 0);
        this.wall2 = new Walla(this, 852 + game.config.width, 200,platsizeX*2.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.wall3 = new Walla(this, 520 + game.config.width, 320,platsizeX,platsizeY, 'platform', false).setOrigin(0, 0);

        this.Vwall = new Wall(this, this.wall1.x + 580, 250, 'Wall', false).setOrigin(.5, 0).setScale(.2);
        this.toast1 = new Toast(this, 1100 + game.config.width, this.wall2.y - 40, 'toast_atlas', this.player, false).setOrigin(0.5, 0.5).setPushable(false).setScale(.1, .1);
        this.spike1 = new Trap(this, 1202 + game.config.width, this.wall1.y - 25, 'Spikes', this.player).setOrigin(0.5, 0.5).setPushable(false).setScale(.1,.1);

        this.group.add(this.wall1);
        this.group.add(this.wall2);
        this.group.add(this.wall3);
        this.group.add(this.Vwall);
        this.group.add(this.toast1);
        this.group.add(this.spike1);
        this.group.runChildUpdate = true;

        this.physics.add.collider(this.player, this.group);

    }

    obs12(){
        this.group = this.physics.add.group({ allowGravity: false, immovable: true });   
        this.platform1 = new Walla(this, 142 + game.config.width, 400,platsizeX*8,platsizeY, 'platform', false).setOrigin(0, 0);
        this.platform2 = new Walla(this, 700 + game.config.width,130,platsizeX,platsizeY, 'platform', false).setOrigin(0, 0);
        this.platform3 = new Walla(this, 975 + game.config.width,250,platsizeX* 0.75,platsizeY, 'platform', false).setOrigin(0, 0);
        this.platform4 = new Walla(this, 450 + game.config.width,250,platsizeX* 0.75,platsizeY, 'platform',false).setOrigin(0, 0);

        this.spike1 = new Trap(this, 770 + game.config.width, this.platform1.y - 25, 'Spikes', this.player).setOrigin(0.5,0.5).setPushable(false).setScale(0.1,0.1);
        this.spike2 = new Trap(this, 800 + game.config.width, this.platform1.y - 25, 'Spikes', this.player).setOrigin(0.5,0.5).setPushable(false).setScale(0.1,0.1);
        this.spike3 = new Trap(this, 830 + game.config.width, this.platform1.y - 25, 'Spikes', this.player).setOrigin(0.5,0.5).setPushable(false).setScale(0.1,0.1);
        this.spike4 = new Trap(this, 250 + game.config.width, this.platform1.y - 25, 'Spikes', this.player).setOrigin(0.5,0.5).setPushable(false).setScale(0.1,0.1);

        this.slide =  new Wall(this, 1500 + game.config.width, 150, 'Wall', false).setOrigin(.5, 0).setScale(.2);

        this.toast1 = new Toast(this, 780 + game.config.width, this.platform2.y - 60, 'toast_atlas',this.player, false).setOrigin(0, 0).setPushable(false).setScale(.1, .1);

        this.group.add(this.platform1);
        this.group.add(this.platform2);
        this.group.add(this.platform3);
        this.group.add(this.platform4);
        this.group.add(this.spike1);
        this.group.add(this.spike2);
        this.group.add(this.spike3);
        this.group.add(this.spike4);

        this.group.add(this.slide);
        this.group.add(this.toast1);

        this.group.runChildUpdate = true;

        


        this.physics.add.collider(this.player, this.group);
    }
    obs13(){
        this.group = this.physics.add.group({ allowGravity: false, immovable: true });   
        this.platform1 = new Walla(this, 172 + game.config.width, 400,platsizeX*1.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.platform2 = new Walla(this, 572 + game.config.width, 400,platsizeX*1.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.platform3 = new Walla(this, 972 + game.config.width, 400,platsizeX*1.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.platform4 = new Walla(this, 1372 + game.config.width, 400,platsizeX*1.5,platsizeY, 'platform', true).setOrigin(0, 0);
        this.makeSmolG(0.001*(-(pspeed / 100)),[game.config.width*2, 320, 0, 320, game.config.width*2, 320 ]);
        this.makeSmolG(0.001*(-(pspeed / 100)),[game.config.width*2, 350, 0, 350, game.config.width*2, 350 ]);
       
        this.group.add(this.platform1);
        this.group.add(this.platform2);
        this.group.add(this.platform3);
        this.group.add(this.platform4);

        this.group.runChildUpdate = true;
        this.physics.add.collider(this.player, this.group);
    }
    obs14(){
        this.group = this.physics.add.group({ allowGravity: false, immovable: true });   
        this.platform1 = new Walla(this, 142 + game.config.width, 400,platsizeX,platsizeY, 'platform', false).setOrigin(0, 0);
        this.platform2 = new Walla(this, 432 + game.config.width, 300,platsizeX*1.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.platform3 = new Walla(this, 872 + game.config.width, 450,platsizeX,platsizeY, 'platform', false).setOrigin(0, 0);
        this.platform4 = new Walla(this, 872 + game.config.width, 120,platsizeX,platsizeY, 'platform', false).setOrigin(0, 0);
        this.platform5 = new Walla(this, 1542 + game.config.width, 200,platsizeX,platsizeY, 'platform', true).setOrigin(0, 0);
        this.platform6 = new Walla(this, 1172 + game.config.width, 300,platsizeX*1.5,platsizeY, 'platform', false).setOrigin(0, 0);
        this.makeSmolG(0.0005*(-(pspeed / 100)),[game.config.width*2, 320, 800, 320,-200,0]);
        this.makeSmolG(0.0005*(-(pspeed / 100)),[game.config.width*2, 320, 1100, 320, 50,0]);

        this.toast1 = new Toast(this, 952 + game.config.width, 60, 'toast_atlas',this.player, false).setOrigin(0, 0).setPushable(false).setScale(.1, .1);

        this.group.add(this.platform1);
        this.group.add(this.platform2);
        this.group.add(this.platform3);
        this.group.add(this.platform4);
        this.group.add(this.platform5);
        this.group.add(this.platform6);
        this.group.add(this.toast1);

        this.group.runChildUpdate = true;
        this.physics.add.collider(this.player, this.group);
    }
    obs15(){
        this.group = this.physics.add.group({ allowGravity: false, immovable: true });   
        this.platform5 = new Walla(this, 100 + game.config.width,385,platsizeX,platsizeY, 'platform', false).setOrigin(0, 0);
        this.platform1 = new Walla(this, 332 + game.config.width, 285,platsizeX,platsizeY, 'platform', false).setOrigin(0, 0);
        this.platform2 = new Walla(this, 642 + game.config.width, 450,platsizeX,platsizeY, 'platform', false).setOrigin(0, 0);
        this.platform3 = new Walla(this, 642 + game.config.width, 150,platsizeX,platsizeY, 'platform', false).setOrigin(0, 0);
        this.platform4 = new Walla(this, 1042 + game.config.width, 325,platsizeX*1.5,platsizeY, 'platform',true).setOrigin(0, 0);
        
        this.toast1 = new Toast(this, 722 + game.config.width, this.platform3.y - 60, 'toast_atlas',this.player, false).setOrigin(0, 0).setPushable(false).setScale(.1, .1);
       
        this.makeSmolG(0.001*(-(pspeed / 100)),[game.config.width*2, -100, 320, 320, 20,1110]);
        this.makeSmolG(0.0013*(-(pspeed / 100)),[game.config.width, 1100, 1220, 420, 200,0]);
        this.makeSmolG(0.0015*(-(pspeed / 100)),[game.config.width*3, 0, 1520, 250, game.config.width/2 + 100,450]);

        this.group.add(this.platform1);
        this.group.add(this.platform2);
        this.group.add(this.platform3);
        this.group.add(this.platform4);
        this.group.add(this.platform5);
        this.group.add(this.toast1);

        this.group.runChildUpdate = true;
        this.physics.add.collider(this.player, this.group);
    }

    
    
}
