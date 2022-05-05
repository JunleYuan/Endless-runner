class End extends Phaser.Scene {
    constructor() {
        super("end");
    }

    create(){
        bkMusic.stop();
        this.sound.play('GameOver');

        this.anims.create({ 
            key: 'GmOr', 
            frames: this.anims.generateFrameNames('end_atlas', {      
                prefix: 'endscreen',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 1
            }), 
            frameRate: 10,
            repeat: -1 
        });
      
      
        this.end = this.add.sprite(0, 0).play('GmOr').setOrigin(0,0).setScale(.5399);
      
        var r1 = this.add.rectangle(game.config.width - 100, game.config.height - 60, 148, 50, 0x290133);
        r1.setStrokeStyle(4, 0xefc53f);
        var r2 = this.add.rectangle(game.config.width / 2, game.config.height - 60, 248, 100, 0x290133);
        r2.setStrokeStyle(4, 0xefc53f);

        let over = this.add.bitmapText(game.config.width / 2, game.config.height - 85, 'bm','Game Over',40).setOrigin(0.5);

        let scoreDisplay = this.add.bitmapText(game.config.width / 2, game.config.height- 40, 'bm','Score: ' + runScore.toFixed(0), 34).setOrigin(0.5);

        let again = this.add.bitmapText(game.config.width - 100, game.config.height - 60, 'bm','Again?',34).setOrigin(0.5);

       


        //make it clickable
        again.setInteractive();
        again.on('pointerover', () => {
            again.setScale(1.2);
      
        });
        again.on('pointerout', () => {
            again.setScale(1);
      
        });
        again.on('pointerdown', () => {
            isGameOver = false;
            hit_count = 0;
            nubToast = 0;
            playerGotHit = false;
            this.scene.start("playingScene");
            pspeed = -100;
        });

    }
  
    update(time, delta){


    }
}