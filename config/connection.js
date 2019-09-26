const mysql = require("mysql");
let localhost = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "burgers_db"
};
const connection = mysql.createConnection(process.env.JAWSDB_URL || localhost);

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;