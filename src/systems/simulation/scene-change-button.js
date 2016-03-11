"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("scene-change-button-search", ["change-scene", "position", "size"]);
  ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars

    var timers = game.entities.get(entity, "timers");
    var image = game.entities.get(entity, "image");
    var pressedImage = game.entities.get(entity, "pressed-image");

    if (game.inputs.buttonPressed("action") && !timers.pressed.running) {

      timers.pressed.running = true;
      game.sounds.play("ScoreUp.mp3");
    }

    if (timers.pressed.running) {
      image.name = pressedImage.name;
    }

  }, "scene-change-button-search");
};
