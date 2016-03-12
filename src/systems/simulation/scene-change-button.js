"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("scene-change-button-search", ["change-scene", "position", "size"]);
  ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars

    if (game.inputs.button("action")) {
      var image = game.entities.get(entity, "image");
      var pressedImage = game.entities.get(entity, "pressed-image");
      image.name = pressedImage.name;
    }

    if (game.inputs.buttonReleased("action")) {
      var scene = game.entities.get(entity, "change-scene");
      game.switchScene(scene);
      game.sounds.play("ScoreUp.mp3");
    }

  }, "scene-change-button-search");
};
