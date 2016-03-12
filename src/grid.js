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
}

function get(x, y) {
  return grid[y][x];
}

api.create = create;
api.get = get;
module.exports = api;
