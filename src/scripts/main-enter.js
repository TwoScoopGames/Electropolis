"use strict";

function shuffle(o) {
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
}

function generatePowerThresholds(game) {
  var entitiesWithPowerThreshold = shuffle(game.entities.find("powerThreshold"));

  var step = 100 / entitiesWithPowerThreshold.length;
  var powerLevel = step;
  for (var i = 0; i < entitiesWithPowerThreshold.length; i++) {
    game.entities.set(entitiesWithPowerThreshold[i], "powerThreshold", powerLevel);
    powerLevel += step;
  }
}

var grid = require("../grid");
grid.create();

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

module.exports = function(game) { // eslint-disable-line no-unused-vars
  game.scaleCanvasToFitRectangle(1080, 1920);
  game.sounds.play("ThunderLoop.mp3", true);

  generatePowerThresholds(game);

  var cols = [];
  var rows = [];

  var gridPos = game.entities.get(2, "position");
  var getTileY = function(y) {
    return gridPos.y + grid.gridPadding + (y * (grid.tileSize + grid.tilePadding));
  };
  var getTileX = function(x) {
    return gridPos.x + grid.gridPadding + (x * (grid.tileSize + grid.tilePadding));
  };

  var x, y, row, col;
  for (y = 0; y < grid.gridHeight; y++) {
    row = game.instantiatePrefab("row");
    rows.push(row);
    var rowPosition = game.entities.get(row, "position");
    rowPosition.x = gridPos.x + grid.gridPadding - (grid.tilePadding / 2);
    rowPosition.y = getTileY(y) - (grid.tilePadding / 2);

    for (x = 0; x < grid.gridWidth; x++) {
      if (cols[x] === undefined) {
        cols[x] = game.instantiatePrefab("column");
      }
      col = cols[x];
      var colPosition = game.entities.get(col, "position");
      colPosition.x = getTileX(x) - (grid.tilePadding / 2);
      colPosition.y = gridPos.y + grid.gridPadding - (grid.tilePadding / 2);

      makeTile(game, grid.get(x, y), getTileX(x), getTileY(y), row, rowPosition.x, col, colPosition.y);
    }
  }
  for (x = 0; x < grid.gridWidth; x++) {
    col = cols[x];
    colPosition = game.entities.get(col, "position");
    for (y = -1; y > -1 - grid.gridHeight; y--) {
      makeTile(game, grid.get(x, grid.gridHeight + y), getTileX(x), getTileY(y), col, colPosition.x, col, colPosition.y);
      makeTile(game, grid.get(x, -1 - y), getTileX(x), getTileY(grid.gridHeight - 1 - y), col, colPosition.x, col, colPosition.y);
    }
  }
  for (y = 0; y < grid.gridHeight; y++) {
    row = rows[y];
    rowPosition = game.entities.get(row, "position");
    for (x = -1; x > -1 - grid.gridWidth; x--) {
      makeTile(game, grid.get(grid.gridWidth + x, y), getTileX(x), getTileY(y), row, rowPosition.x, row, rowPosition.y);
      makeTile(game, grid.get(-1 - x, y), getTileX(grid.gridWidth - 1 - x), getTileY(y), row, rowPosition.x, row, rowPosition.y);
    }
  }
};
