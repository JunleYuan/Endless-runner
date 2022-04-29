// Path prefab
class Path extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, speed,points) {
        console.log(sprite);
  
        super(scene, x, y,sprite, speed,points);

        Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, sprite);
  
        //  This is the path the sprite will follow
        //var points = [700, 400,500, 500,350, 300, 50, 400, 200, 400];

        
        this.path = new Phaser.Curves.Spline(points);
        this.pathIndex = 0;
        this.pathSpeed = speed;
        this.pathVector = new Phaser.Math.Vector2();
  
        this.path.getPoint(0, this.pathVector);
  
        this.setPosition(this.pathVector.x, this.pathVector.y);
    }

    update(time, delta) {

        //this.anims.update(time, delta);
  
        this.path.getPoint(this.pathIndex, this.pathVector);
  
        this.setPosition(this.pathVector.x, this.pathVector.y);
  
        this.pathIndex = Phaser.Math.Wrap(this.pathIndex + this.pathSpeed, 0, 1);

        if(this.pathIndex >.99){
            this.setActive(false);
            this.setVisible(false);
            this.body.enable = false;

        }
        
    }
    
}
