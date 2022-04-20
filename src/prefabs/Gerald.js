// Path prefab
class Gerald extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, speed) {
        super(scene, x, y,sprite, speed);

        Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, sprite);
  
        this.setPosition(x, y);
        
    }

    update(time, delta) {

        this.anims.update(time, delta);
        
        if(hit_count == 1)
        this.setPosition(x+100, y);


        
    }
    
}
