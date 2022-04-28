class Controls extends Phaser.Scene {
  constructor() {
    super("controlsScene");
  }

  preload() {
    this.load.bitmapFont('bm', 'assets/bm_0.png', 'assets/bm.xml');
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
    let controlsText = this.add.bitmapText(game.config.width / 2, game.config.height / 2, 'bm', 'Press A to move left, and press D to move right \n\nPress W to jump, and W again while in the air to double jump \n\nPress S to slide under obstacles', 20).setOrigin(0.5, 0.5);
    //this.controlsText = this.add.text(game.config.width/2, game.config.height/2, '', menuConfig).setOrigin(0.5,0.5);
    //this.controlsText.text = 'Press A to move left, and press D to move right \n\n Press W to jump, and W again while in the air to double jump \n\n Press S to slide under obstacles';

    //menu button
    let menuButton = this.add.bitmapText(game.config.width / 2, game.config.height / 1.5, 'bm', 'Main Menu', 34).setOrigin(0.5);
    menuButton.setInteractive();
    // this.menuButton = this.add.text(game.config.width/2, game.config.height/1.5, 'Main Menu', menuConfig).setOrigin(0.5,0).setInteractive();
    // this.menuButton.on('pointerdown', () => {
    //     this.scene.start('menuScene'); 
    // });

    menuButton.on('pointerdown', () => {
      this.scene.start("playingScene");
      isGameOver = false;
      hit_count = 0;
    });

    menuButton.on('pointerover', () => {
      menuButton.setScale(1.2);

    });
    menuButton.on('pointerout', () => {
      menuButton.setScale(1);

    });


  }

  update(time, delta) {

  }

}