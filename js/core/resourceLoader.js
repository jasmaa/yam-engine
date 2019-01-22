var fs = require('fs');

/**
 * Read in JSON from file system
 * @param  {[type]} path Path to file from project dir
 * @return {[type]}      JSON file
 */
function readJSON(path){
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

module.exports = {
  readJSON:readJSON
};
