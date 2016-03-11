"use strict";

function makeTile(game, x, y) {
  var tile = game.instantiatePrefab("symbolCircle");
  var position = game.entities.get(tile, "position");
  position.x = x;
  position.y = y;
}

var gridWidth = 7;
var gridHeight = 7;
var tileSize = 123;
var tilePadding = 26;
var gridPadding = 32;

module.exports = function(game) { // eslint-disable-line no-unused-vars
  game.scaleCanvasToFitRectangle(1080, 1920);
  game.sounds.play("ThunderLoop.mp3", true);

  var gridPos = game.entities.get(2, "position");
  for (var y = 0; y < gridHeight; y++) {
    for (var x = 0; x < gridWidth; x++) {
      makeTile(game, gridPos.x + gridPadding + (x * (tileSize + tilePadding)), gridPos.y + gridPadding + (y * (tileSize + tilePadding)));
    }
  }
};
