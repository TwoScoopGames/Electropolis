"use strict";

var powerLevel = require("../powerLevel");

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
  var currentPowerLevel = powerLevel.get();
  currentPowerLevel--;
  powerLevel.set(currentPowerLevel);
  console.log(currentPowerLevel);

  if (currentPowerLevel <= 0) {
    game.switchScene("title");
    return;
  }

  var timers = game.entities.get(entity, "timers");
  timers.decrement.running = true;
};
