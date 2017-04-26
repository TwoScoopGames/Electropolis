module.exports = {
  factory: function() {
    return {
      first: undefined,
      second: undefined,
      third: undefined
    };
  },
  reset: function(swapImageOnPowerThreshold) {
    delete swapImageOnPowerThreshold.first;
    delete swapImageOnPowerThreshold.second;
    delete swapImageOnPowerThreshold.third;
  }
};
