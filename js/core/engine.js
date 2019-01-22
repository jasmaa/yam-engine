const Entities = require("./entities.js");
const Physics = require("./physics.js");

/**
 * Main engine
 */
class Engine{
	constructor(inputDevice){
		this.entities = [];
		this.inputDevice = inputDevice;
		this.player = new Entities.PlayerEntity(this.inputDevice);
		this.camera = new Entities.Camera(this.player);
	}

	// Initialize engine
	init(){
		// simple placeholder
		var entity2 = new Entities.Entity();

		var floor = new Entities.PhysicalEntity();
		var floor2 = new Entities.PhysicalEntity();
		var floor3 = new Entities.PhysicalEntity();

		this.player.setPosition(300, 200);
		//this.player.hasGravity = false;

		entity2.setPosition(0, -50);

		floor.setPosition(0, 400);
		floor.setCollider(800, 100);
		floor.hasGravity = false;
		floor.isStatic = true;

		floor2.setPosition(200, 300);
		floor2.setCollider(100, 30);
		floor2.hasGravity = false;
		floor2.isStatic = true;

		floor3.setPosition(400, 300);
		floor3.setCollider(300, 100);
		floor3.hasGravity = false;
		floor3.isStatic = true;

		this.addAllEntities(entity2, floor, floor2, floor3);
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

	// adds variable number of entities
	addAllEntities(){
		for (var i = 0; i < arguments.length; i++) {
			this.entities.push(arguments[i]);
		}
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
