let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    backgroundColor: '#4488aa',
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


// reserve keyboard variables
let keyJump, keySlide, keyA, keyD,keyF;

//test key for path
let spawn;

//Height of which gerrard will spawn
let ht1,ht2,ht3;

//number of hits
let hit_count = 0;

//did player get hit?
let playerGotHit = false;

//is game over?
let isGameOver = false;

//Platform speed
let pspeed = -100;
//Platform max speed
let MaxPSpeed = -1000;

let platsizeX = 205
let platsizeY = 40


//how much toast per collect
let nubToast = 0;
//max toast player can have
let MaxToast = 5;

//  spawn next plaform if finish
let shouldSpawnP = false;

// Music variable
let bkMusic, mnMusic;
let mnPlaying = 0;

//scoring
let runScore = 0;
