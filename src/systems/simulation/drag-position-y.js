"use strict";

var grid = require("../../grid");
var getMousePos = require("../../get-mouse-pos");
var spawnLightning = require("../../spawn-lightning");
var powerLevel = require("../../powerLevel");

function zapMatches(game, matches) {
  for (var i = 0; i < matches.length; i++) {
    var x1 = grid.getTileX(game, matches[i][0].x) + grid.tileSize / 2;
    var y1 = grid.getTileY(game, matches[i][0].y) + grid.tileSize / 2;
    var x2 = grid.getTileX(game, matches[i][matches[i].length - 1].x) + grid.tileSize / 2;
    var y2 = grid.getTileY(game, matches[i][matches[i].length - 1].y) + grid.tileSize / 2;
    spawnLightning(x1, y1, x2, y2, game, 0);

    var pl = powerLevel.get();
    pl += matches[i].length * 2;
    powerLevel.set(pl);

    var powerLines = game.prefabs.instantiate(game.entities, "powerLines");
    var points = game.entities.getComponent(powerLines, "lightningPoints").points;
    points.unshift({ "x": x1, "y": y1 });
  }
}

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("drag-position-y", ["dragY", "position", "size"]);
  ecs.addEach(function dragPositionY(entity, elapsed) { // eslint-disable-line no-unused-vars
    if (game.entities.find("intro").length > 0 || game.entities.find("outro").length > 0) {
      return;
    }

    var position = game.entities.getComponent(entity, "position");
    var size = game.entities.getComponent(entity, "size");
    var mouse = getMousePos(game);
    var drag = game.entities.getComponent(entity, "dragY");

    var inside = mouse.x >= position.x
        && mouse.x < position.x + size.width
        && mouse.y >= position.y
        && mouse.y < position.y + size.height;

    // FIXME: this is bullshit
    var gridPosition = game.entities.getComponent(2, "position");
    var gridSize = game.entities.getComponent(2, "size");
    var insideGrid = mouse.x >= gridPosition.x
      && mouse.x < gridPosition.x + gridSize.width
      && mouse.y >= gridPosition.y
      && mouse.y < gridPosition.y + gridSize.height;

    if (game.inputs.buttonPressed("action") && inside) {
      drag.startX = position.x;
      drag.startY = position.y;
      drag.offsetX = position.x - mouse.x;
      drag.offsetY = position.y - mouse.y;
    } else if (game.inputs.button("action") && drag.offsetX !== undefined && drag.offsetY !== undefined && insideGrid) {
      var dx = Math.abs(mouse.x + drag.offsetX - drag.startX);
      var dy = Math.abs(mouse.y + drag.offsetY - drag.startY);
      if (dx > dy && dy > 30) {
        position.x = drag.startX;
        position.y = drag.startY;
        delete drag.offsetX;
        delete drag.offsetY;
      } else {
        // position.x = mouse.x + drag.offsetX;
        position.y = mouse.y + drag.offsetY;
      }
    } else if (game.inputs.buttonReleased("action") && drag.offsetX !== undefined && drag.offsetY !== undefined) {
      var tilesMoved = Math.round((position.y - drag.startY) / (grid.tileSize + grid.tilePadding));
      if (Math.abs(tilesMoved) !== 0) {
        var column = game.entities.getComponent(entity, "column");
        console.log("column", column, "moved", tilesMoved);
        var matches = grid.rotateColumn(column, tilesMoved);
        if (matches.length > 0) {
          grid.destroyEntities(game);
          grid.createEntities(game);
          zapMatches(game, matches);
          return;
        }
      }

      position.x = drag.startX;
      position.y = drag.startY;
      delete drag.offsetX;
      delete drag.offsetY;
    }
  }, "drag-position-y");
};
