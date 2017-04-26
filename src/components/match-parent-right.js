module.exports = {
  factory: function() {
    return {
      id: undefined,
      offset: 0
    };
  },
  reset: function(matchParentRight) {
    delete matchParentRight.id;
    matchParentRight.offset = 0;
  }
};
