"use strict";

var powerLevel = 100;
module.exports = {
  "get": function() {
    return powerLevel;
  },
  "set": function(number) {
    powerLevel = number;
  }
};
