const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password123',
  database: 'mymoviedendatabase'
});

connection.connect((err) => {
  if (err) console.log(err);
  console.log('Connected to MySQL database!');
});

module.exports = connection;
