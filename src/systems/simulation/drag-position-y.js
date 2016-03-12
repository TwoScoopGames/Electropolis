"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("drag-position-y", ["dragY", "position", "size"]);
  ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
    if (game.entities.find("intro").length > 0 || game.entities.find("outro").length > 0) {
      return;
    }

    var camera = game.entities.find("camera")[0];
    var cameraPosition = game.entities.get(camera, "position");

    var position = game.entities.get(entity, "position");
    var size = game.entities.get(entity, "size");
    var mx = game.inputs.mouse.x + cameraPosition.x;
    var my = game.inputs.mouse.y + cameraPosition.y;
    var drag = game.entities.get(entity, "dragY");

    var inside = mx >= position.x
        && mx < position.x + size.width
        && my >= position.y
        && my < position.y + size.height;

    // FIXME: this is bullshit
    var gridPosition = game.entities.get(2, "position");
    var gridSize = game.entities.get(2, "size");
    var insideGrid = mx >= gridPosition.x
      && mx < gridPosition.x + gridSize.width
      && my >= gridPosition.y
      && my < gridPosition.y + gridSize.height;

    if (game.inputs.buttonPressed("action") && inside) {
      drag.startX = position.x;
      drag.startY = position.y;
      drag.offsetX = position.x - mx;
      drag.offsetY = position.y - my;
    } else if (game.inputs.button("action") && drag.offsetX !== undefined && drag.offsetY !== undefined && insideGrid) {
      var dx = Math.abs(mx + drag.offsetX - drag.startX);
      var dy = Math.abs(my + drag.offsetY - drag.startY);
      if (dx > dy && dy > 30) {
        position.x = drag.startX;
        position.y = drag.startY;
        delete drag.offsetX;
        delete drag.offsetY;
      } else {
        // position.x = mx + drag.offsetX;
        position.y = my + drag.offsetY;
      }
    } else if (game.inputs.buttonReleased("action") && drag.offsetX !== undefined && drag.offsetY !== undefined) {
      position.x = drag.startX;
      position.y = drag.startY;
      delete drag.offsetX;
      delete drag.offsetY;
    }
  }, "drag-position-y");
};
