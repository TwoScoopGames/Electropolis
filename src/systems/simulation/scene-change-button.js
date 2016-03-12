"use strict";

var getMousePos = require("../../get-mouse-pos");

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("scene-change-button-search", ["change-scene", "position", "size"]);
  ecs.addEach(function sceneChangeButton(entity, elapsed) { // eslint-disable-line no-unused-vars

    var position = game.entities.get(entity, "position");
    var size = game.entities.get(entity, "size");
    var mouse = getMousePos(game);
    if (mouse.x < position.x
      || mouse.x > position.x + size.width
      || mouse.y < position.y
      || mouse.y > position.y + size.height
    ) {
      return;
    }

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
