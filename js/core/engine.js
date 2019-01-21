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
		var entity1 = new Entities.TestEntity();
		var entity2 = new Entities.TestEntity();

		var floor = new Entities.PhysicalEntity();
		var floor2 = new Entities.PhysicalEntity();

		entity1.velocity.y = -2;
		entity1.setPosition(100, 400);

		floor.setPosition(50, 200);
		floor.setCollider(300, 100);
		floor.hasGravity = false;
		floor.isStatic = true;

		floor2.setPosition(200, 0);
		floor2.setCollider(100, 300);
		floor2.hasGravity = false;
		floor2.isStatic = true;

		this.addEntity(entity1);
		//this.addEntity(entity2);
		this.addEntity(floor);
		this.addEntity(floor2);
	}

	// Update engine
	update(delta){
		this.entities.forEach((entity) => {
			entity.update(delta);

			// naive collision detection
			if(entity instanceof Entities.PhysicalEntity && !entity.isStatic){
					this.entities.forEach((other) => {

						if(entity !== other && other instanceof Entities.PhysicalEntity){

							// check for collision
							if(entity.position.x + entity.collider.offsetX < other.position.x + other.collider.offsetX + other.collider.w &&
								entity.position.x + entity.collider.offsetX + entity.collider.w > other.position.x + other.collider.offsetX &&
								entity.position.y + entity.collider.offsetY < other.position.y + other.collider.offsetY + other.collider.h &&
								entity.position.y + entity.collider.offsetY + entity.collider.h > other.position.y + other.collider.offsetY){


								// hit from right side
								if(entity.position.x + entity.collider.offsetX < other.position.x + other.collider.offsetX){
									console.log("hit right");
									entity.velocity.x = 0;
									entity.position.x += (other.position.x + other.collider.offsetX) - (entity.position.x + entity.collider.offsetX + entity.collider.w);
								}
								// hit from left side
								else if(entity.position.x + entity.collider.offsetX > other.position.x + other.collider.offsetX){
									console.log("hit left");
									entity.velocity.x = 0;
									entity.position.x += (other.position.x + other.collider.offsetX + other.collider.w) - (entity.position.x + entity.collider.offsetX);
								}


								// hit from above
								if(entity.position.y + entity.collider.offsetY > other.position.y + other.collider.offsetY){
										console.log("hit above");
										entity.velocity.y = 0;
										entity.position.y += (other.position.y + other.collider.offsetY + other.collider.h) - (entity.position.y + entity.collider.offsetY);
								}
								// hit from below
								else if(entity.position.y + entity.collider.offsetY < other.position.y + other.collider.offsetY){
										console.log("hit below");
										entity.velocity.y = 0;
										entity.position.y += (other.position.y + other.collider.offsetY) - (entity.position.y + entity.collider.offsetY + entity.collider.h);
								}
							}
						}
					});
			}
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
