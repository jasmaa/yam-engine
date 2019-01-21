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
	}

	// Initialize engine
	init(){
		// simple placeholder
		var entity2 = new Entities.TestEntity();

		var floor = new Entities.PhysicalEntity();
		var floor2 = new Entities.PhysicalEntity();
		var floor3 = new Entities.PhysicalEntity();

		this.player.setPosition(100, 0);
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

		floor3.setPosition(400, 0);
		floor3.setCollider(100, 500);
		floor3.hasGravity = false;
		floor3.isStatic = true;

		this.addAllEntities(entity2, floor, floor2, floor3);
	}

	// Update engine
	update(delta){
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

	render(engine, context){
		engine.player.render(context);
		engine.entities.forEach(function(entity){
			entity.render(context);
		});
	}
}

// EXPORTS
module.exports = {
	Engine:Engine,
	Renderer:Renderer
};
