// Path prefab
class Gerald extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, HP) {
        super(scene, x, y,sprite, HP);

        //Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, sprite);

        scene.add.existing(this);   // add to existing, displayList, updateList
        scene.physics.add.existing(this);   //give object physics
  
        this.setPosition(x, y);
        this.body.allowGravity = false;
    }

    update(time, delta) {
        this.HP = hit_count;
        this.anims.update(time, delta);

        //console.log(this.body.x);

        if(this.body.x < -300 && this.HP == 1){
            this.body.velocity.x = 60;
            console.log("one");
        }else if(this.body.x < -100 && this.HP == 2){
            this.body.velocity.x = 60;
            console.log("2");
        }else{
            this.body.velocity.x = 0;
        }
        
        
        //if(hit_count == 1)
        //this.setPosition(x+100, y);

    }
    
}
