"use strict";

var powerLevel = require("../../powerLevel");

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
    var powerThreshold = game.entities.get(entity, "powerThreshold");
    var animation = game.entities.get(entity, "animation");
    animation.loop = false;
    if (powerThreshold > powerLevel.get()) {
      console.log("drop");
      animation.frame = 0;
      //animation.speed = 0;
    } else {
      animation.speed = 1;
    }

  }, "powerThreshold");
};
