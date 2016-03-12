"use strict";

var powerLevel = require("../../powerLevel");

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
    var swapImageOnPowerThreshold = game.entities.get(entity, "swapImageOnPowerThreshold");
    var image = game.entities.get(entity, "image");
    var allPowerThesholds = game.entities.find("powerThreshold").length;

    if (powerLevel.get() < 33) {
      game.entities.set(entity, "image",{
        "name": swapImageOnPowerThreshold.first
      });
    } else if (powerLevel.get() >= 33) {
      game.entities.set(entity, "image",{
        "name": swapImageOnPowerThreshold.second
      });
    } else if (powerLevel.get() >= 66) {
      game.entities.set(entity, "image",{
        "name": swapImageOnPowerThreshold.third
      });
    }
  }, "swapImageOnPowerThreshold");
};
