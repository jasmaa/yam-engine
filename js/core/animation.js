
/**
 * Animation controller states
 * @type {Object}
 */
 const ControllerState = {
   PLAY:0,
   PAUSE:1,
   REVERSE:2
 };

/**
 * Sprite data
 */
class Sprite {
  /**
   * Creates sprite
   * @param {[type]} img sprite sheet
   * @param {[type]} x   x position on sheet
   * @param {[type]} y   y position on sheet
   * @param {[type]} w   width
   * @param {[type]} h   height
   */
  constructor(img, x, y, w, h){
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  render(context, camera, position){
    context.drawImage(
      this.img,
      this.x, this.y,
      this.w, this.h,
      position.x - camera.position.x,
      position.y - camera.position.y,
      this.w, this.h
    );
  }
}

/**
 * Data for a set of animation frames
 */
class Animation {
  constructor(){
    this.frameNum = 0;
    this.frames = [];     // array of sprite frames
    this.timings = [];    // array of frame timings
    this.looping = false;
  }

  addFrame(sprite){
    this.frames.push(sprite);
  }

  getTotalFrames(){
    return this.frames.length;
  }

  getSprite(){
    return this.frames[this.frameNum];
  }

  next(){
    this.frameNum++;
    if(!this.looping && this.frameNum >= this.getTotalFrames()){
      this.frameNum = this.getTotalFrames() - 1;
    }
    else{
      this.frameNum %= this.getTotalFrames();
    }
  }

  prev(){
    this.frameNum--;
    if(!this.looping && this.frameNum < 0){
      this.frameNum = 0;
    }
    else{
      this.frameNum += this.getTotalFrames();
      this.frameNum %= this.getTotalFrames();
    }
  }

  reset(){
    this.frameNum = 0;
  }
}

 /**
  * Controls animations
  */
class AnimationController {

  constructor(){
    this.state = ControllerState.PAUSE;
    this.currAnim = null;
    this.animations = {};
  }

  update(delta){
    switch(this.state){
      case ControllerState.PLAY:
        this.animations[this.currAnim].next();
        break;
      case ControllerState.REVERSE:
        this.animations[this.currAnim].prev();
        break;
    }
  }

  play(){
    this.state = ControllerState.PLAY;
  }
  pause(){
    this.state = ControllerState.PAUSE;
  }

  getSprite(){
    return this.animations[this.currAnim].getSprite();
  }

  getAnimation(name){
    return this.animations[name];
  }

  setAnimation(name, anim){
    this.animations[name] = anim;
  }

  setCurrent(name){
    //if(this.animations[this.currAnim])
    //  this.animations[this.currAnim].reset();
    this.currAnim = name;
  }

  addAnimation(name){
    this.animations[name] = new Animation();
  }
}

module.exports = {
  Sprite:Sprite,
  Animation:Animation,
  AnimationController:AnimationController,
  ControllerState:ControllerState
};
