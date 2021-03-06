var mysql = require('mysql');
var config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

var sqlConnection = function sqlConnection(sql, values, next) {
  // It means that the values hasnt been passed
  if (arguments.length === 2) {
    next = values;
    values = null;
  }

  const connection = mysql.createConnection(config);

  connection.connect(function (err) {
    if (err !== null) {
      console.log('[MYSQL] Error connecting to mysql:' + err + '\n');

      res.json({
        message: `'[MYSQL] Error connecting to mysql:' ${err + '\n'}`,
      });
    }
    console.log('connected as id ' + connection.threadId);
  });

  connection.query(sql, values, function (err, results) {
    connection.end(); // close the connection

    if (err) {
      throw err;
    }

    // Execute the callback
    next.apply(this, arguments);
  });
};

module.exports = sqlConnection;
