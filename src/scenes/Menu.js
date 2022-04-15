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
    let platforms = this.physics.add.staticGroup();
    platforms.create(200, 568, 'ground').setScale(2).refreshBody();
    
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);


    this.physics.add.collider(this.player, platforms);


    


  }


  update() {


    //update prefeb
    this.player.update();

    
    

  }
}