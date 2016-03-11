
"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("fill-solid-color", ["fillColor", "position", "size"]);
  ecs.addEach(function(entity, context) { // eslint-disable-line no-unused-vars
    var position = game.entities.get(entity, "position");
    var size = game.entities.get(entity, "size");
    var fillColor = game.entities.get(entity, "fillColor");
    game.context.fillStyle = fillColor;
    game.context.fillRect(position.x, position.y, size.width, size.height);
  }, "fill-solid-color");
};
