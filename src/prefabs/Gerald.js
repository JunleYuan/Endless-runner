
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
        this.HP = hit_count;
        

        //move gerald if hit
        if((this.body.x < -300 && this.HP == 1) || (this.body.x < -100 && this.HP == 2) ||(this.body.x < 200 && this.HP == 3)){
            this.body.velocity.x = 60;
            console.log("one");
        }else{
            this.body.velocity.x = 0;
        }
        
    }
    
}
