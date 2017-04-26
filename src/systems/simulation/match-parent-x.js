"use strict";

module.exports = function(ecs, game) {
  game.entities.registerSearch("matchParentX", ["position", "matchX"]);
  ecs.addEach(function matchParentX(entity, elapsed) { // eslint-disable-line no-unused-vars
    var match = game.entities.getComponent(entity, "matchX");
    var position = game.entities.getComponent(entity, "position");

    var parentPosition = game.entities.getComponent(match.id, "position");
    if (parentPosition === undefined) {
      return;
    }

    position.x = parentPosition.x + match.offset;
  }, "matchParentX");
};
