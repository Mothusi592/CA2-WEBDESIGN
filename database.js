var mysql = require("mysql2");
// Create a connection to the database
var connection = mysql.createConnection({
host: "localhost",
database: "mr_suites_africa",
user: "root",
password: "2v4pvx3o",
connectionLimits: 10
});
// Export the connection so 