"use strict";

var random = require("./random");

module.exports = function(game, ferocity) {
  var cameraPosition = game.entities.getComponent(0, "position");
  var position = game.entities.addComponent(0, "position");
  position.x = random.inRange(cameraPosition.x - ferocity, cameraPosition.x + ferocity);
  position.y = random.inRange(cameraPosition.y - ferocity, cameraPosition.y + ferocity);
  console.log("shake");
};
