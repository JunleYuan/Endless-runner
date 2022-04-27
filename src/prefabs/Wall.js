// Path prefab
class Wall extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite,isLast) {
        super(scene, x, y,sprite,isLast);

        //Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, sprite);

        scene.add.existing(this);   // add to existing, displayList, updateList
        scene.physics.add.existing(this);   //give object physics
  
        this.setPosition(x, y);
        this.body.allowGravity = false;

        this.isLast = isLast;   //is this last from a set of platforms
        this.notDone = true;
    }

    update(time, delta) {
        this.body.velocity.x = pspeed;
        //console.log(this.body.x+"and"+ this.body.width);

        if(this.isLast && this.body.x + this.body.width < game.config.width && this.notDone){
            this.notDone = false;
            shouldSpawnP = true;
            console.log("spawn next");
        }

        if(this.body.x+this.body.width-100<0){
            this.destroy();
        }

        //spawn in next set of platforms
        
    }
    
}
