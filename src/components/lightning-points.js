module.exports = {
  factory: function() {
    return {
      points: []
    };
  },
  reset: function(lightning) {
    lightning.points.length = 0;
  }
};
