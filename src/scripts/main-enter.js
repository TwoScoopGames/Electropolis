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
    game.entities.setComponent(entitiesWithPowerThreshold[i], "powerThreshold", powerLevel);
    powerLevel += step;
  }
}

var grid = require("../grid");
var powerLevel = require("../powerLevel");

module.exports = function(game) { // eslint-disable-line no-unused-vars
  game.scaleCanvasToFitRectangle(1080, 1920);
  game.sounds.play("ThunderLoop.mp3", true);

  game.animations["symbol-tri-f13"][0].time = 2000;
  game.animations["symbol-sqa-f13"][0].time = 2000;
  game.animations["symbol-sta-f13"][0].time = 2000;
  game.animations["symbol-cir-f13"][0].time = 2000;

  powerLevel.set(50);
  generatePowerThresholds(game);
  grid.create();
  grid.createEntities(game);
};
