// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture,frame) {
        super(scene, x, y, texture,frame);
        
        scene.add.existing(this);   // add to existing, displayList, updateList
        scene.physics.add.existing(this);   //give object physics

        
        this.body.collideWorldBounds = true;    //so it don't go out of canvas
        
        this.body.setSize(100, 120);
        this.body.setOffset(50,60);

        this.setOrigin(1,1); //set box origin to center of bottom edge
        this.canD = false;          //detect slide and use for returning original hitbox
        this.moveSpeed = 150; //player movement speed
        this.jumpStrength = 500; //player jump velocity
        this.isJumping = false; //player jumping flag
        this.isAirborne = false;
        this.jumpCount = 0; //number of jumps taken since last touching the ground
        this.jumpTime = 0; //jump duration timer
        this.isInvulnerable = false;
        this.isSlide = false;

        this.curScene = scene;  //save the player scene into var use for later

        this.offSlideCD = true;
        this.anims.play('mainRunMovement', true);
    }

    update(time, delta) {
        
        if(playerGotHit){
            
            this.anims.play('mainHitMovement', true);
        }
        //movement controls
        if(!keyA.isDown && !keyD.isDown && !this.canD && !playerGotHit)
        this.body.velocity.x = 0;

        
        if (keyA.isDown && !this.canD && !playerGotHit){
            //move left
            this.moveLeft();
            if(!this.isJumping && !this.isSlide){
                this.anims.play('mainIdleMovement', true);
            }
            

        }else if(keyD.isDown && !this.canD && !playerGotHit){
            //move right
            this.moveRight();
            if(!this.isJumping&& !this.isSlide){
                this.anims.play('mainRunMovement2', true);
            }
            
        }else if(!playerGotHit && !this.isAirborne){
            //not moving
            if(!this.isJumping&& !this.isSlide){
                this.anims.play('mainRunMovement', true);
            }
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
                
                //console.log("Single Jump from Ground");
                //console.log("Jump Count" + this.jumpCount);
            }
            else if(this.isJumping && this.jumpCount < 2){
                //this.anims.stop();
                this.jump();   
                this.curScene.sound.play('FlutterJump');
                
                //console.log("Double Jump after Jump in air");
                //console.log("Jump Count" + this.jumpCount);
            }
            else if(this.isAirborne && !this.isJumping && this.jumpCount == 0){

                //this.anims.stop();
                this.jump();
                this.curScene.sound.play('FlutterJump');
                this.jumpCount++;
                
                //console.log("Falling From Platform Double Jump");
                //console.log("Jump Count" + this.jumpCount);
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

        

        //switch case for animation
       
        // if(this.state != this.preAnime){

        //     switch(this.state){
        //         case 0:
        //             //idle
        //             this.anims.play('mainIdleMovement', true);
                    

        //             break;
        //         case 1:
                    
        //             //got hit
        //             this.anims.play('mainHitMovement', true);
                    
                    
        //             break;
        //         case 2:
        //             this.anims.play('mainRunMovement', true);
                    
        //             break;
        //         case 3:
        //             this.anims.play('mainRunMovement2', true);
                    

        //             break;
        //         case 4:
        //             this.anims.play('jumpMovement', true);
                    

        //             break;

        //     }
        // }
        
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
        console.log("jump");
        this.anims.play('jumpMovement', true);
        
    }

    slide(){
        
        this.isSlide = true;
        this.anims.play('slide', true);
        this.setPosition(this.x, this.y ); //move bounding box down

        this.body.setSize(100, 60);
        this.body.setOffset(0,100);
        this.body.velocity.x = 500;
        this.canD = true;
    }

    standUp(){
        this.setPosition(this.x, this.y - this.displayHeight/2); //move bounding box up
        this.body.setSize(100, 120);
        this.body.setOffset(50,60);
        //this.body.setOffset(500,1000);
        this.body.velocity.x = 0;
        this.canD = false;
        this.isSlide = false;
    }
    
    
}
