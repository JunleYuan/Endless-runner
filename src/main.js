let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:100},
            debug: false
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


//testing
var high_score = 0;