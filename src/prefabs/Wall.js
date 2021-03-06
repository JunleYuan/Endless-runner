// Path prefab
class Wall extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, isLast) {
        super(scene, x, y, sprite, isLast);

        scene.add.existing(this);   // add to existing, displayList, updateList
        scene.physics.add.existing(this);   //give object physics
  
        this.setPosition(x, y);
        this.setPushable(false);
        this.body.allowGravity = false;
        this.body.setSize(200, 1000);

        this.isLast = isLast;   //is this last from a set of platforms
        this.notDone = true;
    }

    update(time, delta) {
        this.body.velocity.x = pspeed;

        //spawn in next set of platforms
        if(this.isLast && this.body.x + this.body.width < game.config.width && this.notDone){
            this.notDone = false;
            shouldSpawnP = true;
            console.log("spawn next");
        }

        if(this.body.x+this.body.width<0){
            this.destroy();
        }

        
    }
    
}
