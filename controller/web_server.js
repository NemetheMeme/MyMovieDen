const express = require('express');
const router = express.Router();
const app = express();
const db = require('../database/database_connection.js');

// router.get('/users', (req, res) => {
//   const sql = 'SELECT * FROM users';

//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// });

module.exports = router;
console.log('listening...');
