"use strict";

module.exports = function(ecs, game) {
  game.entities.registerSearch("matchParentX", ["position", "matchX"]);
  ecs.addEach(function matchParentX(entity, elapsed) { // eslint-disable-line no-unused-vars
    var match = game.entities.get(entity, "matchX");
    var position = game.entities.get(entity, "position");

    var parentPosition = game.entities.get(match.id, "position");
    if (parentPosition === undefined) {
      return;
    }

    game.entities.set(entity, "position", {
      x: parentPosition.x + match.offset,
      y: position.y,
      z: position.z
    });
  }, "matchParentX");
};
