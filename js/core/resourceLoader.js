var fs = require('fs');
const Anim = require('./animation.js');

/**
 * Read in JSON from file system
 * @param  {[type]} path Path to file from project dir
 * @return {[type]}      JSON file
 */
function readJSON(path){
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

class SheetStore{
  constructor(){
    this.sheets = {};
    this.sprites = {};
  }

  loadSheet(name, src, infoPath){
    var img = new Image(1, 1);
    img.src = src;
    this.sheets[name] = img;

    // read in sprite data
    fs.readFileSync(infoPath, 'utf8').split("\n").forEach(line => {
      var data = line.split(" ");
      var sprite = new Anim.Sprite(
        img,
        parseInt(data[1]),
        parseInt(data[2]),
        parseInt(data[3]),
        parseInt(data[4])
      );
      this.sprites[data[0]] = sprite;
    });
  }

  getSprite(name){
    return this.sprites[name];
  }
}

class AnimStore {
  constructor(){
    this.animations = {};
  }

  loadAnim(sheetStore, infoPath){
    var anim;
    var name;

    // read in anim data
    fs.readFileSync(infoPath, 'utf8').split("\n").forEach(line => {
      var data = line.split(" ");

      if(data[0].trim() == "BEGIN"){
        anim = new Anim.Animation();
        name = data[1].trim();
        anim.looping = data[2].trim() == 1;
      }
      else if(data[0].trim() == "END"){
          this.animations[name] = anim;
          anim = null;
      }
      else if(anim){
        anim.addFrame(sheetStore.getSprite(data[0].trim()));
      }
    });
  }

  getAnim(name){
    return this.animations[name];
  }
}

module.exports = {
  readJSON:readJSON,
  SheetStore:SheetStore,
  AnimStore:AnimStore
};
