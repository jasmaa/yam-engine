/**
 * Base entity
 */
class Entity{
  constructor(){
    this.img = new Image(1, 1);
    this.position = {'x':0, 'y':0};
    this.velocity = {'x':0, 'y':0};
    this.collider = {'offsetX':0, 'offsetY':0, 'w':30 ,'h':30};

    this.init();
  }
  init(){}
  update(delta){
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
  render(context, camera){
    context.save();
    context.drawImage(this.img, this.position.x - camera.position.x, this.position.y - camera.position.y);
    // render collider
    context.fillStyle = "rgba(255, 0, 0, 0.5)";
    context.fillRect(
      this.position.x + this.collider.offsetX - camera.position.x,
      this.position.y + this.collider.offsetY - camera.position.y,
      this.collider.w,
      this.collider.h
    );
    context.restore();
  }

  loadImg(path){
    this.img.src = path;
  }

  setPosition(x, y){
    this.position.x = x;
    this.position.y = y;
  }
  setCollider(w, h, offsetX=0, offsetY=0){
    this.collider.w = w;
    this.collider.h = h;
    this.collider.offsetX = offsetX;
    this.collider.offsetY = offsetY;
  }
}

/**
 * Collidable entity
 * @extends Entity
 */
class PhysicalEntity extends Entity{
  constructor(){
    super();
    this.hasGravity = true;
    this.isStatic = false;
    this.grounded = false;

    this.gravity = 1;
  }

  update(delta){
    super.update(delta);

    // do gravity
    if(this.hasGravity){
      this.velocity.y += this.gravity;
    }

    if(this.velocity.y > 20){
      this.velocity.y = 20;
    }
  }
}

/**
 * Controllable physics entity
 * @extends PhysicalEntity
 */
class PlayerEntity extends PhysicalEntity{
  constructor(inputDevice){
    super();
    this.inputDevice = inputDevice;

    this.loadImg("./res/test.bmp");
  }

  update(delta){
    super.update(delta);

    if(this.inputDevice.secondaryDown){
      // jump
      if(this.grounded){
        this.velocity.y = -10;
        this.grounded = false;
      }
      else{
        // lighten gravity for higher jumps
        this.gravity *= 0.8;
        if(this.gravity <= 0.4){
          this.gravity = 0.4;
        }
      }
    }

    // reset gravity on fall
    if(this.velocity.y >= 0){
      this.gravity /= 0.8;
      if(this.gravity >= 1){
        this.gravity = 1;
      }
    }

    // horizontal movement
    this.velocity.x = ((this.inputDevice.leftDown ? -1 : 0) + (this.inputDevice.rightDown ? 1 : 0)) * 3;
  }
}

class Camera{
  constructor(player){
    this.position = {'x':0, 'y':0};
    this.scrollBounds = {'x1':0, 'y1':0, 'x2':9000, 'y2':9000};
    this.player = player;
  }

  update(delta){

    if(!this.oldPos) this.oldPos = {'x':this.player.position.x, 'y':this.player.position.y};

    // follow player
    const deltaX = this.player.position.x - this.oldPos.x;
    const deltaY = this.player.position.y - this.oldPos.y;

    this.position.x += deltaX;
    this.position.y += deltaY;

    this.oldPos = {'x':this.player.position.x, 'y':this.player.position.y};
  }
}

module.exports = {
  Entity:Entity,
  PhysicalEntity:PhysicalEntity,
  PlayerEntity:PlayerEntity,
  Camera:Camera
};
