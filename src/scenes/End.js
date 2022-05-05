class End extends Phaser.Scene {
    constructor() {
        super("end");
    }

    create(){
        bkMusic.stop();

        this.sound.play('GameOver');

        this.anims.create({ 
            key: 'end', 
            frames: this.anims.generateFrameNames('endC_atlas', {      
                prefix: 'endscreen ',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 1
            }), 
            frameRate: 5,
            repeat: -1 
        });

        let scoreDisplay = this.add.bitmapText(game.config.width / 2, game.config.height/2, 'bm','Score: ' + runScore.toFixed(0), 34).setOrigin(0.5);

        this.clock = this.time.delayedCall(3000, () => {
            mnMusic = this.sound.add('MenuMusic',{volume: 0.3});
            mnMusic.loop = true; // Sets Loop
            mnMusic.play();


            this.ed = this.add.sprite(0, 0).play('end').setOrigin(0,0).setScale(.5399);
            this.goMenu = this.add.text(860, 450, ' ').setOrigin(0.5,0).setInteractive();
            //this.goMenu.setBackgroundColor('#DD002F');
            this.goMenu.setDisplaySize(70, 40);
            this.goMenu.on('pointerdown', () => {
                isGameOver = false;
                hit_count = 0;
                nubToast = 0;
                pspeed = -100;
                playerGotHit = false;
                mnMusic.stop();
                this.scene.start('menuScene'); 
            });
        }, null, this);
    }
  
    update(time, delta){


    }
}