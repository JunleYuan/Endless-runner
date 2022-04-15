// Player prefab
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);   // add to existing, displayList, updateList
        scene.physics.add.existing(this);
        this.body.collideWorldBounds = true;
    }

    update() {

        if(Phaser.Input.Keyboard.JustDown(keyA)){


        }
        if(Phaser.Input.Keyboard.JustDown(keyD)){


        }


    }

    
    
}
