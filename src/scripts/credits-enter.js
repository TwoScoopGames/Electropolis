"use strict";
module.exports = function(game) { // eslint-disable-line no-unused-vars
  game.scaleCanvasToFitRectangle(1080, 1920);
  var initClouds = require("../init-clouds");
  initClouds(game);
};
