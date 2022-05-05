class Controls extends Phaser.Scene {
  constructor() {
    super("controlsScene");
  }

  create() {
    this.anims.create({ 
      key: 'slide_menu', 
      frames: this.anims.generateFrameNames('main_atlas', {      
          prefix: 'slide_',
          start: 1,
          end: 15,
          suffix: '',
          zeroPad: 3
      }), 
      frameRate: 13,
      repeatDelay : 900,
      repeat: -1 
  });

  this.anims.create({ 
      key: 'jump_Menu', 
      frames: this.anims.generateFrameNames('main_atlas', {      
          prefix: 'jump_',
          start: 1,
          end: 13,
          suffix: '',
          zeroPad: 3
      }), 
      frameRate: 20,
      repeatDelay : 600,
      repeat: -1 
  });

  this.anims.create({ 
    key: 'Run_Menu', 
    frames: this.anims.generateFrameNames('main_atlas', {      
        prefix: 'run_',
        start: 1,
        end: 3,
        suffix: '',
        zeroPad: 3
    }), 
    frameRate: 15,
    repeat: -1
});

this.anims.create({ 
  key: 'GerrardMenu', 
  frames: this.anims.generateFrameNames('Gerrard_atlas', {      
      prefix: 'Gerrard--',
      start: 1,
      end: 9,
      suffix: '',
      zeroPad: 1
  }), 
  frameRate: 10,
  repeat: -1 
});

this.anims.create({ 
  key: 'HitMenu', 
  frames: this.anims.generateFrameNames('main_atlas', {      
      prefix: 'ouch_',
      start: 1,
      end: 8,
      suffix: '',
      zeroPad: 3
  }), 
  frameRate: 15,
  repeatDelay : 600,
  repeat: -1
});

    if(mnPlaying == 0){
      mnPlaying = 1;
    }
    //controls text
    var sd = this.add.sprite(500, 200, 'Spikes').setScale(0.8);
    sd.play("slide_menu");

    var run = this.add.sprite(720, 40, 'Spikes').setScale(0.8);
    run.play("Run_Menu");

    var jump = this.add.sprite(870, 120, 'Spikes').setScale(0.8);
    jump.play("jump_Menu");

    var hit = this.add.sprite(620, 310, 'Spikes').setScale(0.7);
    var spike = this.add.sprite(720, 320, 'Spikes').setScale(0.1);
    var wall = this.add.sprite(780,320, 'Wall').setScale(0.1);
    var miniG = this.add.sprite(880,320, 'Wall').setScale(0.1);
    miniG.play('GerrardMenu');
    hit.play('HitMenu');

    let controlsText = this.add.bitmapText(game.config.width / 2 - 50, game.config.height / 3, 'bm', 'Press A to move left, and press D to move right \n\n\nPress W to jump, and W again while in the air to double jump \n\n\nPress S to slide under obstacles\n\n\nWatch Out for Obstacles!', 28).setOrigin(0.5, 0.5);
    
    //menu button
    let menuButton = this.add.bitmapText(game.config.width / 2, game.config.height / 1.5 + 100, 'bm', 'Main Menu', 32).setOrigin(0.5);
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