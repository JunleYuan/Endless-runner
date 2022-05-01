class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    this.load.atlas('platformer_atlas', '/assets/idle.png', '/assets/idle_atlas.json');

  }
  
  create() {
     // menu text configuration
     let menuConfig = {
      fontFamily: 'Courier',
      fontSize: '24px',
      backgroundColor: '#DD002F',
      color: '#FFFFFF',
      align: 'center',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 0
    }

    //display title
    this.title = this.add.text(game.config.width/2, borderUISize + borderPadding*2.4, 'Endless Runner', menuConfig).setOrigin(0.5,0);

    //play button
    this.playButton = this.add.text(game.config.width/2, game.config.height/2, 'Play!', menuConfig).setOrigin(0.5,0).setInteractive();
    this.playButton.on('pointerdown', () => {
      this.scene.start('playingScene'); 
    });
   
    //controls button
    this.controlsButton = this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2, 'Controls', menuConfig).setOrigin(0.5,0).setInteractive();
    this.controlsButton.on('pointerdown', () => {
      this.scene.start('controlsScene'); 
    });

//     this.anims.create({ 
//       key: 'walk', 
//       frames: this.anims.generateFrameNames('platformer_atlas', {      
//           prefix: 'Idle',
//           start: 1,
//           end: 3,
//           suffix: '',
//           zeroPad: 2
//       }), 
//       frameRate: 30,
//       repeat: -1 
//   });

//   this.anims.create({
//     key: 'idle',
//     defaultTextureKey: 'platformer_atlas',
//     frames: [
//         { frame: 'Idle01' }
//     ],
//     repeat: -1
// });

  //this.alien = this.physics.add.sprite(game.config.width/2, game.config.height/6, 'platformer_atlas', 'Idle01').setScale(1);



  }
  
  update(time, delta) {

    

  }
  
}