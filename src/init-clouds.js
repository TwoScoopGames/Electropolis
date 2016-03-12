"use strict";

var init = function(game) {
  var camera = game.entities.get(0, "position");
  var clouds = ["bg-cloud1", "bg-cloud2", "bg-cloud3"];

  for (var i = 0; i < 9; i++) {
    var cloud1 = game.instantiatePrefab(clouds[Math.floor(Math.random() * clouds.length)]);
    var cloud1Position = game.entities.get(cloud1, "position");
    var cloud1Velocity = game.entities.get(cloud1, "velocity");

    if (i < 3) {
    	console.log(i, i % 3, (camera.x + (500 * (i % 3))));
      cloud1Position.x = (camera.x + (600 * (i % 3)));
      cloud1Position.y = 0;
      cloud1Velocity.x = -.0575;
    }
    if (i >= 3 && i < 6) {
      cloud1Position.x = (camera.x + (600 * (i % 3)));
      cloud1Position.y = 400;
      cloud1Velocity.x = -.06;
    }
    if (i >= 6 && i < 9) {
      cloud1Position.x = (camera.x + (600 * (i % 3)));
      cloud1Position.y = 800;
      cloud1Velocity.x = -.09;
    }
  }
};

module.exports = init;
