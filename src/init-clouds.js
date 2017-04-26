"use strict";

var init = function(game) {
  var camera = game.entities.getComponent(0, "position");
  var clouds = ["bg-cloud1", "bg-cloud2", "bg-cloud3"];

  for (var i = 0; i < 12; i++) {
    var cloud1 = game.prefabs.instantiate(game.entities, clouds[Math.floor(Math.random() * clouds.length)]);
    var cloud1Position = game.entities.getComponent(cloud1, "position");
    var cloud1Velocity = game.entities.getComponent(cloud1, "velocity");

    if (i < 4) {
      cloud1Position.x = (camera.x + (600 * (i % 4)));
      cloud1Position.y = 0;
      cloud1Velocity.x = -.0575;
    }
    if (i >= 4 && i < 8) {
      cloud1Position.x = (camera.x + (600 * (i % 4)));
      cloud1Position.y = 400;
      cloud1Velocity.x = -.06;
    }
    if (i >= 8 && i < 12) {
      cloud1Position.x = (camera.x + (600 * (i % 4)));
      cloud1Position.y = 800;
      cloud1Velocity.x = -.09;
    }
  }
};

module.exports = init;
