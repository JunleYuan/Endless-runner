// Path prefab
class Path extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite,frame, speed,points,player) {
        super(scene, x, y,sprite,frame);
        
        

        //Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, sprite);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setSize(500, 500);

        this.path = new Phaser.Curves.Spline(points);
        this.pathIndex = 0; //which x and y it's going
        this.pathSpeed = speed; //speed of the path
        this.pathVector = new Phaser.Math.Vector2();
        this.path.getPoint(0, this.pathVector);
        this.setPosition(this.pathVector.x, this.pathVector.y);

        this.colle = player; //save player as var use for hitG
        this.curScene = scene;  //save scene as var use for hitG

        scene.physics.add.overlap(player, this, null, this.hitG(this));

    }

    update(time, delta) {

        //this.anims.update(time, delta);
  
        this.path.getPoint(this.pathIndex, this.pathVector);
  
        this.setPosition(this.pathVector.x, this.pathVector.y);
  
        this.pathIndex = Phaser.Math.Wrap(this.pathIndex + this.pathSpeed, 0, 1);

        if(this.pathIndex >.99){
            
            this.destroy();

        }
        
    }

    //hit detect function
    hitG(obj){

        return function() {
            hit_count += 1;
            console.log("hit");
            obj.curScene.sound.play('HurtVoice');
            playerGotHit = true;
            obj.colle.body.velocity.y = -500;
            obj.colle.body.velocity.x = -300;

            console.log("called");

            obj.curScene.time.delayedCall(500, () => {
                playerGotHit = false;

            }, null, this);
            
            obj.destroy();
        }

    }
    
}
