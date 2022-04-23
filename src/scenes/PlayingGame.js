class PlayingScene extends Phaser.Scene {
    constructor() {
        super("playingScene");
    }

preload() {
    this.load.image('playerfigure', './assets/PlayerRunner.png');
    this.load.image('grass', './assets/Grass.png');
    this.load.image('Wall', './assets/Wall.png');
    this.load.image('Spikes', './assets/Spike.png');
  }

  create(){
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

    this.addedPlatforms = 0;
    this.addPlatform(game.config.width,game.config.width/2,game.config.height*0.8); 
  }
  
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
                spike.y = platY - 146;
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

    }

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

    this.wallGroup.getChildren().forEach(function(wall){
        if(wall.x < - wall.displayWidth / 2){
            this.wallGroup.killAndHide(wall);
            this.wallGroup.remove(wall);
        }
    }, this);
    
    this.spikeGroup.getChildren().forEach(function(spike){
        if(spike.x < - spike.displayWidth / 2){
            this.spikeGroup.killAndHide(spike);
            this.spikeGroup.remove(spike);
        }
    }, this);

  }

}
