"use strict";

module.exports = function(game) {
  var camera = game.entities.find("camera")[0];
  var cameraPosition = game.entities.getComponent(camera, "position");

  var mx = game.inputs.mouse.x + cameraPosition.x;
  var my = game.inputs.mouse.y + cameraPosition.y;

  return {
    x: mx,
    y: my
  };
};
