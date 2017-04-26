"use strict";

var powerLevel = require("../../powerLevel");

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function swapImageOnPowerThreshold(entity, elapsed) { // eslint-disable-line no-unused-vars
    var swapImageOnPowerThreshold = game.entities.getComponent(entity, "swapImageOnPowerThreshold");

    if (powerLevel.get() < 33) {
      game.entities.getComponent(entity, "image").name = swapImageOnPowerThreshold.first;
    }
    if (powerLevel.get() >= 33) {
      game.entities.getComponent(entity, "image").name = swapImageOnPowerThreshold.second;
    }
    if (powerLevel.get() >= 66) {
      game.entities.getComponent(entity, "image").name = swapImageOnPowerThreshold.third;
    }
  }, "swapImageOnPowerThreshold");
};
