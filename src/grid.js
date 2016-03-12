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
  var m = matches();
  for (var i = 0; i < m.length; i++) {
    for (var j = 0; j < m[i].length; j++) {
      var match = m[i][j];
      grid[match.y][match.x] = undefined;
    }
  }
}

function get(x, y) {
  return grid[y][x];
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

function matches() {
  var matches = [];
  for (var y = 0; y < grid.length; y++) {
    var runStart = 0;
    var runValue = grid[y][0];
    for (var x = 1; x < grid[y].length; x++) {
      if (grid[y][x] === runValue) {
        continue;
      }
      if (x - runStart >= requiredMatchLength) {
        matches.push(createMatchRow(runStart, x, y, runValue));
      }
      runStart = x;
      runValue = grid[y][x];
    }
  }
  return matches;
}

api.create = create;
api.get = get;
api.matches = matches;
module.exports = api;
