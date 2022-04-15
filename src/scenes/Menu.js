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
    

    //ground.body.innovable = True;
    //player.body.collideWorldBounds = true;


  }


  update() {

  }
}