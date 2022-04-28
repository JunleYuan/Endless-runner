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

  create(){
      
    //   //Keeps Track of platforms
    //   this.grassPool = this.add.group({
    //       removeCallback: function(grass){
    //           grass.scene.grassGroup.add(grass)
    //       }
    //   });

    //   this.grassGroup = this.add.group({
    //       removeCallBack: function(grass){
    //           grass.scene.grassPool.add(grass)
    //       }
    //   });
    //   this.grassGroup.depth = 1;

    //     //Keeps track of slidable walls
    //     this.wallPool = this.add.group({
    //         removeCallBack: function(wall){
    //             wall.scene.wallGroup.add(wall)
    //         }
    //     });

    //     this.wallGroup = this.add.group({
    //         removeCallBack: function(wall){
    //             wall.scene.wallPool.add(wall)
    //         }
    //     });
    //     this.wallGroup.depth = 1;

    //     //Keep track of Spike Pools
    //     this.spikePool = this.add.group({
    //         removeCallBack: function(spike){
    //             spike.scene.spikeGroup.add(spike)
    //         }
    //     });
    //     this.spikeGroup = this.add.group({
    //         removeCallBack: function(spike){
    //             spike.scene.spikePool.add(spike)
    //         }
    //     });
    //     this.spikeGroup.depth = 1;

    //     //Pool for all instances of Toast Collectible
    //     this.toastPool = this.add.group({
    //         removeCallback: function(toast){
    //             toast.scene.toastGroup.add(toast)
    //         }
    //     });

    //     this.toastGroup = this.add.group({
    //         removeCallBack: function(toast){
    //         toast.scene.toastPool.add(toast)
    //         }
    //     });

        //Declare Number of Added Platforms
        //this.addedPlatforms = 0;
        //this.addPlatform(game.config.width,game.config.width/2,game.config.height); 
        
        //spawn in player
        this.player = new Player(this, 200,442, 'spaceship');
        //initialize controls
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keySlide = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        spawn = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        //spawn gerald
        this.gerald = new Gerald(this,0,0,'gerald',0).setOrigin(.8,0).setPushable(false).setScale(1,5);
        //ends game if hits gerald
        this.physics.add.overlap(this.player, this.gerald,function (){
            isGameOver = true;
        });
        this.gerald.depth = 3;

        //This is the path the sprite will follow
        this.points = [1100, 400,800, 500,350, 300, 50, 400, 200, 400]
        this.smallG = this.physics.add.group({ allowGravity: false , immovable: true});
        this.path = new Path(this, 1000, 300, 'spaceship', 0.005,this.points);
        this.smallG.add(this.path, true);
        this.path.setActive(false);
        this.path.setVisible(false);
        this.path.body.enable = false;
            
        //if player gets hit there is a knock back
        this.hitG = this.physics.add.overlap(this.player, this.smallG, null, function (){ 
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
        this.physics.world.setBoundsCollision( true,true,true,true);

        
        //this.wall2 = new Wall(this,500,500,'grass',0).setOrigin(.8,0).setPushable(false).setScale(5,1);
        this.starting();
        //this.obs1();
        //this.obs3();
        

        //add collision with objects
        //this.physics.add.collider(this.player, this.grassGroup);
        

    }//end of create
  
  update(time, delta){

    //if player is under the map game over
    if(this.player.body.y > game.config.height){
        isGameOver = true;
    }

    //console.log(this.pick = Math.floor(Math.random() * 2));

    //spawn new platform
    if(shouldSpawnP){
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

    // //Recycle Platforms
    // let minDistance = game.config.width;
    // this.grassGroup.getChildren().forEach(function(grass){
    //     let platformDistance = game.config.width - grass.x - grass.displayWidth / 2;
    //     minDistance = Math.min(minDistance, platformDistance);
    //     if(grass.x < - grass.displayWidth / 2){
    //         this.grassGroup.killAndHide(grass);
    //         this.grassGroup.remove(grass);
    //     }
    // }, this);
    
    // //Adding New platforms
    // if(minDistance > this.nextPlatformDistance){
    //     let nextPlatformWidth = Phaser.Math.Between(Obstacle_settings.platformLength[0],Obstacle_settings.platformLength[1]);
    //     this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth /2, game.config.height );
    // }

    // //Recycle Sliding Walls
    // this.wallGroup.getChildren().forEach(function(wall){
    //     if(wall.x < - wall.displayWidth / 2){
    //         this.wallGroup.killAndHide(wall);
    //         this.wallGroup.remove(wall);
    //     }
    // }, this);
    
    // //Recycle Spikes
    // this.spikeGroup.getChildren().forEach(function(spike){
    //     if(spike.x < - spike.displayWidth / 2){
    //         this.spikeGroup.killAndHide(spike);
    //         this.spikeGroup.remove(spike);
    //     }
    // }, this);

    //update prefab
    this.player.update(time, delta);
    this.gerald.update();
    this.path.update();
    
    //spawn minions
    if(spawn.isDown){

        this.path.body.reset(1000, 400);
        this.path.body.enable = true;
        this.path.setActive(true);
        this.path.setVisible(true);
        this.path.pathIndex = 0;
        
    }
    if (isGameOver){
        this.scene.start("end");
    }

  }//end of update


//   //Function Add Platforms. Takes in width of the platforms and X,Y coordinates
//     addPlatform(platWidth, platX, platY){
//         this.addedPlatforms ++;
//         let grass;
//         if(this.grassPool.getLength()){
//             grass = this.grassPool.getFirst();
//             grass.x = platX;
//             grass.y = platY;
//             grass.active = true;
//             grass.visible = true;
//             this.grassPool.remove(grass);
//         }
//         else{
//             grass = this.add.tileSprite(platX, platY * 0.8, platWidth, 32, "grass");
//             this.physics.add.existing(grass);
//             grass.body.allowGravity = false;
//             grass.body.setImmovable(true);
//             grass.body.setVelocityX(Obstacle_settings.platformSpeed * -1);
//             grass.body.setFriction(0);
//             this.grassGroup.add(grass);
//         }
//         this.nextPlatformDistance = Phaser.Math.Between(Obstacle_settings.platformSpawnRange[0],Obstacle_settings.platformSpawnRange[1]);
    
//         //Add Slidable Walls
//         if(this.addedPlatforms > 1){
//             if(Phaser.Math.Between(1, 100) <= Obstacle_settings.wallSpawnRate){
//                 if(this.wallPool.getLength()){
//                     let wall = this.wallPool.getFirst();
//                     wall.x = platX;
//                     wall.y = platY - 250;
//                     wall.alpha = 1;
//                     wall.active = true;
//                     wall.visible = true;
//                     this.wallPool.remove(wall);
//                 }
//                 else{
//                     let wall = this.physics.add.sprite(platX, platY - 250, "Wall");
//                     wall.body.allowGravity = false;
//                     wall.setImmovable(true);
//                     wall.setVelocityX(grass.body.velocity.x);
//                     this.wallGroup.add(wall);

//                 }
//             }
//             if(Phaser.Math.Between(1,100) <= Obstacle_settings.spikeSpawnRate){
//                 if(this.spikePool.getLength()){
//                     let spike = this.spikePool.getFirst();
//                     spike.x = platX - platWidth / 2 + Phaser.Math.Between(1, platWidth);
//                     spike.y = platY - 256;
//                     spike.alpha = 1;
//                     spike.active = true;
//                     spike.visible = true;
//                     this.firePool.remove(fire);
//                 }
//                 else{
//                     let spike = this.physics.add.sprite(platX - platWidth / 2 + Phaser.Math.Between(1, platWidth), platY - 146, 'Spikes');
//                     spike.body.allowGravity = false;
//                     spike.setImmovable(true);
//                     spike.setVelocityX(grass.body.velocity.x);
//                     spike.setSize(8,2,true);
//                     spike.setDepth(2);
//                     this.spikeGroup.add(spike);
//                 }
//             }
//             if(Phaser.Math.Between(1,100) <= Obstacle_settings.toastSpawnRate){
//                 if(this.toastPool.getLength()){
//                     let toast = this.toastPool.getFirst();
//                     toast.x = platX - platWidth / 2 + Phaser.Math.Between(1, platWidth);
//                     toast.y = platY - 256;
//                     toast.alpha = 1;
//                     toast.active = true;
//                     toast.visible = true;
//                     this.firePool.remove(fire);
//                 }
//                 else{
//                     let toast = this.physics.add.sprite(platX - platWidth / 2 + Phaser.Math.Between(1, platWidth), platY - 246, 'Toast');
//                     toast.body.allowGravity = false;
//                     toast.setImmovable(true);
//                     toast.setVelocityX(grass.body.velocity.x);
//                     toast.setDepth(2);
//                     this.toastGroup.add(toast);
//                 }
//             }
//         }
//     }//end of add pat

    starting(){
        this.startp = this.physics.add.group({ allowGravity: false });
        this.startingP = new Wall(this,50,500,'grass',true).setOrigin(0,0).setPushable(false).setScale(7,1);

        this.startp.add(this.startingP);
        this.startp.runChildUpdate = true;

        this.physics.add.collider(this.player, this.startingP);
    }

    obs1(){

        this.group = this.physics.add.group({ allowGravity: false });
        this.wall1 = new Wall(this,960,500,'grass',false).setOrigin(0,0).setPushable(false).setScale(5,1);
        this.wall2 = new Wall(this,1600,300,'grass',false).setOrigin(0,0).setPushable(false).setScale(5,1);
        this.wall3 = new Wall(this,1900,500,'grass',true).setOrigin(0,0).setPushable(false).setScale(5,1);

        this.group.add(this.wall1);
        this.group.add(this.wall2);
        this.group.add(this.wall3);
        this.group.runChildUpdate = true;

        this.physics.add.collider(this.player, this.group);

    }
    obs2(){
        this.group = this.physics.add.group({ allowGravity: false });
        this.wall1 = new Wall(this,960,500,'grass',false).setOrigin(0,0).setPushable(false).setScale(5,1);
        this.wall2 = new Wall(this,1600,400,'grass',false).setOrigin(0,0).setPushable(false).setScale(5,1);
        this.wall3 = new Wall(this,1900,300,'grass',true).setOrigin(0,0).setPushable(false).setScale(5,1);

        this.group.add(this.wall1);
        this.group.add(this.wall2);
        this.group.add(this.wall3);
        this.group.runChildUpdate = true;

        this.physics.add.collider(this.player, this.group);

    }
    obs3(){
        this.group = this.physics.add.group({ allowGravity: false });
        this.wall1 = new Wall(this,100+game.config.width,400,'grass',false).setOrigin(0,0).setPushable(false).setScale(.5,1);
        this.wall2 = new Wall(this,300+game.config.width,400,'grass',false).setOrigin(0,0).setPushable(false).setScale(.5,1);
        this.wall3 = new Wall(this,500+game.config.width,400,'grass',false).setOrigin(0,0).setPushable(false).setScale(.5,1);
        this.wall4 = new Wall(this,700+game.config.width,400,'grass',false).setOrigin(0,0).setPushable(false).setScale(.5,1);
        this.wall5 = new Wall(this,900+game.config.width,400,'grass',true).setOrigin(0,0).setPushable(false).setScale(.5,1);

        this.group.add(this.wall1);
        this.group.add(this.wall2);
        this.group.add(this.wall3);
        this.group.add(this.wall4);
        this.group.add(this.wall5);
        this.group.runChildUpdate = true;

        this.physics.add.collider(this.player, this.group);

    }


}
