"use strict";

var powerLevel = 40;
module.exports = {
  "get": function() {
    return powerLevel;
  },
  "set": function(number) {
    powerLevel = number;
  }
};
