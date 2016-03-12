"use strict";

var symbols = ["symbolCircle", "symbolSquare", "symbolStar", "symbolTriangle"];

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function makeTile(game, prefabs, x, y, row, rowX, column, columnY) {
  var tile = game.instantiatePrefab(prefabs);
  var position = game.entities.get(tile, "position");
  position.x = x;
  position.y = y;
  if (row) {
    game.entities.set(tile, "matchX", {
      "id": row,
      "offset": x - rowX
    });
  }
  if (column) {
    game.entities.set(tile, "matchY", {
      "id": column,
      "offset": y - columnY
    });
  }
  game.entities.set(tile, "fadeOutside", {
    "id": 2
  });
  return tile;
}

var gridWidth = 7;
var gridHeight = 7;
var tileSize = 123;
var tilePadding = 26;
var gridPadding = 32;

var grid = [];
for (var y = 0; y < gridHeight; y++) {
  grid.push([]);
  for (var x = 0; x < gridWidth; x++) {
    grid[y][x] = randomItem(symbols);
  }
}

module.exports = function(game) { // eslint-disable-line no-unused-vars
  game.scaleCanvasToFitRectangle(1080, 1920);
  game.sounds.play("ThunderLoop.mp3", true);

  var cols = [];
  var rows = [];

  var gridPos = game.entities.get(2, "position");
  var getTileY = function(y) {
    return gridPos.y + gridPadding + (y * (tileSize + tilePadding));
  };
  var getTileX = function(x) {
    return gridPos.x + gridPadding + (x * (tileSize + tilePadding));
  };

  var x, y, row, col;
  for (y = 0; y < gridHeight; y++) {
    row = game.instantiatePrefab("row");
    rows.push(row);
    var rowPosition = game.entities.get(row, "position");
    rowPosition.x = gridPos.x + gridPadding - (tilePadding / 2);
    rowPosition.y = getTileY(y) - (tilePadding / 2);

    for (x = 0; x < gridWidth; x++) {
      if (cols[x] === undefined) {
        cols[x] = game.instantiatePrefab("column");
      }
      col = cols[x];
      var colPosition = game.entities.get(col, "position");
      colPosition.x = getTileX(x) - (tilePadding / 2);
      colPosition.y = gridPos.y + gridPadding - (tilePadding / 2);

      makeTile(game, grid[y][x], getTileX(x), getTileY(y), row, rowPosition.x, col, colPosition.y);
    }
  }
  for (x = 0; x < gridWidth; x++) {
    col = cols[x];
    colPosition = game.entities.get(col, "position");
    for (y = -1; y > -1 - gridHeight; y--) {
      makeTile(game, grid[gridHeight + y][x], getTileX(x), getTileY(y), col, colPosition.x, col, colPosition.y);
      makeTile(game, grid[-1 - y][x], getTileX(x), getTileY(gridHeight - 1 - y), col, colPosition.x, col, colPosition.y);
    }
  }
  for (y = 0; y < gridHeight; y++) {
    row = rows[y];
    rowPosition = game.entities.get(row, "position");
    for (x = -1; x > -1 - gridWidth; x--) {
      makeTile(game, grid[y][gridWidth + x], getTileX(x), getTileY(y), row, rowPosition.x, row, rowPosition.y);
      makeTile(game, grid[y][-1 - x], getTileX(gridWidth - 1 - x), getTileY(y), row, rowPosition.x, row, rowPosition.y);
    }
  }
};
