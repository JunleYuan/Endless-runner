class Controls extends Phaser.Scene {
  constructor() {
    super("controlsScene");
  }

  preload() {
    this.load.bitmapFont('bm', 'assets/bm_0.png', 'assets/bm.xml');
  }

  create() {
    
    if(mnPlaying == 0){
      mnPlaying = 1;
    }
    //controls text
    let controlsText = this.add.bitmapText(game.config.width / 2, game.config.height / 3, 'bm', 'Press A to move left, and press D to move right \n\nPress W to jump, and W again while in the air to double jump \n\nPress S to slide under obstacles', 32).setOrigin(0.5, 0.5);
   
    //menu button
    let menuButton = this.add.bitmapText(game.config.width / 2, game.config.height / 1.5, 'bm', 'Main Menu', 32).setOrigin(0.5);
    menuButton.setInteractive();

    menuButton.on('pointerdown', () => {
      this.scene.start("menuScene");
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