"use strict";

var getMousePos = require("../../get-mouse-pos");
var spawnLightning = require("../../spawn-lightning");

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

var lightningSounds = [
  "lightning1.wav",
  "lightning2.wav",
  "lightning3.wav",
  "lightning4.wav",
  "lightning5.wav",
  "lightning6.wav",
  "lightning7.wav",
  "lightning8.wav",
  "lightning9.wav",
  "lightning10.wav"
];

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function triggerLightning(entity, elapsed) { // eslint-disable-line no-unused-vars
    var input = game.entities.get(entity, "triggerLightning").input;
    if (game.inputs.buttonPressed(input)) {
      game.sounds.play(randomFrom(lightningSounds));
      var mouse = getMousePos(game);
      spawnLightning(0, 0, mouse.x, mouse.y, game, 0.7);
      spawnLightning(1080, 0, mouse.x, mouse.y, game, 0.7);
      spawnLightning(0, 1080, mouse.x, mouse.y, game, 0.7);
      spawnLightning(1080, 1080, mouse.x, mouse.y, game, 0.7);
    }
  }, "triggerLightning");
};
