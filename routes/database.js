var mysql = require('mysql');

/* Database connection */
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'P@55word',
	database : 'nodelogin'
});

// Database and table creating if not exist
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    connection.query("CREATE DATABASE IF NOT EXISTS nodelogin", function (err, result) {
      if (err) throw err;
      console.log("Database foundddddddd");
    });

    connection.query('USE nodelogin', function (err) {
        var sql = "CREATE TABLE IF NOT EXISTS accounts (id INT(11) AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) NOT NULL, password varchar(255) NOT NULL, email varchar(100) NOT NULL)";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("accounts Table created");
        });

        var sql = "CREATE TABLE IF NOT EXISTS products (id INT AUTO_INCREMENT PRIMARY KEY, Product_name VARCHAR(255), Price INT, Quantity INT)";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Products Table created");
        });
    });
  });
  module.exports = connection;