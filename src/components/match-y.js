module.exports = {
  factory: function() {
    return {
      id: undefined,
      offset: 0
    };
  },
  reset: function(matchY) {
    delete matchY.id;
    matchY.offset = 0;
  }
};
