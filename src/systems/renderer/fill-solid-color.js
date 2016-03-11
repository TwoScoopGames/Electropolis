
"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("fill-solid-color", ["fillColor", "position", "size"]);

  ecs.add(function fillSolidColor(entities) {
    var ids = entities.find("fill-solid-color");
    ids.sort(function(a, b) {
      var pa = entities.get(a, "position");
      var pb = entities.get(b, "position");
      var za = pa.z || 0;
      var zb = pb.z || 0;
      var ya = pa.y || 0;
      var yb = pb.y || 0;
      return za - zb || ya - yb;
    });

    for (var i = 0; i < ids.length; i++) {
      var entity = ids[i];
      var position = game.entities.get(entity, "position");
      var size = game.entities.get(entity, "size");
      var fillColor = game.entities.get(entity, "fillColor");
      game.context.fillStyle = fillColor;
      game.context.fillRect(position.x, position.y, size.width, size.height);
    }
  });
};
