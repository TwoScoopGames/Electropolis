"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
    var powerThreshold = game.entities.get(entity, "powerThreshold");
    var animation = game.entities.get(entity, "animation");
    var allPowerThesholds = game.entities.find("powerThreshold").length;
    if (powerThreshold < (allPowerThesholds / 2)) {
      animation.speed = 0;
    }
    if (powerThreshold > (allPowerThesholds / 2)) {
      animation.loop = false;
    }
  }, "powerThreshold");
};
