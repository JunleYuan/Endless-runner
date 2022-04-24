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
            gravity: {y:100},
            debug: true
        }
        
    },
    scene: [ Menu,PlayingScene, Play ]

    
}
    

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyJump, keySlide, keyA, keyD;

//number of hits
let hit_count = 0;

let playerGotHit = false;

//Platform Options
let Obstacle_settings = {
    platformSpeed: 300,
    platformSpawnRange: [200,200],
    platformLength: [120,150],
    wallSpawnRate : 0,
    spikeSpawnRate : 100,
    toastSpawnRate: 100
}

