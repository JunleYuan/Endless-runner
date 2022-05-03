// Path prefab
class Toast extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, player, gone) {
        super(scene, x, y,sprite, gone);

        //Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, sprite);

        scene.add.existing(this);   // add to existing, displayList, updateList
        scene.physics.add.existing(this);   //give object physics
  
        this.setPosition(x, y);
        this.body.allowGravity = false;

        this.anims.play('Toast', true);

        
        this.body.setSize(400, 400);

        this.die = false;

        this.curScene = scene;

        scene.physics.add.overlap(player, this, null,this.diefun(this));
            
    }

    update(time, delta) {

        //move object
        this.body.velocity.x = pspeed;

        if(this.body.x+this.body.width<0){
            console.log("toast gone");
            this.destroy();
        }
        if(this.die){

            this.on('animationcomplete', function(){
                this.destroy();
            });

            
        }

    }

    //destory toast on hit
    diefun(obj){

        return function() {
            obj.curScene.sound.play('ToastCollection');
            nubToast++;
            obj.die = true;
            console.log("diefun called, cur toast:"+ nubToast);
            obj.body.enable = false;
            obj.anims.play('getToast', true);
        };

    }

    
}
