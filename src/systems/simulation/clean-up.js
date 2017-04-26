"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function cleanUp(entity, elapsed) { // eslint-disable-line no-unused-vars
    var position = game.entities.getComponent(entity, "position");
    var size = game.entities.getComponent(entity, "size");
    var cameraPosition = game.entities.getComponent(0, "position");

    if (position.x < cameraPosition.x - size.width) {
      game.entities.destroy(entity);
    }

  }, "cleanUp");
};
