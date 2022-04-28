class Controls extends Phaser.Scene {
  constructor() {
    super("controlsScene");
  }

  preload() {
    
  }
    
  create() {
    // menu text configuration
    let menuConfig = {
     fontFamily: 'Courier',
     fontSize: '24px',
     backgroundColor: '#000000',
     color: '#FFFFFF',
     align: 'center',
     padding: {
        top: 5,
        bottom: 5,
     },
     fixedWidth: 0
    }
    
    //controls text
    this.controlsText = this.add.text(game.config.width/2, game.config.height/2, '', menuConfig).setOrigin(0.5,0.5);
    this.controlsText.text = 'Press A to move left, and press D to move right \n\n Press W to jump, and W again while in the air to double jump \n\n Press S to slide under obstacles';

    //menu button
    menuConfig.backgroundColor = '#DD002F';
    this.menuButton = this.add.text(game.config.width/2, game.config.height/1.5, 'Main Menu', menuConfig).setOrigin(0.5,0).setInteractive();
    this.menuButton.on('pointerdown', () => {
        this.scene.start('menuScene'); 
    });
  }
    
  update(time, delta) {

  }
    
}