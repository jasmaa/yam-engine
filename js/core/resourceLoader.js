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

module.exports = {
  readJSON:readJSON,
  SheetStore:SheetStore
};
