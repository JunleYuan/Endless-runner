let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:100},
            debug: true
        }
        
    },
    scene: [ Menu, Play ]

    
}
    

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyJump, keySlide, keyA, keyD;

//number of hits
let hit_count = 0;


    // //testing out pathing
    // var FlyingStar = new Phaser.Class({

    //     Extends: Phaser.Physics.Arcade.Sprite,
    
    //     initialize:
    
    //     function FlyingStar (scene, x, y, speed)
    //     {
    //         Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, 'spaceship');
    
    //         //  This is the path the sprite will follow
    //         var points = [ 50, 400, 200, 400, 350, 300, 500, 500, 700, 400 ];

            
    //         this.path = new Phaser.Curves.Spline(points);
    //         this.pathIndex = 0;
    //         this.pathSpeed = speed;
    //         this.pathVector = new Phaser.Math.Vector2();
    
    //         this.path.getPoint(0, this.pathVector);
    
    //         this.setPosition(this.pathVector.x, this.pathVector.y);
    //     },
    
    //     preUpdate: function (time, delta)
    //     {
    //         this.anims.update(time, delta);
    
    //         this.path.getPoint(this.pathIndex, this.pathVector);
    
    //         this.setPosition(this.pathVector.x, this.pathVector.y);
    
    //         this.pathIndex = Phaser.Math.Wrap(this.pathIndex + this.pathSpeed, 0, 1);
    //     }

  //});