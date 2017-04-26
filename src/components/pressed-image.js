module.exports = {
  factory: function() {
    return {
      name: undefined
    };
  },
  reset: function(pressedImage) {
    delete pressedImage.name;
  }
};
