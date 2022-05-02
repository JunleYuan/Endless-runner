// Path prefab
class Walla extends Phaser.GameObjects.TileSprite {
    constructor(scene, x, y,width,height, sprite, isLast) {
        super(scene, x, y,width,height, sprite);

        scene.add.existing(this);   // add to existing, displayList, updateList
        scene.physics.add.existing(this);   //give object physics
        
        this.setPosition(x, y);
        this.body.setImmovable(false);
        this.body.allowGravity = false;
        

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
