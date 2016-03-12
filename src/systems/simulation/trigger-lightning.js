"use strict";

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


module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function(entity, elapsed) { // eslint-disable-line no-unused-vars
    var input = game.entities.get(entity, "triggerLightning").input;
    console.log(input);
    if (game.inputs.buttonPressed(input)) {
      //var points = getLightningPoints({ "x": Math.random() * 1080, "y": Math.random() * 1080 },{ "x": Math.random() * 1080, "y": Math.random() * 1080 });
      var initial = getLightningPoints({ "x": 100, "y": 100 }, { "x": 100, "y": 400 });
      var forkStart = initial[Math.floor(Math.random() * initial.length)];
      var forkEnd = offset(initial[initial.length - 1], initial[0], 180);
      var forkpoints = getLightningPoints({ "x": forkStart.x, "y": forkStart.y }, { "x": forkEnd.x, "y": forkEnd.y });
      var points = [initial, forkpoints];

      var lightningEntity = game.entities.create();
      game.entities.set(lightningEntity, "lightning", {
        "points": points
      });
    }
  }, "triggerLightning");
};
