const Entities = require('./entities.js');
const Physics = require('./physics.js');
const ResourceLoader = require('./resourceLoader.js');

/**
 * Main engine
 */
class Engine{
	constructor(inputDevice, screenDim){
		this.entities = [];
		this.inputDevice = inputDevice;
		this.screenDim = screenDim;
		this.player = new Entities.PlayerEntity(this.inputDevice);
		this.camera = new Entities.Camera(this.player, screenDim);
	}

	// Initialize engine
	init(){
		// simple test
		this.player.setPosition(300, 200);
		this.loadMap('res/map.json');
	}

	// Update engine
	update(delta){
		this.camera.update(delta);

		this.player.update(delta);
		Physics.handleCollision(this.player, this.entities);

		this.entities.forEach((entity) => {
			entity.update(delta);
			Physics.handleCollision(entity, this.entities);
		});
	}

	/**
	 * Adds variable number of entities
	 */
	addAllEntities(){
		for (var i = 0; i < arguments.length; i++) {
			this.entities.push(arguments[i]);
		}
	}

	/**
	 * Load in platforms as static entities
	 * @param  {[type]} path [description]
	 * @return {[type]}      [description]
	 */
	loadMap(path){
		ResourceLoader.readJSON(path).forEach((data) => {
			var obj = new Entities.PhysicalEntity();
			obj.setPosition(data.x, data.y);
			obj.setCollider(data.w, data.h);
			obj.hasGravity = false;
			obj.isStatic = true;
			this.addAllEntities(obj);
		});
	}
}

/**
 * Renders to canvas
 */
class Renderer{

	constructor(camera){
		this.camera = camera;
	}

	render(engine, context){
		engine.player.render(context, this.camera);
		engine.entities.forEach((entity) => {
			entity.render(context, this.camera);
		});
	}
}

// EXPORTS
module.exports = {
	Engine:Engine,
	Renderer:Renderer
};
