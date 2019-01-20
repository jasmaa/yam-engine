const Entities = require("./entities.js");

/**
 * Main engine
 */
class Engine{
	constructor(){
		this.entities = [];
	}

	// Initialize engine
	init(){
		// simple placeholder
		this.addEntity(new Entities.TestEntity());
	}

	// Update engine
	update(delta){
		this.entities.forEach(function(entity){
			entity.update(delta);
		});
	}

	// adds entity
	addEntity(entity){
		entity.init();
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
			context.fillStyle = "red";
			context.fillRect(entity.collider.x, entity.collider.y, entity.collider.w, entity.collider.h);
			context.restore();
		});
	}
}

// EXPORTS
module.exports = {
	Engine:Engine,
	Renderer:Renderer
}
