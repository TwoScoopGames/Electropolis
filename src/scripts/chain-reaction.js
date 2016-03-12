"use strict";

function chainReaction(game, array, start) {
  for (var i = 0; i < array.length; i++) {
    if (i === array.length) {
      return;
    }
    if (i === 0) {
    
      spawnLightning(start.x, start.y, array[i].x, array[i].y, game, 0);
    } else {

      spawnLightning(array[i - 1].x, array[i - 1].y, array[i].x, array[i].y, game, 0);
    }

  }
}

module.exports = function(entity, game) { // eslint-disable-line no-unused-vars

};
