module.exports = {
  factory: function() {
    return {
      id: undefined,
      offset: 0
    };
  },
  reset: function(matchX) {
    delete matchX.id;
    matchX.offset = 0;
  }
};
