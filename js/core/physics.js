const Entities = require("./entities.js");

/**
 * Checks if two colliders are colliding
 * @param  {[type]}  entity [description]
 * @param  {[type]}  other  [description]
 * @return {Boolean}        [description]
 */
function isColliding(entity, other) {
  return (entity.position.x + entity.collider.offsetX < other.position.x + other.collider.offsetX + other.collider.w &&
    entity.position.x + entity.collider.offsetX + entity.collider.w > other.position.x + other.collider.offsetX &&
    entity.position.y + entity.collider.offsetY < other.position.y + other.collider.offsetY + other.collider.h &&
    entity.position.y + entity.collider.offsetY + entity.collider.h > other.position.y + other.collider.offsetY);
}

/**
 * Does box collision and pushes entity outside of collided area
 * @param  {[type]} entity   [description]
 * @param  {[type]} entities [description]
 * @return {[type]}          [description]
 */
function handleCollision(entity, entities) {
  // naive collision detection
  if (entity instanceof Entities.PhysicalEntity && !entity.isStatic) {
    entities.forEach((other) => {
      if (entity !== other && other instanceof Entities.PhysicalEntity) {
        // check for collision
        if (isColliding(entity, other)) {

          const aboveDiff = (other.position.y + other.collider.offsetY + other.collider.h) - (entity.position.y + entity.collider.offsetY);
          const belowDiff = (other.position.y + other.collider.offsetY) - (entity.position.y + entity.collider.offsetY + entity.collider.h);
          const rightDiff = (other.position.x + other.collider.offsetX) - (entity.position.x + entity.collider.offsetX + entity.collider.w);
          const leftDiff = (other.position.x + other.collider.offsetX + other.collider.w) - (entity.position.x + entity.collider.offsetX);

          const minDiff = Math.min(Math.abs(aboveDiff),Math.abs(belowDiff),Math.abs(rightDiff),Math.abs(leftDiff));

          if(minDiff == Math.abs(rightDiff)){
            entity.velocity.x = 0;
            entity.position.x += rightDiff;
          }
          else if(minDiff == Math.abs(leftDiff)){
            entity.velocity.x = 0;
            entity.position.x += leftDiff;
          }
          else if(minDiff == Math.abs(aboveDiff)){
            entity.velocity.y = 0;
            entity.position.y += aboveDiff;
          }
          else if(minDiff == Math.abs(belowDiff)){
            entity.velocity.y = 0;
            entity.position.y += belowDiff;
            entity.grounded = true;
          }
        }
      }
    });
  }
}

/**
 * Handles collision with projectile and enemy
 * @param  {[type]} entity   [description]
 * @param  {[type]} entities [description]
 * @return {[type]}          [description]
 */
function handleProjectileCollision(entity, entities){
  entities.forEach((other) => {
    if (other instanceof Entities.EnemyEntity) {
      // check for collision
      if (isColliding(entity, other)) {
        entity.hit = true;
      }
    }
  });
}

module.exports = {
  handleCollision: handleCollision,
  handleProjectileCollision: handleProjectileCollision
};
