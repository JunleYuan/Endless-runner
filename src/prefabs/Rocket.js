// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;      // track rocket's firing status
        this.moveSpeed = 4;         // pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket')  // add rocket sfx
        this.cur_time = 0;
        this.pas_time = 0;
        this.canFire = true;

    }

    update() {
        // left/right movement
        //console.log(this.cur_time/1000);
        this.cur_time++;

        
        // fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring && this.canFire) {
            this.isFiring = true;
            this.canFire = false;
            this.sfxRocket.play();

            this.pas_time = this.cur_time;
        }
        if (this.cur_time-this.pas_time>250){
            this.canFire = true;

        }

        // if fired, move up
        if(this.isFiring && this.y >= 0) {
            this.y -= this.moveSpeed;
            this.x -= this.moveSpeed*1.5;
        }
        // reset on miss
        if(this.y <0 || this.x < 0) {
            
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = 342;
        this.x = 480;
    }
    
}
