class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    this.load.image('spaceship', './assets/CoreFighter2.png');
    this.load.image('CoreFighter', './assets/CoreFighter.png');
    this.load.image('ground', './assets/ground.png');
    this.load.image('gerald', './assets/gerald temp.png');
    
  }

  


  
  
  create() {

    //items on screen
    this.player = new Player(this, 480,342, 'spaceship');
    let platforms = this.physics.add.staticGroup();
    platforms.create(200, 520, 'ground').setScale(2).refreshBody();

    this.gerald = new Gerald(this,0,0,'gerald',0).setOrigin(.8,0).setPushable(false).setScale(1,5);
    this.gerald.depth = 2;
    
    //initialize controls
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keySlide = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    //This is the path the sprite will follow
    this.points = [700, 400,500, 500,350, 300, 50, 400, 200, 400]
    this.smallG = this.physics.add.group({ allowGravity: false , immovable: true});
    this.path = new Path(this, 200, 300, 'spaceship', 0.005,this.points);
    this.smallG.add(this.path, true);
    
    //add collision with objects
    this.physics.add.collider(this.player, platforms);
    //this.physics.add.collider(this.player, this.stars);

    //if player gets hit there is a knock back
    this.hitG = this.physics.add.overlap(this.player, this.smallG, null, function (){ 
      hit_count += 1;
      console.log("maybe");
      this.path.setActive(false);
      this.path.setVisible(false);
      this.path.body.enable = false;

      playerGotHit = true;
      this.player.body.velocity.x = -300;
      this.player.body.velocity.y = -50;
      this.time.delayedCall(500, () => {
        playerGotHit = false;
    
      }, null, this);

    }, this);

    this.physics.add.overlap(this.player, this.gerald,this.playerHitG);

  }
  
  update(time, delta) {

    //update prefeb
    this.player.update(time, delta);
    this.path.update();
    this.gerald.update();

    //reset and spawn in gerrard
    if(keySlide.isDown){

      this.path.body.reset(700, 400);
      this.path.setActive(true);
      this.path.setVisible(true);
      this.path.pathIndex = 0;
      this.path.body.enable = true;
    }

  }
  
  //game over if hit gerald
  playerHitG(){
    console.log("GG");


  }

}