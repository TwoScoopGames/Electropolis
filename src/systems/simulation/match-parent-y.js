"use strict";

module.exports = function(ecs, game) {
  game.entities.registerSearch("matchParentY", ["position", "matchY"]);
  ecs.addEach(function matchParentY(entity, elapsed) { // eslint-disable-line no-unused-vars
    var match = game.entities.get(entity, "matchY");
    var position = game.entities.get(entity, "position");

    var parentPosition = game.entities.get(match.id, "position");
    if (parentPosition === undefined) {
      return;
    }

    position.y = parentPosition.y + match.offset;
  }, "matchParentX");
};
