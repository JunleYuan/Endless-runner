// Path prefab
class Toast extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y,sprite);

        //Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, sprite);

        scene.add.existing(this);   // add to existing, displayList, updateList
        scene.physics.add.existing(this);   //give object physics
  
        this.setPosition(x, y);
        this.body.allowGravity = false;

    }

    update(time, delta) {
        //move object
        this.body.velocity.x = pspeed;

        
        if(this.body.x+this.body.width<0){
            this.destroy();
        }

        
    }
    
}
