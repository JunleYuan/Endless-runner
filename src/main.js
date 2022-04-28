let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:1200},
            debug: true
        }
        
    },
    scene: [Menu, End, PlayingScene, Controls]
    
}
    

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyJump, keySlide, keyA, keyD;

//test key for path
let spawn;

//number of hits
let hit_count = 0;

//did player get hit?
let playerGotHit = false;

//is game over?
let isGameOver = false;

//Platform speed
let pspeed = -100;

//  spawn next plaform if finish
let shouldSpawnP = false;



