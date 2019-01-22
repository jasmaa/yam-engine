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

  // TEMP: set image
  loadImg(path){
    this.img.src = path;
  }

  /**
   * Set position of entity
   * @param {[type]} x [description]
   * @param {[type]} y [description]
   */
  setPosition(x, y){
    this.position.x = x;
    this.position.y = y;
  }

  /**
   * Set collider params
   * @param {[type]} w           [description]
   * @param {[type]} h           [description]
   * @param {Number} [offsetX=0] [description]
   * @param {Number} [offsetY=0] [description]
   */
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

/**
 * Camera that follows player
 */
class Camera{
  constructor(player, screenDim){
    this.position = {'x':0, 'y':0};
    this.offset = {'x':0, 'y':0};
    this.scrollBounds = {'x1':-500, 'y1':-500, 'x2':500, 'y2':500};
    this.player = player;
    this.screenDim = screenDim;
  }

  update(delta){

    this.position.x = this.player.position.x - this.screenDim.w / 2 + this.player.collider.w / 2 + this.offset.x;
    this.position.y = this.player.position.y - this.screenDim.h / 2 + this.player.collider.h / 2 + this.offset.y;

    // lock cam within bounds
    if(this.position.x < this.scrollBounds.x1){
      this.position.x = this.scrollBounds.x1;
    }
    if(this.position.x > this.scrollBounds.x2){
      this.position.x = this.scrollBounds.x2;
    }
    if(this.position.y < this.scrollBounds.y1){
      this.position.y = this.scrollBounds.y1;
    }
    if(this.position.y > this.scrollBounds.y2){
      this.position.y = this.scrollBounds.y2;
    }
  }
}

module.exports = {
  Entity:Entity,
  PhysicalEntity:PhysicalEntity,
  PlayerEntity:PlayerEntity,
  Camera:Camera
};
