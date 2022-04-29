// Path prefab
class Path extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, speed,points,player) {
        console.log(sprite);
  
        super(scene, x, y,sprite);

        Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, sprite);
  
        this.path = new Phaser.Curves.Spline(points);
        this.pathIndex = 0;
        this.pathSpeed = speed;
        this.pathVector = new Phaser.Math.Vector2();
        this.path.getPoint(0, this.pathVector);
        this.setPosition(this.pathVector.x, this.pathVector.y);

        this.coll = player;
        this.curScene = scene;

        scene.physics.add.overlap(player, this, null, this.hitG(this));

    }

    update(time, delta) {

        //this.anims.update(time, delta);
  
        this.path.getPoint(this.pathIndex, this.pathVector);
  
        this.setPosition(this.pathVector.x, this.pathVector.y);
  
        this.pathIndex = Phaser.Math.Wrap(this.pathIndex + this.pathSpeed, 0, 1);

        if(this.pathIndex >.99){
            // this.setActive(false);
            // this.setVisible(false);
            // this.body.enable = false;
            this.destroy();

        }
        
    }
    hitG(obj){

        return function() {
            hit_count += 1;
            console.log("hit");

            playerGotHit = true;
            obj.coll.body.velocity.x = -300;
            obj.coll.body.velocity.y = -50;
            obj.curScene.time.delayedCall(500, () => {
                playerGotHit = false;

            }, null, this);
            obj.destroy();
        }

    }
    
}
