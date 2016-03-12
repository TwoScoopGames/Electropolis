"use strict";

var random = require("./random");

module.exports = function(game, ferocity) {
  var cameraPosition = game.entities.get(0, "position");
  game.entities.set(0, "position", {
    "x": random.inRange(cameraPosition.x - ferocity, cameraPosition.x + ferocity),
    "y": random.inRange(cameraPosition.y - ferocity, cameraPosition.y + ferocity)
  });
  console.log("shake");
};
