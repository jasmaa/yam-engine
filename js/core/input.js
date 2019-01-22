
class InputDevice{
  constructor(){
    this.leftDown = false;
    this.rightDown = false;
    this.upDown = false;
    this.downDown = false;
    this.primaryDown = false;
    this.secondaryDown = false;
  }
}

/**
 * Reads input from keys
 * @extends InputDevice
 */
class KeyboardDevice extends InputDevice{
  constructor(){
    super();

    window.addEventListener('keydown', (e) => {
  		switch(e.keyCode){
  			case 37:
  				this.leftDown = true;
  				break;
  			case 38:
  				this.upDown = true;
  				break;
  			case 39:
  				this.rightDown = true;
  				break;
  			case 40:
  				this.downDown = true;
  				break;
  			case 88:
  				this.primaryDown = true;
  				break;
  			case 90:
  				this.secondaryDown = true;
  				break;
  		}
  	});
  	window.addEventListener('keyup', (e) => {
  		switch(e.keyCode){
  			case 37:
  				this.leftDown = false;
  				break;
  			case 38:
  				this.upDown = false;
  				break;
  			case 39:
  				this.rightDown = false;
  				break;
  			case 40:
  				this.downDown = false;
  				break;
  			case 88:
  				this.primaryDown = false;
  				break;
  			case 90:
  				this.secondaryDown = false;
  				break;
  		}
  	});
  }
}

module.exports = {
  InputDevice:InputDevice,
  KeyboardDevice:KeyboardDevice
};
