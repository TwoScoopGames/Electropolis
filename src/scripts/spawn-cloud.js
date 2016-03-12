"use strict";
//need to garbage collect clouds that travel off screen.

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars
  if (game.entities.find("cleanUp").length === 0) {
    var initClouds = require("../init-clouds");
    initClouds(game);
  }

  var position = game.entities.get(entity, "position");
  var name = game.entities.get(entity, "name");
  var clouds = ["bg-cloud1", "bg-cloud2", "bg-cloud3"];
  //choose random cloud to spawn
  var cloud1 = game.instantiatePrefab(clouds[Math.floor(Math.random() * clouds.length)]);
  var cloudPosition = game.entities.get(cloud1, "position");
  var cloud1Velocity = game.entities.get(cloud1, "velocity");
  var timers = game.entities.get(entity,"timers");

  if (name === "cloudSpawner1") {
    cloud1Velocity.x = -.0575;
  }

  if (name === "cloudSpawner2") {
    cloud1Velocity.x = -.06;
  }

  if (name === "cloudSpawner3") {
    cloud1Velocity.x = -.09;
  }

  timers.spawnCloud.running = true;

  cloudPosition.x = position.x;
  cloudPosition.y = position.y;

};
