const express = require('express');
const router = express.Router();
const app = express();
const db = require('../database/database_connection.js');


// db.query('SELECT * FROM users', (err,result)=>{
// console.log(JSON.stringify(result));
// });
app.post('', (req,res) =>{

});

module.exports = router;
console.log('listening...');
