// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);   // add to existing, displayList, updateList
        scene.physics.add.existing(this);   //give object physics
        this.body.collideWorldBounds = true;    //so it don't go out of canvas
        this.body.setSize(50, 40);          //give hitbox
        this.setOrigin(0,1);
        this.canD = false;          //detect slide and use for returning original hitbox
        
    }

    update() {

        //movement controls
        if(!playerGotHit)
        this.body.velocity.x = 0;


        if (keyA.isDown && !playerGotHit){
            this.body.velocity.x = -100;

        }else if(keyD.isDown && !playerGotHit){
            this.body.velocity.x = 100;

        }
        if(keyJump.isDown && this.body.touching.down){
            this.body.velocity.y = -200;
            
            
        }

        //slide
        if(keySlide.isDown&& this.body.touching.down ){
            this.body.setSize(50, 20);
            this.canD = true;
    
        }
        //return to original size after slide
        if(!keySlide.isDown&& this.canD == true && this.body.touching.down){
            this.body.setSize(50, 40);
            this.body.velocity.y = -50;
            this.canD = false;
        }

        
        
        

    }

    
    
}
