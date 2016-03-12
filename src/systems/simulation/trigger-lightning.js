"use strict";

var getMousePos = require("../../get-mouse-pos");
<<<<<<< HEAD
//var screenShake = require("../../screen-shake");

var midpoint = function(p1, p2) {
  var x = ((p2.x - p1.x) / 2) + p1.x;
  var y = ((p2.y - p1.y) / 2) + p1.y;
  return { "x": x, "y": y };
};

var offset = function(point1, point2, range) {
  var angle = Math.atan2(point2.y - point1.y, point2.x - point1.x) + (Math.PI / 2);
  var radius = -(range / 2) + Math.random() * range;

  var x = point1.x + radius * Math.cos(angle);
  var y = point1.y + radius * Math.sin(angle);

  return { "x": x, "y": y };
};

var distance = function(start, end) {
  return Math.sqrt(Math.pow((end.x - start.x), 2) + Math.pow((end.y - start.y),2));
};

var getLightningPoints = function(start, end) {
  if (distance(start,end) < 30) {
    return [start, end];
  }

  var m = offset(midpoint(start, end), end, 40);
  var l1 = getLightningPoints(start, m);
  var l2 = getLightningPoints(m, end);
  return l1.concat(l2);
};

function spawnLightning(x1, y1, x2, y2, game, forkChance) {
  var points = getLightningPoints({ "x": x1, "y": y1 }, { "x": x2, "y": y2 });

  var entity = game.entities.create();
  game.entities.set(entity, "lightning", {
    "points": points
  });

  if (Math.random() < forkChance) {
    var forkStart = points[Math.floor(Math.random() * points.length)];
    var forkEnd = offset(points[points.length - 1], points[0], 180);
    spawnLightning(forkStart.x, forkStart.y, forkEnd.x, forkEnd.y, game, forkChance);
  }
}
=======
var spawnLightning = require("../../spawn-lightning");
>>>>>>> c2a950de0895708badc29712ff9defcb8fd2f846

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

var lightningSounds = [
  "lightning1.wav",
  "lightning2.wav",
  "lightning3.wav",
  "lightning4.wav",
  "lightning5.wav",
  "lightning6.wav",
  "lightning7.wav",
  "lightning8.wav",
  "lightning9.wav",
  "lightning10.wav"
];

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function triggerLightning(entity, elapsed) { // eslint-disable-line no-unused-vars
    var input = game.entities.get(entity, "triggerLightning").input;
    if (game.inputs.buttonPressed(input)) {
      game.sounds.play(randomFrom(lightningSounds));
      var mouse = getMousePos(game);
      //screenShake(game, 10);
      spawnLightning(0, 0, mouse.x, mouse.y, game, 0.7);
      spawnLightning(1080, 0, mouse.x, mouse.y, game, 0.7);
      spawnLightning(0, 1080, mouse.x, mouse.y, game, 0.7);
      spawnLightning(1080, 1080, mouse.x, mouse.y, game, 0.7);


    }
  }, "triggerLightning");
};
