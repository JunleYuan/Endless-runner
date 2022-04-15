class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    // load audio
    this.load.audio('sfx_select', './assets/click.wav');
    this.load.audio('sfx_explosion', './assets/explosion.wav');
    this.load.audio('sfx_rocket', './assets/shoot.wav');
    this.load.audio('sfx_background', './assets/background.mp3');
    //load IMG
    this.load.spritesheet('space', './assets/space.png', { frameWidth: game.config.width, frameHeight: game.config.height, startFrame: 0, endFrame: 2 });
    this.load.bitmapFont('bm', 'assets/bm_0.png', 'assets/bm.xml');
    
  }

  
  create() {
  
    //background
    this.anims.create({
      key: 'earth',
      frames: this.anims.generateFrameNumbers('space', { start: 0, end: 1, first: 0 }),
      frameRate: 5
    });
    let backg = this.add.sprite(0, 0, 'space').setOrigin(0, 0);
    backg.anims.play('earth');             
    backg.on('animationcomplete', () => {    
      backg.anims.play('earth');
    });

    //text
    this.add.bitmapText(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding - 100, 'bm','Char\'s Revenge',34).setOrigin(0.5);
    this.add.bitmapText(game.config.width / 2, 180, 'bm','(F) to fire',34).setOrigin(0.5);

    //Easy button setting
    let easy_butt = this.add.bitmapText(game.config.width / 2, 250, 'bm','Easy Mode',34).setOrigin(0.5);
    //let easy_butt = this.add.text(game.config.width / 2, 250, 'Easy Mode', { fontFamily: "Comic Sans", fontSize: '48px',color: '#0f0' }).setOrigin(0.5);
    easy_butt.setInteractive();

    easy_butt.on('pointerover', () => {
      easy_butt.setScale(1.2);
      
    });

    easy_butt.on('pointerout', () => {
      easy_butt.setScale(1);

    });

    easy_butt.on('pointerdown', () => {
      // Novice mode
      game.settings = {
        spaceshipSpeed: 3,
        gameTimer: 60000
      }
      this.sound.play('sfx_select');

      this.clock = this.time.delayedCall(1000, () => {this.scene.start("playScene");}, null, this);
    });

    //Hard button setting
    let hard_butt = this.add.bitmapText(game.config.width / 2, 300, 'bm','Hard Mode',34).setOrigin(0.5).setOrigin(0.5);
    hard_butt.setInteractive();

    hard_butt.on('pointerover', () => {
      hard_butt.setScale(1.2);

    });

    hard_butt.on('pointerout', () => {
      hard_butt.setScale(1);

    });

    hard_butt.on('pointerdown', () => {
      // Expert mode
      game.settings = {
        spaceshipSpeed: 4,
        gameTimer: 45000
      }
      this.sound.play('sfx_select');
      this.clock = this.time.delayedCall(1000, () => {this.scene.start("playScene");}, null, this);
    });

    
    
    //menuConfig.backgroundColor = '#00FF00';
    //menuConfig.color = '#000';

  }


  update() {

  }
}