"use strict";

module.exports = function(ecs, game) {
  game.entities.registerSearch("matchParentRightSearch", ["position", "matchParentRight"]);
  ecs.addEach(function matchParentRight(entity, elapsed) { // eslint-disable-line no-unused-vars
    var match = game.entities.getComponent(entity, "matchParentRight");
    var position = game.entities.getComponent(entity, "position");
    //parents position and size
    var parentPosition = game.entities.getComponent(match.id, "position");
    var parentSize = game.entities.getComponent(match.id, "size");
    if (parentPosition === undefined) {
      return;
    }

    position.x = parentPosition.x + parentSize.width + match.offset;

  }, "matchParentRight");
};
