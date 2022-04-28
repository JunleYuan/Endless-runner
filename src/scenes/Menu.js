class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    
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

  }
  
  update(time, delta) {

  }
  
}