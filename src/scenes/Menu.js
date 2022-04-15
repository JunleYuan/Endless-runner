class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    this.load.image('spaceship', './assets/CoreFighter2.png');
    this.load.image('ground', './assets/ground.png');
    
  }
  
  
  create() {

  
    this.player = new Player(this, 480,342, 'spaceship').setOrigin(0.5, 0);

    //let ground = this.add.sprite(0,500,'ground');
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    //ground.body.innovable = True;
    //player.body.collideWorldBounds = true;


  }


  update() {

    //update prefeb
    this.player.update();
    

  }
}