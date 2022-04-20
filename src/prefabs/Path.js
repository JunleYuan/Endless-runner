// Path prefab
class Path extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite, speed) {
        super(scene, x, y,sprite, speed);

        Phaser.Physics.Arcade.Sprite.call(this, scene, x, y, sprite);
  
        //  This is the path the sprite will follow
        var points = [ 50, 400, 200, 400, 350, 300, 500, 500, 700, 400 ];

        
        this.path = new Phaser.Curves.Spline(points);
        this.pathIndex = 0;
        this.pathSpeed = speed;
        this.pathVector = new Phaser.Math.Vector2();
  
        this.path.getPoint(0, this.pathVector);
  
        this.setPosition(this.pathVector.x, this.pathVector.y);
    }

    update(time, delta) {

        this.anims.update(time, delta);
  
        this.path.getPoint(this.pathIndex, this.pathVector);
  
        this.setPosition(this.pathVector.x, this.pathVector.y);
  
        this.pathIndex = Phaser.Math.Wrap(this.pathIndex + this.pathSpeed, 0, 1);
        
    }
    
}
