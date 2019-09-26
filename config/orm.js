const connection = require("./connection.js");
const tableName = "burgers";

const orm = {
  selectAll: function(func) {
    const query = "SELECT * FROM " + tableName;
    connection.query(query, function(err, result) {
      func(result);
    });
  },
  insertOne: function(burger, func) {
    const query = "INSERT INTO " + tableName + " (burger_name, devoured) VALUES (?,?)";
    // default devoured to 0
    burger.devoured = burger.devoured || 0;
    connection.query(query, [
      burger.burger_name, burger.devoured
    ], function(err, result) {
      func(result);
    });
  },
  updateOne: function(burger, func) {
    const query = "UPDATE " + tableName + " SET burger_name=?, devoured=? WHERE id=?";
    connection.query(query, [
      burger.burger_name, burger.devoured, burger.id
    ], function(err, result) {
      func(result);
    });
  }
};

module.exports = orm;