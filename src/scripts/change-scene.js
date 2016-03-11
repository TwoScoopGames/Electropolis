"use strict";

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
  var scene = game.entities.get(entity, "change-scene");
  game.switchScene(scene);
};
