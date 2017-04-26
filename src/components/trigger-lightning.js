module.exports = {
  factory: function() {
    return {
      input: "action"
    };
  },
  reset: function(triggerLightning) {
    triggerLightning.input = "action";
  }
};
