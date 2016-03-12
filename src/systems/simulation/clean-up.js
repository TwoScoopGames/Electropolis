"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function cleanUp(entity, elapsed) { // eslint-disable-line no-unused-vars
    var position = game.entities.get(entity, "position");
    var size = game.entities.get(entity, "size");
    var cameraPosition = game.entities.get(0, "position");

    if (position.x < cameraPosition.x - size.width) {
      console.log("destory cloud");
      game.entities.destroy(entity);
    }

  }, "cleanUp");
};
