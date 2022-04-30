// Trap prefab
class Trap extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, player) {
        super(scene, x, y,sprite);

        //Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, sprite);

        scene.add.existing(this);   // add to existing, displayList, updateList
        scene.physics.add.existing(this);   //give object physics
  
        this.setPosition(x, y);
        this.body.allowGravity = false;

        this.die = false;

        scene.physics.add.overlap(player, this, null, this.dealTrapDamage);
            
    }

    update(time, delta) {

        //move object
        this.body.velocity.x = pspeed;

        if(this.body.x+this.body.width<0){
            console.log("trap destroyed");
            this.destroy();
        }

    }
    
    dealTrapDamage(){
        if(!playerGotHit){
            hit_count+= 1;
            console.log('hit count = ' + hit_count)
            playerGotHit = true;
        }
    }
}