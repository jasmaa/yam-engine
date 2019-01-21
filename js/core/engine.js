const Entities = require("./entities.js");
const Physics = require("./physics.js");

/**
 * Main engine
 */
class Engine{
	constructor(inputDevice){
		this.entities = [];
		this.inputDevice = inputDevice;
	}

	// Initialize engine
	init(){
		// simple placeholder
		var player = new Entities.PlayerEntity(this.inputDevice);
		var entity2 = new Entities.TestEntity();

		var floor = new Entities.PhysicalEntity();
		var floor2 = new Entities.PhysicalEntity();

		player.setPosition(100, 0);

		entity2.setPosition(0, -50);

		floor.setPosition(0, 400);
		floor.setCollider(800, 100);
		floor.hasGravity = false;
		floor.isStatic = true;

		floor2.setPosition(200, 300);
		floor2.setCollider(100, 30);
		floor2.hasGravity = false;
		floor2.isStatic = true;

		this.addEntity(player);
		this.addEntity(entity2);
		this.addEntity(floor);
		this.addEntity(floor2);
	}

	// Update engine
	update(delta){
		this.entities.forEach((entity) => {
			entity.update(delta);
			Physics.handleCollision(entity, this.entities);
		});
	}

	// adds entity
	addEntity(entity){
		this.entities.push(entity);
	}
}

/**
 * Renders to canvas
 */
class Renderer{

	render(engine, context){
		engine.entities.forEach(function(entity){
			context.save();
			context.drawImage(entity.img, entity.position.x, entity.position.y);
			context.fillStyle = "rgba(255, 0, 0, 0.5)";
			context.fillRect(entity.position.x + entity.collider.offsetX, entity.position.y + entity.collider.offsetY, entity.collider.w, entity.collider.h);
			context.restore();
		});
	}
}

// EXPORTS
module.exports = {
	Engine:Engine,
	Renderer:Renderer
}
