const Entities = require('./entities.js');
const Physics = require('./physics.js');
const ResourceLoad = require('./resourceLoader.js');
const Anim = require('./animation.js');

/**
 * Main engine
 */
class Engine{
	constructor(inputDevice, screenDim){
		this.staticEntities = [];
		this.projectileEntities = [];
		this.inputDevice = inputDevice;
		this.screenDim = screenDim;
		this.player = new Entities.BasicPlayerEntity(this.inputDevice, this.projectileEntities);
		this.camera = new Entities.Camera(this.player, screenDim);

		this.sheetStore = new ResourceLoad.SheetStore();	// do for more sheets later
		this.animStore = new ResourceLoad.AnimStore();
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

		this.animStore.loadAnim(this.sheetStore, "res/sample/anim.txt");

		this.player.setPosition(300, 200);
		this.player.currSprite = this.sheetStore.getSprite("mario02");

		// add timings later...
		this.player.animController.setAnimation("Walk", this.animStore.getAnim("Walk"));
		this.player.animController.setAnimation("Idle", this.animStore.getAnim("Idle"));
		this.player.animController.setAnimation("Jump", this.animStore.getAnim("Jump"));
	}

	// Update engine
	update(delta){
		this.camera.update(delta);

		this.player.update(delta);
		Physics.handleCollision(this.player, this.staticEntities);

		/*
		this.staticEntities.forEach((entity) => {
			entity.update(delta);
			Physics.handleCollision(entity, this.staticEntities);
		});
		*/

		this.projectileEntities.forEach((entity) => {
			entity.update(delta);
			//Physics.handleProjectileCollision(entity, this.staticEntities);

			// kill object
			if(!entity.alive || entity.hit){
				this.projectileEntities.splice(this.projectileEntities.indexOf(entity), 1);
			}
		});
	}

	/**
	 * Adds variable number of entities
	 * @param  {[type]} entities entity list to add to
	 * @param  {[type]} arg entities to add
	 */
	addEntity(entities, arg){
		entities.push(arg);
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
			this.addEntity(this.staticEntities, obj);
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
		engine.staticEntities.forEach((entity) => {
			entity.render(context, this.camera);
		});
		engine.projectileEntities.forEach((entity) => {
			entity.render(context, this.camera);
		});
	}
}

// EXPORTS
module.exports = {
	Engine:Engine,
	Renderer:Renderer
};
