// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);   // add to existing, displayList, updateList
        scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
    }

    update() {
        
        this.body.velocity.x = 0
        if (keyA.isDown){
            this.body.velocity.x = -100;

        }else if(keyD.isDown){
            this.body.velocity.x = 100;

        }
        if(keyJump.isDown && this.body.touching.down){
            this.body.velocity.y = -200;
            
        }
        

    }

    
    
}
