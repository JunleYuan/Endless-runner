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
      //Keeps Track of platforms
      this.grassPool = this.add.group({
          removeCallback: function(grass){
              grass.scene.grassGroup.add(grass)
          }
      });

      this.grassGroup = this.add.group({
          removeCallBack: function(grass){
              grass.scene.grassPool.add(grass)
          }
      });
      this.grassGroup.depth = 1;

        //Keeps track of slidable walls
        this.wallPool = this.add.group({
            removeCallBack: function(wall){
                wall.scene.wallGroup.add(wall)
            }
        });

        this.wallGroup = this.add.group({
            removeCallBack: function(wall){
                wall.scene.wallPool.add(wall)
            }
        });
        this.wallGroup.depth = 1;

        //Keep track of Spike Pools
        this.spikePool = this.add.group({
            removeCallBack: function(spike){
                spike.scene.spikeGroup.add(spike)
            }
        });
        this.spikeGroup = this.add.group({
            removeCallBack: function(spike){
                spike.scene.spikePool.add(spike)
            }
        });
        this.spikeGroup.depth = 1;

        //Pool for all instances of Toast Collectible
        this.toastPool = this.add.group({
            removeCallback: function(toast){
                toast.scene.toastGroup.add(toast)
            }
        });

        this.toastGroup = this.add.group({
            removeCallBack: function(toast){
            toast.scene.toastPool.add(toast)
            }
        });

        //Declare Number of Added Platforms
        this.addedPlatforms = 0;
        this.addPlatform(game.config.width,game.config.width/2,game.config.height*0.8); 
        
        //spawn in player
        this.player = new Player(this, 480,342, 'spaceship');
        //initialize controls
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keySlide = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);


        //spawn gerald
        this.gerald = new Gerald(this,0,0,'gerald',0).setOrigin(.8,0).setPushable(false).setScale(1,5);
        this.physics.add.overlap(this.player, this.gerald,this.playerHitG);
        this.gerald.depth = 3;
        //add collision with objects
        this.physics.add.collider(this.player, this.grassGroup);

        //This is the path the sprite will follow
        this.points = [700, 400,500, 500,350, 300, 50, 400, 200, 400]
        this.smallG = this.physics.add.group({ allowGravity: false , immovable: true});
        this.path = new Path(this, 200, 300, 'spaceship', 0.005,this.points);
        this.smallG.add(this.path, true);

            
        //if player gets hit there is a knock back
        this.hitG = this.physics.add.overlap(this.player, this.smallG, null, function (){ 
            hit_count += 1;
            console.log("maybe");
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
    
        this.physics.add.overlap(this.player, this.gerald,this.playerHitG);

    }
  
  

  update(){

    //Recycle Platforms
    let minDistance = game.config.width;
    this.grassGroup.getChildren().forEach(function(grass){
        let platformDistance = game.config.width - grass.x - grass.displayWidth / 2;
        minDistance = Math.min(minDistance, platformDistance);
        if(grass.x < - grass.displayWidth / 2){
            this.grassGroup.killAndHide(grass);
            this.grassGroup.remove(grass);
        }
    }, this);
    
    //Adding New platforms
    if(minDistance > this.nextPlatformDistance){
        let nextPlatformWidth = Phaser.Math.Between(Obstacle_settings.platformLength[0],Obstacle_settings.platformLength[1]);
        this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth /2, game.config.height);
    }

    //Recycle Sliding Walls
    this.wallGroup.getChildren().forEach(function(wall){
        if(wall.x < - wall.displayWidth / 2){
            this.wallGroup.killAndHide(wall);
            this.wallGroup.remove(wall);
        }
    }, this);
    
    //Recycle Spikes
    this.spikeGroup.getChildren().forEach(function(spike){
        if(spike.x < - spike.displayWidth / 2){
            this.spikeGroup.killAndHide(spike);
            this.spikeGroup.remove(spike);
        }
    }, this);

    //update prefab
    this.player.update();
    this.gerald.update();
    this.path.update();


    //spawn minions
    if(keySlide.isDown){

        this.path.body.reset(700, 400);
        this.path.setActive(true);
        this.path.setVisible(true);
        this.path.pathIndex = 0;
        this.path.body.enable = true;
    }


  }
  //Function Add Platforms. Takes in width of the platforms and X,Y coordinates
  addPlatform(platWidth, platX, platY){
    this.addedPlatforms ++;
    let grass;
    if(this.grassPool.getLength()){
        grass = this.grassPool.getFirst();
        grass.x = platX;
        grass.y = 100;
        grass.active = true;
        grass.visible = true;
        this.grassPool.remove(grass);
    }
    else{
        grass = this.physics.add.sprite(platX, platY * 0.8, "grass");
        grass.body.allowGravity = false;
        grass.setImmovable(true);
        grass.setVelocityX(Obstacle_settings.platformSpeed * -1);
        this.grassGroup.add(grass);
    }
    this.nextPlatformDistance = Phaser.Math.Between(Obstacle_settings.platformSpawnRange[0],Obstacle_settings.platformSpawnRange[1]);
   
    //Add Slidable Walls
    if(this.addedPlatforms > 1){
        if(Phaser.Math.Between(1, 100) <= Obstacle_settings.wallSpawnRate){
            if(this.wallPool.getLength()){
                let wall = this.wallPool.getFirst();
                wall.x = platX;
                wall.y = platY - 250;
                wall.alpha = 1;
                wall.active = true;
                wall.visible = true;
                this.wallPool.remove(wall);
            }
            else{
                let wall = this.physics.add.sprite(platX, platY - 250, "Wall");
                wall.body.allowGravity = false;
                wall.setImmovable(true);
                wall.setVelocityX(grass.body.velocity.x);
                this.wallGroup.add(wall);

            }
        }
        if(Phaser.Math.Between(1,100) <= Obstacle_settings.spikeSpawnRate){
            if(this.spikePool.getLength()){
                let spike = this.spikePool.getFirst();
                spike.x = platX - platWidth / 2 + Phaser.Math.Between(1, platWidth);
                spike.y = platY - 256;
                spike.alpha = 1;
                spike.active = true;
                spike.visible = true;
                this.firePool.remove(fire);
            }
            else{
                let spike = this.physics.add.sprite(platX - platWidth / 2 + Phaser.Math.Between(1, platWidth), platY - 146, 'Spikes');
                spike.body.allowGravity = false;
                spike.setImmovable(true);
                spike.setVelocityX(grass.body.velocity.x);
                spike.setSize(8,2,true);
                spike.setDepth(2);
                this.spikeGroup.add(spike);
            }
        }
        if(Phaser.Math.Between(1,100) <= Obstacle_settings.toastSpawnRate){
            if(this.toastPool.getLength()){
                let toast = this.toastPool.getFirst();
                toast.x = platX - platWidth / 2 + Phaser.Math.Between(1, platWidth);
                toast.y = platY - 256;
                toast.alpha = 1;
                toast.active = true;
                toast.visible = true;
                this.firePool.remove(fire);
            }
            else{
                let toast = this.physics.add.sprite(platX - platWidth / 2 + Phaser.Math.Between(1, platWidth), platY - 246, 'Toast');
                toast.body.allowGravity = false;
                toast.setImmovable(true);
                toast.setVelocityX(grass.body.velocity.x);
                toast.setDepth(2);
                this.toastGroup.add(toast);
            }
        }
    }

  }

  //game over if hit gerald
  playerHitG(){
    console.log("GG");


  }

}
