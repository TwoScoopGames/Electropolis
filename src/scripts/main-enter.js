"use strict";

var symbols = ["symbolCircle", "symbolSquare", "symbolStar", "symbolTriangle"];

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function makeTile(game, x, y, row, rowX) {
  var tile = game.instantiatePrefab(randomItem(symbols));
  var position = game.entities.get(tile, "position");
  position.x = x;
  position.y = y;
  game.entities.set(tile, "matchX", {
    "id": row,
    "offset": x - rowX
  });
  return tile;
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
    var tileY = gridPos.y + gridPadding + (y * (tileSize + tilePadding));

    var row = game.instantiatePrefab("row");
    var rowPosition = game.entities.get(row, "position");
    rowPosition.y = tileY - tilePadding;

    for (var x = 0; x < gridWidth; x++) {
      makeTile(game, gridPos.x + gridPadding + (x * (tileSize + tilePadding)), tileY, row, rowPosition.x);
    }
  }
};
