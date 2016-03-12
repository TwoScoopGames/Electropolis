"use strict";

var powerLevel = require("../powerLevel");

function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
  //var currentPowerLevel = powerLevel.get();
  // if (currentPowerLevel <= 0) {
  //   powerLevel.set(currentPowerLevel + 1);
  // }
  // if (currentPowerLevel >= 0) {
  //   powerLevel.set(currentPowerLevel - 1);
  // }
  powerLevel.set(randomInRange(0,100));
  var timers = game.entities.get(entity, "timers");
  timers.temp.running = true;
  //console.log(currentPowerLevel);

};
