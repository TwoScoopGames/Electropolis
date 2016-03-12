"use strict";

function shuffle(o) {
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function generatePowerThresholds(game) {
  var entitiesWithPowerThreshold = shuffle(game.entities.find("powerThreshold"));

  var step = 100 / entitiesWithPowerThreshold.length;
  var powerLevel = step;
  for (var i = 0; i < entitiesWithPowerThreshold.length; i++) {
    game.entities.set(entitiesWithPowerThreshold[i], "powerThreshold", powerLevel);
    powerLevel += step;
  }
}

var grid = require("../grid");

module.exports = function(game) { // eslint-disable-line no-unused-vars
  game.scaleCanvasToFitRectangle(1080, 1920);
  game.sounds.play("ThunderLoop.mp3", true);

  game.instantiatePrefab("powerLines");

  generatePowerThresholds(game);
  grid.create();
  grid.createEntities(game);
};
