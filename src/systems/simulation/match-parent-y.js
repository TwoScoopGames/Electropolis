"use strict";

module.exports = function(ecs, game) {
  game.entities.registerSearch("matchParentY", ["position", "matchY"]);
  ecs.addEach(function matchParentY(entity, elapsed) { // eslint-disable-line no-unused-vars
    var match = game.entities.getComponent(entity, "matchY");
    var position = game.entities.getComponent(entity, "position");

    var parentPosition = game.entities.getComponent(match.id, "position");
    if (parentPosition === undefined) {
      return;
    }

    position.y = parentPosition.y + match.offset;
  }, "matchParentX");
};
