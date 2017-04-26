module.exports = {
  factory: function() {
    return {
      startX: 0,
      startY: 0,
      offsetX: undefined,
      offsetY: undefined
    };
  },
  reset: function(dragY) {
    dragY.startX = 0;
    dragY.startY = 0;
    delete dragY.offsetX;
    delete dragY.offsetY;
  }
};
