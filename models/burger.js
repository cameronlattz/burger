const orm = require("../config/orm.js");

const burger = {
  all: function(func) {
    orm.selectAll(func);
  },
  create: function(burger, func) {
    orm.insertOne(burger, func);
  },
  update: function(burger, func) {
    orm.updateOne(burger, func);
  }
};

module.exports = burger;