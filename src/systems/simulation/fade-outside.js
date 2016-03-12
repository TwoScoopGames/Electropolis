"use strict";

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  game.entities.registerSearch("fade-outside-search", ["fadeOutside", "position", "size", "image"]);
  ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
    var position = game.entities.get(entity, "position");
    var size = game.entities.get(entity, "size");
    var image = game.entities.get(entity, "image");

    var other = game.entities.get(entity, "fadeOutside").id;
    var otherPosition = game.entities.get(other, "position");
    var otherSize = game.entities.get(other, "size");

    var dl = otherPosition.x - position.x;
    var dr = position.x + size.width - otherPosition.x - otherSize.width;
    var dt = otherPosition.y - position.y;
    var db = position.y + size.height - otherPosition.y - otherSize.height;
    if (dl > 0) {
      image.alpha = 1 - Math.min(dl / size.width, 1);
    } else if (dr > 0) {
      image.alpha = 1 - Math.min(dr / size.width, 1);
    } else if (dt > 0) {
      image.alpha = 1 - Math.min(dt / size.height, 1);
    } else if (db > 0) {
      image.alpha = 1 - Math.min(db / size.height, 1);
    } else {
      image.alpha = 1;
    }
  }, "fade-outside-search");
};
