// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);   // add to existing, displayList, updateList
        scene.physics.add.existing(this);   //give object physics
        this.body.collideWorldBounds = true;    //so it don't go out of canvas
        this.body.setSize(30, 60);          //give hitbox
        this.setOrigin(0.5,1); //set box origin to center of bottom edge
        this.canD = false;          //detect slide and use for returning original hitbox
        this.moveSpeed = 150; //player movement speed
        this.jumpStrength = 500; //player jump velocity
        this.isJumping = false; //player jumping flag
        this.jumpCount = 0; //number of jumps taken since last touching the ground
        this.jumpTime = 0; //jump duration timer
    }

    update(time, delta) {
        
        //movement controls
        if(!playerGotHit&& !this.canD)
        this.body.velocity.x = 0;

        //move left
        if (keyA.isDown && !playerGotHit&&!this.canD){
            this.moveLeft();
        }
        //move right
        else if(keyD.isDown && !playerGotHit&&!this.canD){
            this.moveRight();
        }

        //check if the player is touching the ground
        if(this.body.touching.down){
            this.isJumping = false;
            this.jumpTime = 0; //reset jump timer
            this.jumpCount = 0; //reset jumps taken
        }

        //player jumps if jump key is pressed while on the ground
        if(Phaser.Input.Keyboard.JustDown(keyJump) && (!this.isJumping || this.jumpCount < 2)){
            this.jump();   
            console.log("Jump Count" + this.jumpCount);
        }

        //player slide/crouch if S key is pressed
        if(keySlide.isDown && !this.isJumping && !this.canD){
            this.slide();
        }
        //return to original size after slide
        if((!keySlide.isDown && this.canD) || keySlide.getDuration()>200){
            this.standUp();
        }
    }

    //player actions
    moveLeft(){
        this.body.velocity.x = -(1)*this.moveSpeed;
    }

    moveRight(){
        this.body.velocity.x = this.moveSpeed;
    }

    jump(){
        this.body.setVelocityY(this.jumpStrength * -1); //move player upwards
        this.jumpCount += 1; //increment jumps taken
        this.isJumping = true; //flag player as jumping
    }

    slide(){
        this.setPosition(this.x, this.y + this.body.halfHeight/2); //move bounding box down
        this.body.setSize(45, this.body.halfHeight); //resize bounding box
        this.body.velocity.x = 500;
        this.canD = true;
    }

    standUp(){
        this.setPosition(this.x, this.y - this.body.halfHeight); //move bounding box up
        this.body.setSize(30, this.body.height*2); //resize bounding box to original size
        this.body.velocity.x = 0;
        this.canD = false;
    }
    
    
}
