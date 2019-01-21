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
  render(context){
    context.save();
    context.drawImage(this.img, this.position.x, this.position.y);
    // render collider
    context.fillStyle = "rgba(255, 0, 0, 0.5)";
    context.fillRect(this.position.x + this.collider.offsetX, this.position.y + this.collider.offsetY, this.collider.w, this.collider.h);
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
  }

  update(delta){
    super.update(delta);

    // do gravity
    if(this.hasGravity){
      this.velocity.y += 1;
    }

    if(this.velocity.y > 20){
      this.velocity.y = 20;
    }
  }
}

class PlayerEntity extends PhysicalEntity{
  constructor(inputDevice){
    super();
    this.inputDevice = inputDevice;
  }

  init(){
    this.loadImg("./res/test.bmp");
  }

  update(delta){
    super.update(delta);

    // detect input
    if(this.inputDevice.upDown && this.grounded){
      this.velocity.y = -20;
      this.grounded = false;
    }
    this.velocity.x = ((this.inputDevice.leftDown ? -1 : 0) + (this.inputDevice.rightDown ? 1 : 0)) * 5;
  }
}

class TestEntity extends PhysicalEntity{
  init(){
    this.loadImg("./res/test.bmp");
  }

  update(delta){
    super.update(delta);
  }
}

module.exports = {
  Entity:Entity,
  PhysicalEntity:PhysicalEntity,
  PlayerEntity:PlayerEntity,
  TestEntity:TestEntity
};
