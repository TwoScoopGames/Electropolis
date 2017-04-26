module.exports = {
  factory: function() {
    return {
      url: undefined
    };
  },
  reset: function(link) {
    delete link.url;
  }
};
