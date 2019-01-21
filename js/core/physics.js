const Entities = require("./entities.js");

/**
 * Does box collision and pushes entity outside of collided area
 * @param  {[type]} entity   [description]
 * @param  {[type]} entities [description]
 * @return {[type]}          [description]
 */
function handleCollision(entity, entities){
  // naive collision detection
  if(entity instanceof Entities.PhysicalEntity && !entity.isStatic){
    entities.forEach((other) => {
        if(entity !== other && other instanceof Entities.PhysicalEntity){
          // check for collision
          if(entity.position.x + entity.collider.offsetX < other.position.x + other.collider.offsetX + other.collider.w &&
            entity.position.x + entity.collider.offsetX + entity.collider.w > other.position.x + other.collider.offsetX &&
            entity.position.y + entity.collider.offsetY < other.position.y + other.collider.offsetY + other.collider.h &&
            entity.position.y + entity.collider.offsetY + entity.collider.h > other.position.y + other.collider.offsetY){

              const threshold = 30;

              // hit from above
              if(entity.position.y + entity.collider.offsetY > other.position.y + other.collider.offsetY){
                  console.log("hit above");
                  var diff = (other.position.y + other.collider.offsetY + other.collider.h) - (entity.position.y + entity.collider.offsetY);
                  if(Math.abs(diff) < threshold){
                    entity.velocity.y = 0;
                    entity.position.y += diff;
                  }
              }
              // hit from below
              else if(entity.position.y + entity.collider.offsetY < other.position.y + other.collider.offsetY){
                  console.log("hit below");
                  var diff = (other.position.y + other.collider.offsetY) - (entity.position.y + entity.collider.offsetY + entity.collider.h);
                  if(Math.abs(diff) < threshold){
                    entity.velocity.y = 0;
                    entity.position.y += diff;
                  }
              }

              // hit from right side
              if(entity.position.x + entity.collider.offsetX < other.position.x + other.collider.offsetX){
                console.log("hit right");
                var diff = (other.position.x + other.collider.offsetX) - (entity.position.x + entity.collider.offsetX + entity.collider.w);
                if(Math.abs(diff) < threshold){
                  entity.velocity.x = 0;
                  entity.position.x += diff;
                }
              }
              // hit from left side
              else if(entity.position.x + entity.collider.offsetX > other.position.x + other.collider.offsetX){
                console.log("hit left");
                var diff = (other.position.x + other.collider.offsetX + other.collider.w) - (entity.position.x + entity.collider.offsetX);
                if(Math.abs(diff) < threshold){
                  entity.velocity.x = 0;
                  entity.position.x += diff;
                }
              }

          }
        }
      });
  }
}

module.exports = {
  handleCollision: handleCollision
}
