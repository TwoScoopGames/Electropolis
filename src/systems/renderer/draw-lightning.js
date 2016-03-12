"use strict";
var drawLine = function(start, end, width, style, context) {
  //try to draw the whole line
  context.strokeStyle = style;
  context.lineWidth = width;
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();
};

var drawLines = function(points, width, style, context) {
  for (var x = 0; x < points.length - 1; x++) {
    drawLine(points[x], points[x + 1], width, style, context);
  }
};

var whiteFlashTime = 50;
var colorFadeTime = 150;
var whiteFadeTime = 700;

var drawLightning = function(points, context, elapsed) {

  if (elapsed < whiteFlashTime) {
    drawLines(points, 5, "rgba(255,255,255,1)", context);
  } else if (elapsed < whiteFlashTime + whiteFadeTime) {

    var opacity = Math.min(1 - ((elapsed - whiteFlashTime) / colorFadeTime), 1);
    var opacity2 = Math.min(1 - ((elapsed - whiteFlashTime) / whiteFadeTime), 1);
    drawLines(points, 5, "rgba(0,255,0," + opacity + ")", context);
    drawLines(points, 1, "rgba(255,255,255," + opacity2 + ")", context);

  }
};

module.exports = function(ecs, game) { // eslint-disable-line no-unused-vars
  ecs.addEach(function(entity, context, elapsed) { // eslint-disable-line no-unused-vars
    var lightning = game.entities.get(entity, "lightning");
    if (lightning.elapsed > whiteFadeTime) {
      game.entities.remove(entity);
    } else {
      if (lightning.elapsed === undefined) {
        lightning.elapsed = 0;
      } else {
        lightning.elapsed += elapsed;
      }

      for (var x = 0; x < lightning.points.length; x++) {
        drawLightning(lightning.points[x], context, lightning.elapsed);
      }
    }

  }, "lightning");
};
