module.exports = {
  factory: function() {
    return {
      startX: 0,
      startY: 0,
      offsetX: undefined,
      offsetY: undefined
    };
  },
  reset: function(dragX) {
    dragX.startX = 0;
    dragX.startY = 0;
    delete dragX.offsetX;
    delete dragX.offsetY;
  }
};
