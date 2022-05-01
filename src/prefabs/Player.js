// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture,frame) {
        super(scene, x, y, texture,frame);
        
        scene.add.existing(this);   // add to existing, displayList, updateList
        scene.physics.add.existing(this);   //give object physics


        
        this.body.collideWorldBounds = true;    //so it don't go out of canvas
        //this.setSize(300, 260, true);         //give hitbox
        this.body.setSize(30, 60);
        this.setOrigin(0.5,1); //set box origin to center of bottom edge
        this.canD = false;          //detect slide and use for returning original hitbox
        this.moveSpeed = 150; //player movement speed
        this.jumpStrength = 500; //player jump velocity
        this.isJumping = false; //player jumping flag
        this.isAirborne = false;
        this.jumpCount = 0; //number of jumps taken since last touching the ground
        this.jumpTime = 0; //jump duration timer
        this.isInvulnerable = false;
        this.isIdle = true;
        this.isFacingRight = false;
        this.isFacingLeft = false;

        

        this.curScene = scene;  //save the player scene into var use for later

        this.offSlideCD = true;
    }

    update(time, delta) {
        
        //movement controls
        if(!keyA.isDown && !keyD.isDown && !this.canD && !playerGotHit)
        this.body.velocity.x = 0;

        //move left
        if (keyA.isDown && !this.canD && !playerGotHit){
            this.moveLeft();
            this.isIdle = false;
            this.isFacingRight = false;
            this.isFacingLeft = true;
        }
        //move right
        else if(keyD.isDown && !this.canD && !playerGotHit){
            this.isIdle = false;
            this.isFacingRight = true;
            this.isFacingLeft = false;
            this.moveRight();
        }
        
        else{
            this.isIdle = true;
            this.isFacingRight = false;
            this.isFacingLeft = false;
        }        
        //check if the player is touching the ground
        if(this.body.touching.down){
            this.isJumping = false;
            this.isAirborne = false;
            this.jumpTime = 0; //reset jump timer
            this.jumpCount = 0; //reset jumps taken
        }
        
        if(!this.body.touching.down){
            this.isAirborne = true;
        }

        //player jumps if jump key is pressed while on the ground
        if(Phaser.Input.Keyboard.JustDown(keyJump)){
            if(!this.isJumping && !this.isAirborne){
                this.jump();   
                this.curScene.sound.play('GroundJump');
                console.log("Single Jump from Ground");
                console.log("Jump Count" + this.jumpCount);
            }
            else if(this.isJumping && this.jumpCount < 2){
                this.jump();   
                this.curScene.sound.play('FlutterJump');
                console.log("Double Jump after Jump in air");
                console.log("Jump Count" + this.jumpCount);
            }
            else if(this.isAirborne && !this.isJumping && this.jumpCount == 0){
                this.jump();
                this.curScene.sound.play('FlutterJump');
                this.jumpCount++;
                console.log("Falling From Platform Double Jump");
                console.log("Jump Count" + this.jumpCount);
            }
            
        }

        //player slide/crouch if S key is pressed
        if(keySlide.isDown && !this.isJumping && !this.canD && keySlide.getDuration()<200 && this.offSlideCD){
            this.slide();
            this.offSlideCD = false;
            this.curScene.sound.play('slideSound');
            
            this.curScene.time.delayedCall(400, () => {
                //console.log("worj pls");
                this.standUp();

            }, null, this);

            //give slide a cooldown
            this.curScene.time.delayedCall(3000, () => {
                this.offSlideCD = true;

            }, null, this);
        
        }

        //if the player has been hit, make the player invulnerable for 1 second
        if(playerGotHit && !this.isInvulnerable){
            this.isInvulnerable = true;
            console.log('Player should be invulnerable');
            this.curScene.time.delayedCall(1000, () => {
                playerGotHit = false;
                this.isInvulnerable = false;
            }, null, this);
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
