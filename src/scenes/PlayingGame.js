class PlayingScene extends Phaser.Scene {
    constructor() {
        super("playingScene");
    }

    preload() {
        this.load.image('playerfigure', './assets/PlayerRunner.png');
        this.load.image('grass', './assets/Grass.png');
        this.load.image('Wall', './assets/Wall.png');
        this.load.image('Spikes', './assets/Spike.png');
        this.load.image('Toast', './assets/toast.png');

        this.load.image('spaceship', './assets/CoreFighter2.png');
        this.load.image('CoreFighter', './assets/CoreFighter.png');
        this.load.image('ground', './assets/ground.png');
        this.load.image('gerald', './assets/gerald temp.png');
    }

    create() {

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

        //This is the path the sprite will follow
        this.points = [1100, 400, 800, 500, 350, 300, 50, 400, 200, 400]
        this.smallG = this.physics.add.group({ allowGravity: false, immovable: true });
        this.path = new Path(this, 1000, 300, 'spaceship', 0.005, this.points);
        this.smallG.add(this.path, true);
        this.path.setActive(false);
        this.path.setVisible(false);
        this.path.body.enable = false;

        //if player gets hit there is a knock back
        this.hitG = this.physics.add.overlap(this.player, this.smallG, null, function () {
            hit_count += 1;
            console.log("hit");
            this.path.setActive(false);
            this.path.setVisible(false);
            this.path.body.enable = false;

            playerGotHit = true;
            this.player.body.velocity.x = -300;
            this.player.body.velocity.y = -50;
            this.time.delayedCall(500, () => {
                playerGotHit = false;

            }, null, this);

        }, this);

        //so player will fall through the ground
        this.physics.world.setBoundsCollision(true, true, true, false);

        //increase speed of platforms as time goes
        this.speeed();

        //spawn starting platform
        //this.starting();
        this.obs4();
        

    }//end of create

    update(time, delta) {

        //if player is under the map game over
        if (this.player.body.y > game.config.height) {
            isGameOver = true;
        }

        //spawn new platform
        if (shouldSpawnP) {
            shouldSpawnP = false;

            switch (Math.floor(Math.random() * 3)) {
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
            }
        }

        //update prefab
        this.player.update(time, delta);
        this.gerald.update();
        this.path.update();

        //spawn minions
        if (spawn.isDown) {

            this.path.body.reset(1000, 400);
            this.path.body.enable = true;
            this.path.setActive(true);
            this.path.setVisible(true);
            this.path.pathIndex = 0;

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

    starting() {
        this.startp = this.physics.add.group({ allowGravity: false });
        this.startingP = new Wall(this, 50, 500, 'grass', true).setOrigin(0, 0).setPushable(false).setScale(7, 1);

        this.startp.add(this.startingP);
        this.startp.runChildUpdate = true;

        this.physics.add.collider(this.player, this.startingP);
    }

    obs1() {

        this.group = this.physics.add.group({ allowGravity: false });
        this.wall1 = new Wall(this, 100 + game.config.width, 500, 'grass', false).setOrigin(0, 0).setPushable(false).setScale(5, 1);
        this.wall2 = new Wall(this, 700 + game.config.width, 300, 'grass', false).setOrigin(0, 0).setPushable(false).setScale(5, 1);
        this.wall3 = new Wall(this, 900 + game.config.width, 500, 'grass', true).setOrigin(0, 0).setPushable(false).setScale(5, 1);

        this.group.add(this.wall1);
        this.group.add(this.wall2);
        this.group.add(this.wall3);
        this.group.runChildUpdate = true;

        this.physics.add.collider(this.player, this.group);

    }
    obs2() {
        this.group = this.physics.add.group({ allowGravity: false });
        this.wall1 = new Wall(this, 100 + game.config.width, 500, 'grass', false).setOrigin(0, 0).setPushable(false).setScale(5, 1);
        this.wall2 = new Wall(this, 700 + game.config.width, 500, 'grass', false).setOrigin(0, 0).setPushable(false).setScale(5, 1);
        this.wall3 = new Wall(this, 900 + game.config.width, 300, 'grass', true).setOrigin(0, 0).setPushable(false).setScale(5, 1);

        this.group.add(this.wall1);
        this.group.add(this.wall2);
        this.group.add(this.wall3);
        this.group.runChildUpdate = true;

        this.physics.add.collider(this.player, this.group);

    }
    obs3() {
        this.group = this.physics.add.group({ allowGravity: false });

        this.group2 = this.physics.add.group({ allowGravity: false });

        this.wall1 = new Wall(this, 100 + game.config.width, 400, 'grass', false).setOrigin(0, 0).setPushable(false).setScale(.5, 1);
        this.wall2 = new Wall(this, 300 + game.config.width, 400, 'grass', false).setOrigin(0, 0).setPushable(false).setScale(.5, 1);
        this.wall3 = new Wall(this, 500 + game.config.width, 400, 'grass', false).setOrigin(0, 0).setPushable(false).setScale(.5, 1);
        this.wall4 = new Wall(this, 700 + game.config.width, 400, 'grass', false).setOrigin(0, 0).setPushable(false).setScale(.5, 1);
        this.wall5 = new Wall(this, 900 + game.config.width, 400, 'grass', true).setOrigin(0, 0).setPushable(false).setScale(.5, 1);

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

        this.group = this.physics.add.group({ allowGravity: false });
        this.group2 = this.physics.add.group({ allowGravity: false });

        this.wall1 = new Wall(this, 100, 500, 'grass', false).setOrigin(0, 0).setPushable(false).setScale(5, 1);
        this.wall2 = new Wall(this, 600, 230, 'Wall', false).setOrigin(0, 0).setPushable(false).setScale(1, 2);
        this.wall3 = new Wall(this, 1000, 500, 'grass', true).setOrigin(0, 0).setPushable(false).setScale(3, 1);

        this.toast1 = new Toast(this, 620 , 250, 'Toast',this.player, false).setOrigin(0, 0).setPushable(false).setScale(1, 1);

        this.group.add(this.wall1);
        this.group.add(this.wall2);
        this.group.add(this.wall3);

        this.group2.add(this.toast1);

        this.group.runChildUpdate = true;
        this.group2.runChildUpdate = true;
        
        this.physics.add.collider(this.player, this.group);
    }


}
