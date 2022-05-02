class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    this.load.atlas('open_atlas', 'assets/open.png', 'assets/open.json');
    

  }
  
  create() {
     // menu text configuration
    //  let menuConfig = {
    //   fontFamily: 'Courier',
    //   fontSize: '24px',
    //   backgroundColor: '#DD002F',
    //   color: '#FFFFFF',
    //   align: 'left',
    //   fixedWidth: 122,
    //   fixedHeight: 70

    // }

    

    this.anims.create({ 
      key: 'open', 
      frames: this.anims.generateFrameNames('open_atlas', {      
          prefix: 'Untitled-Artwork-',
          start: 1,
          end: 6,
          suffix: '',
          zeroPad: 1
      }), 
      frameRate: 10,
      repeat: -1 
  });


  this.op = this.add.sprite(0, 0).play('open').setOrigin(0,0).setScale(.5399);

 
  //play button
  this.playButton = this.add.text(374, 470, ' ').setOrigin(0.5,0).setInteractive();
  //this.playButton.setBackgroundColor('#DD002F');
  this.playButton.setDisplaySize(122, 70);
  this.playButton.on('pointerdown', () => {
    this.scene.start('playingScene'); 
  });
 
  //controls button
  this.controlsButton = this.add.text(605,500 , ' ').setOrigin(0.5,0).setInteractive();
  //this.controlsButton.setBackgroundColor('#DD002F');
  this.controlsButton.setDisplaySize(260, 20);
  this.controlsButton.on('pointerdown', () => {
    this.scene.start('controlsScene'); 
  });

  }
  
  update(time, delta) {

    

  }
  
}