class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    this.load.image('spaceship', './assets/CoreFighter2.png');
    this.load.image('CoreFighter', './assets/CoreFighter.png');
    this.load.image('ground', './assets/ground.png');
    
  }

  


  
  
  create() {

    //items on screen
    this.player = new Player(this, 480,342, 'spaceship');
    let platforms = this.physics.add.staticGroup();
    platforms.create(200, 568, 'ground').setScale(2).refreshBody();
    
    //initialize controls
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keySlide = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    var stars = this.physics.add.group({ allowGravity: false , immovable: true});
    stars.add(new FlyingStar(this, 200, 300, 0.0005), true);
    

    //add collision with objects
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player, stars);

  }
  


  update() {


    //update prefeb
    this.player.update();

    
    

  }
}