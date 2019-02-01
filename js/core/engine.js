const Entities = require('./entities.js');
const Physics = require('./physics.js');
const ResourceLoad = require('./resourceLoader.js');
const Anim = require('./animation.js');

/**
 * Main engine
 */
class Engine{
	constructor(inputDevice, screenDim){
		this.entities = [];
		this.inputDevice = inputDevice;
		this.screenDim = screenDim;
		this.player = new Entities.BasicPlayerEntity(this.inputDevice);
		this.camera = new Entities.Camera(this.player, screenDim);

		this.sheetStore = new ResourceLoad.SheetStore();
	}

	// Initialize engine
	init(){
		// simple test
		this.loadMap('res/map.json');
		this.sheetStore.loadSheet(
			"mario",
			"res/sample/mario.png",
			"res/sample/marioSprites.txt"
		);

		this.player.setPosition(300, 200);
		this.player.currSprite = this.sheetStore.getSprite("mario02");

		// add timings later...
		var idleAnim = this.player.animController.getAnimation("Idle");
		idleAnim.looping = true;
		idleAnim.addFrame(this.sheetStore.getSprite("mario01"));
		idleAnim.addFrame(this.sheetStore.getSprite("mario01"));
		idleAnim.addFrame(this.sheetStore.getSprite("mario01"));
		idleAnim.addFrame(this.sheetStore.getSprite("mario01"));
		idleAnim.addFrame(this.sheetStore.getSprite("mario02"));
		idleAnim.addFrame(this.sheetStore.getSprite("mario02"));
		idleAnim.addFrame(this.sheetStore.getSprite("mario02"));
		idleAnim.addFrame(this.sheetStore.getSprite("mario02"));
		idleAnim.addFrame(this.sheetStore.getSprite("mario03"));
		idleAnim.addFrame(this.sheetStore.getSprite("mario03"));
		idleAnim.addFrame(this.sheetStore.getSprite("mario03"));
		idleAnim.addFrame(this.sheetStore.getSprite("mario03"));
		idleAnim.addFrame(this.sheetStore.getSprite("mario04"));
		idleAnim.addFrame(this.sheetStore.getSprite("mario04"));
		idleAnim.addFrame(this.sheetStore.getSprite("mario04"));
		idleAnim.addFrame(this.sheetStore.getSprite("mario04"));
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
	 * @param  {[type]} args entities to add
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
		ResourceLoad.readJSON(path).forEach((data) => {
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
