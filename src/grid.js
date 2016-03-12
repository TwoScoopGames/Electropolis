"use strict";

var symbols = ["symbolCircle", "symbolSquare", "symbolStar", "symbolTriangle"];

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

var api = {
  gridWidth: 7,
  gridHeight: 7,
  tileSize: 123,
  tilePadding: 26,
  gridPadding: 32
};

var grid;

function create() {
  grid = [];
  for (var y = 0; y < api.gridHeight; y++) {
    grid.push([]);
    for (var x = 0; x < api.gridWidth; x++) {
      grid[y][x] = randomItem(symbols);
    }
  }
  var m = matches(grid);
  while (m.length > 0) {
    deleteMatches(m);
    m = matches(grid);
  }
}

function deleteMatches(m) {
  for (var i = 0; i < m.length; i++) {
    for (var j = 0; j < m[i].length; j++) {
      var match = m[i][j];
      grid[match.y][match.x] = undefined;
    }
  }
  slideDown();
}

function stealTileFromAbove(x, y) {
  for (var yc = y - 1; yc >= 0; yc--) {
    if (grid[yc][x] !== undefined) {
      var val = grid[yc][x];
      grid[yc][x] = undefined;
      return val;
    }
  }
  return randomItem(symbols);
}

function slideDown() {
  for (var x = 0; x < api.gridWidth; x++) {
    for (var y = api.gridHeight - 1; y >= 0; y--) {
      if (grid[y][x] === undefined) {
        grid[y][x] = stealTileFromAbove(x, y);
      }
    }
  }
}

function get(x, y) {
  return grid[y][x];
}

function createMatchColumn(x, y1, y2, tile) {
  var match = [];
  for (var y = y1; y < y2; y++) {
    match.push({
      x: x,
      y: y,
      tile: tile
    });
  }
  return match;
}

function createMatchRow(x1, x2, y, tile) {
  var match = [];
  for (var x = x1; x < x2; x++) {
    match.push({
      x: x,
      y: y,
      tile: tile
    });
  }
  return match;
}

var requiredMatchLength = 3;

function matches(search) {
  var matches = [];
  var x, y, runStart, runValue;
  for (y = 0; y < api.gridHeight; y++) {
    runStart = 0;
    runValue = search[y][0];
    for (x = 1; x < api.gridWidth; x++) {
      if (x === api.gridWidth - 1 && x - runStart + 1 >= requiredMatchLength) {
        matches.push(createMatchRow(runStart, x + 1, y, runValue));
        continue;
      }
      if (runValue !== undefined && search[y][x] === runValue) {
        continue;
      }
      if (x - runStart >= requiredMatchLength) {
        matches.push(createMatchRow(runStart, x, y, runValue));
      }
      runStart = x;
      runValue = search[y][x];
    }
  }
  for (x = 0; x < api.gridWidth; x++) {
    runStart = 0;
    runValue = search[0][x];
    for (y = 1; y < api.gridHeight; y++) {
      if (y === api.gridHeight - 1 && y - runStart + 1 >= requiredMatchLength) {
        matches.push(createMatchColumn(x, runStart, y + 1, runValue));
        continue;
      }
      if (runValue !== undefined && search[y][x] === runValue) {
        continue;
      }
      if (y - runStart >= requiredMatchLength) {
        matches.push(createMatchColumn(x, runStart, y, runValue));
      }
      runStart = y;
      runValue = search[y][x];
    }
  }
  return matches;
}

function wrapArrayIndex(i, length) {
  if (i < 0) {
    return length + i;
  } else if (i >= length) {
    return i - length;
  } else {
    return i;
  }
}

function rotateColumn(column, rowsMoved) {
  var newGrid = [];

  for (var y = 0; y < api.gridHeight; y++) {
    newGrid.push([]);
    for (var x = 0; x < api.gridWidth; x++) {
      if (x === column) {
        newGrid[y][x] = grid[wrapArrayIndex(y - rowsMoved, api.gridHeight)][x];
      } else {
        newGrid[y][x] = grid[y][x];
      }
    }
  }
  var m = matches(newGrid);
  var ret = m.slice();
  while (m.length > 0) {
    grid = newGrid;
    deleteMatches(m);
    m = matches(grid);
  }
  return ret;
}

function rotateRow(row, columnsMoved) {
  var newGrid = [];

  for (var y = 0; y < api.gridHeight; y++) {
    newGrid.push([]);
    for (var x = 0; x < api.gridWidth; x++) {
      if (y === row) {
        newGrid[y][x] = grid[y][wrapArrayIndex(x - columnsMoved, api.gridWidth)];
      } else {
        newGrid[y][x] = grid[y][x];
      }
    }
  }
  var m = matches(newGrid);
  var ret = m.slice();
  while (m.length > 0) {
    grid = newGrid;
    deleteMatches(m);
    m = matches(grid);
  }
  return ret;
}

function getTileX(game, x) {
  var gridPos = game.entities.get(2, "position");
  return gridPos.x + api.gridPadding + (x * (api.tileSize + api.tilePadding));
}

function getTileY(game, y) {
  var gridPos = game.entities.get(2, "position");
  return gridPos.y + api.gridPadding + (y * (api.tileSize + api.tilePadding));
}

function createEntities(game) {
  var cols = [];
  var rows = [];

  var gridPos = game.entities.get(2, "position");

  var x, y, row, col;
  for (y = 0; y < api.gridHeight; y++) {
    row = game.instantiatePrefab("row");
    game.entities.set(row, "row", y);
    rows.push(row);
    var rowPosition = game.entities.get(row, "position");
    rowPosition.x = gridPos.x + api.gridPadding - (api.tilePadding / 2);
    rowPosition.y = getTileY(game, y) - (api.tilePadding / 2);

    for (x = 0; x < api.gridWidth; x++) {
      if (cols[x] === undefined) {
        cols[x] = game.instantiatePrefab("column");
        game.entities.set(cols[x], "column", x);
      }
      col = cols[x];
      var colPosition = game.entities.get(col, "position");
      colPosition.x = getTileX(game, x) - (api.tilePadding / 2);
      colPosition.y = gridPos.y + api.gridPadding - (api.tilePadding / 2);

      makeTile(game, get(x, y), getTileX(game, x), getTileY(game, y), row, rowPosition.x, col, colPosition.y);
    }
  }
  for (x = 0; x < api.gridWidth; x++) {
    col = cols[x];
    colPosition = game.entities.get(col, "position");
    for (y = -1; y > -1 - api.gridHeight; y--) {
      makeTile(game, get(x, api.gridHeight + y), getTileX(game, x), getTileY(game, y), col, colPosition.x, col, colPosition.y);
      makeTile(game, get(x, -1 - y), getTileX(game, x), getTileY(game, api.gridHeight - 1 - y), col, colPosition.x, col, colPosition.y);
    }
  }
  for (y = 0; y < api.gridHeight; y++) {
    row = rows[y];
    rowPosition = game.entities.get(row, "position");
    for (x = -1; x > -1 - api.gridWidth; x--) {
      makeTile(game, get(api.gridWidth + x, y), getTileX(game, x), getTileY(game, y), row, rowPosition.x, row, rowPosition.y);
      makeTile(game, get(-1 - x, y), getTileX(game, api.gridWidth - 1 - x), getTileY(game, y), row, rowPosition.x, row, rowPosition.y);
    }
  }
}

function makeTile(game, prefab, x, y, row, rowX, column, columnY) {
  if (prefab === undefined) {
    return;
  }
  var tile = game.instantiatePrefab(prefab);
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

function destroyEntities(game) {
  game.entities.find("tile").slice().forEach(function(id) {
    game.entities.destroy(id);
  });
  game.entities.find("row").slice().forEach(function(id) {
    game.entities.destroy(id);
  });
  game.entities.find("column").slice().forEach(function(id) {
    game.entities.destroy(id);
  });
}

api.create = create;
api.createEntities = createEntities;
api.destroyEntities = destroyEntities;
api.get = get;
api.getTileX = getTileX;
api.getTileY = getTileY;
api.matches = matches;
api.rotateColumn = rotateColumn;
api.rotateRow = rotateRow;
module.exports = api;
