/*
Collaborators: Logan Flansaas, Omar Alkharji, Junle Yuan, Minmini Sanganathan

Game Title: That Time I Just Wanted To Make Toast But Got Isekai'd Into Another Dimension With An Eldritch Monster King!

Date Completed: 5/4/2022

Creative Tilt:
We are really proud of how we did our obstacle generation and an enemy type that was introduced.
For our obstacle generation, instead of what was shown in class,
we thought it would be better to generate a set of obstacles at random.
This would provide a better platforming experience since they are handcrafted to provide maximum fun.
We currently have 15 sets of obstacles that can be spawned.
In addition to the obstacles, we created a unique flying enemy that would fly in different paths.
This flying enemy would take a set of [x, y] values and draw a line of where it flies.
For the art direction, we looked beyond the class examples and attempted basic animation (smear frames, wing beats, etc.)
and our art assets are lively and colorful, something we are proud of. 
A hand-drawn "particle burst" is used in a few of our animations like the slide and damage taken animations,
and it leads to a fluid visual scene.
We also ensured that sound effects would make the player more satisfied with the game experience, 
such as the "anti-gravity" sound on the double jump, and the "flash" sound on the slide.
Our toast collection sound is very satisfying and would provide players another incentive to collect them. 
*/

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
            debug: false
        }
        
    },
    scene: [Load, Menu, End, PlayingScene, Controls]
    
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


