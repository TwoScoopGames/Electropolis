"use strict";

var init = function(game) {
  var clouds = ["bg-cloud1", "bg-cloud2", "bg-cloud3"];

  for (var x = 0; x < 6; x++) {
    var cloud1 = game.instantiatePrefab(clouds[Math.floor(Math.random() * clouds.length)]);
    var cloud1Position = game.entities.get(cloud1, "position");
    var cloud1Velocity = game.entities.get(cloud1, "velocity");

    if (x < 2) {
      cloud1Position.x = 500 * (x % 2);
      cloud1Position.y = 0;
      cloud1Velocity.x = -.0575;
    }
    if (x >= 2 && x < 4) {
      cloud1Position.x = 500 * (x % 2);
      cloud1Position.y = 400;
      cloud1Velocity.x = -.06;
    }
    if (x >= 4 && x < 6) {
      cloud1Position.x = 500 * (x % 2);
      cloud1Position.y = 800;
      cloud1Velocity.x = -.09;
    }
  }
};

module.exports = init;
