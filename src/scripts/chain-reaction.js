"use strict";

var spawnLightning = require("../spawn-lightning");

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
  var lightningPoints = game.entities.getComponent(entity, "lightningPoints").points;
  var p1 = lightningPoints.shift();
  spawnLightning(p1.x, p1.y, lightningPoints[0].x, lightningPoints[0].y, game, 0);

  if (lightningPoints.length > 1) {
    var timers = game.entities.getComponent(entity, "timers");
    timers.chainReaction.running = true;
  }
};
