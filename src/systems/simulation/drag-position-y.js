"use strict";

var grid = require("../../grid");
var getMousePos = require("../../get-mouse-pos");

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("drag-position-y", ["dragY", "position", "size"]);
  ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
    if (game.entities.find("intro").length > 0 || game.entities.find("outro").length > 0) {
      return;
    }

    var position = game.entities.get(entity, "position");
    var size = game.entities.get(entity, "size");
    var mouse = getMousePos(game);
    var drag = game.entities.get(entity, "dragY");

    var inside = mouse.x >= position.x
        && mouse.x < position.x + size.width
        && mouse.y >= position.y
        && mouse.y < position.y + size.height;

    // FIXME: this is bullshit
    var gridPosition = game.entities.get(2, "position");
    var gridSize = game.entities.get(2, "size");
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
        var column = game.entities.get(entity, "column");
        console.log("column", column, "moved", tilesMoved);
        grid.rotateColumn(column, tilesMoved);
        grid.destroyEntities(game);
        grid.createEntities(game);
      }

      // position.x = drag.startX;
      // position.y = drag.startY;
      // delete drag.offsetX;
      // delete drag.offsetY;
    }
  }, "drag-position-y");
};
