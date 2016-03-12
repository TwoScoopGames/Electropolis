"use strict";

module.exports = function(ecs, game) {
  game.entities.registerSearch("matchParentRightSearch", ["position", "matchParentRight"]);
  ecs.addEach(function matchParentRight(entity, elapsed) { // eslint-disable-line no-unused-vars
    var match = game.entities.get(entity, "matchParentRight");
    var position = game.entities.get(entity, "position");
    //parents position and size
    var parentPosition = game.entities.get(match.id, "position");
    var parentSize = game.entities.get(match.id, "size");
    if (parentPosition === undefined) {
      return;
    }

    game.entities.set(entity, "position", {
      x: parentPosition.x + parentSize.width + match.offset,
      y: position.y,
      z: position.z
    });

  }, "matchParentRight");
};
