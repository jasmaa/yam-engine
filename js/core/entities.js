/**
 * Base entity
 */
class Entity{
  constructor(){
    this.collider = {'x':0, 'y':0, 'w':10 ,'h':10};
  }
  init(){}
  update(delta){}
}

/**
 * Testing
 * @extends Entity
 */
class TestEntity extends Entity{
  init(){
    this.collider = {'x':0, 'y':0, 'w':30 ,'h':30};
  }

  update(delta){
    this.collider.x = (this.collider.x + 10) % 300
  }
}

module.exports = {
  Entity:Entity,
  TestEntity:TestEntity
}
