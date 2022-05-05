
class Gerald extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite,frame, HP) {
        super(scene, x, y, sprite, frame);

        //Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, sprite);

        scene.add.existing(this);   // add to existing, displayList, updateList
        scene.physics.add.existing(this);   //give object physics
  
        this.setPosition(x, y);
        this.body.allowGravity = false;

        
    
    }

    update(time, delta) {
        
        //move gerald if hit
        if((this.body.x < -100 && hit_count == 1) || (this.body.x < 200 && hit_count == 2) ||(this.body.x < 500 && hit_count == 3)||(this.body.x < 800 && hit_count == 4)||(this.body.x < 1000 && hit_count == 5)){
            this.body.velocity.x = 60;
            
        }else{
            this.body.velocity.x = 0;
        }
        
    }
    
}
