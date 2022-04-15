// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);   // add to existing, displayList, updateList
        scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
        this.body.setSize(50, 40,0,0);
        this.canD = false;
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
        
        if(keySlide.isDown ){
            this.body.setSize(50, 20);
            this.canD = true;
    
        }
        if(!keySlide.isDown&& this.canD == true && this.body.touching.down){
            this.body.setSize(50, 40);
            this.body.velocity.y = -50;
            this.canD = false;
        }

        
        
        

    }

    
    
}
