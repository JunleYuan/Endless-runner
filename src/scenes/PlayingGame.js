class PlayingScene extends Phaser.Scene {
    constructor() {
        super("playingScene");
    }

    preload() {
        this.load.image('playerfigure', './assets/PlayerRunner.png');
        this.load.image('platform', './assets/PLAT.png');
        this.load.image('Wall', './assets/Wall.png');
        this.load.image('Spikes', './assets/Spike.png');
        this.load.image('Toast', './assets/toast.png');

        this.load.image('spaceship', './assets/CoreFighter2.png');
        this.load.image('CoreFighter', './assets/CoreFighter.png');
        this.load.image('ground', './assets/ground.png');
        this.load.image('gerald', './assets/gerald temp.png');
    
        this.load.image('middleground', './assets/MiddleGround.png');
        this.load.image('foreground', './assets/ForeGround.png');
        this.load.image('background', './assets/CompleteBack.png');

    }


    create() {

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



        //spawn in player
        this.player = new Player(this, 200, 442, 'spaceship');
        //initialize controls
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keySlide = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        spawn = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        //spawn gerald
        this.gerald = new Gerald(this, 0, 0, 'gerald', 0).setOrigin(.8, 0).setPushable(false).setScale(1, 5);
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
        this.starting();

    }//end of create

    update(time, delta) {

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
            console.log("speed is increased, current speed:", + pspeed);
            if (pspeed < MaxPSpeed) {
                this.speeed();
            }

        }, null, this);
    }
    //create small g
    makeSmolG(speed,points){

        this.smallG = this.physics.add.group({ allowGravity: false, immovable: true });
        this.path = new Path(this, 1000, 300, 'spaceship', speed, points,this.player);
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
    

}
