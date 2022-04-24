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
        this.moveSpeed = 200; //player movement speed
        this.jumpStrength = 600; //player jump velocity
        this.isJumping = false; //player jumping flag
        this.jumpCount = 0; //number of jumps taken since last touching the ground
        this.jumpTime = 0; //jump duration timer
    }

    update(time, delta) {

        //movement controls
        if(!playerGotHit)
        this.body.velocity.x = 0;

        //move left
        if (keyA.isDown && !playerGotHit){
            this.moveLeft();
        }
        //move right
        else if(keyD.isDown && !playerGotHit){
            this.moveRight();
        }

        //check if the player is touching the ground
        if(this.body.touching.down){
            this.isJumping = false;
            this.jumpTime = 0; //reset jump timer
            this.jumpCount = 0; //reset jumps taken
        }

        //player jumps if jump key is pressed while on the ground
        if(keyJump.isDown && !this.isJumping){
            this.jump();    
        }

        //if airborne, count up jump time
        if(this.isJumping){
            this.jumpTime += delta;
        }

        //player double jumps if in the air for at least 0.25 seconds and the W key is pressed
        if(this.jumpCount == 1 && this.jumpTime > 250 && keyJump.isDown){
            this.jump();
        }

        //player slide/crouch if S key is pressed
        if(keySlide.isDown && !this.isJumping && !this.canD ){
            this.slide();
        }
        //return to original size after slide
        if(!keySlide.isDown && this.canD){
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
        this.body.velocity.y = (-1)*this.jumpStrength; //move player upwards
        this.jumpCount += 1; //increment jumps taken
        this.isJumping = true; //flag player as jumping
    }

    slide(){
        this.setPosition(this.x, this.y + this.body.halfHeight/2); //move bounding box down
        this.body.setSize(45, this.body.halfHeight); //resize bounding box
        this.canD = true;
    }

    standUp(){
        this.setPosition(this.x, this.y - this.body.halfHeight); //move bounding box up
        this.body.setSize(30, this.body.height*2); //resize bounding box to original size
        this.canD = false;
    }
    
    
}
