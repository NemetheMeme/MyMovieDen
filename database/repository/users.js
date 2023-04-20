const connection = require('../database_connection');
const table = 'users';
const utils = require('../dbutils');

class UsersRepository{

    async add(user){
        const {username, email, password} = user;
         const randomGeneratedID = utils.randomId();
         const encrypted_password =  await utils.generateEncryptedPassword(password);
         const results = await this.getUserByEmail(email);

            if(results.length === 0 ){
            connection.query(
                `INSERT INTO ${table}  (ID, email, encrypted_password, username) values (?,?,?,?)`, [randomGeneratedID, email,encrypted_password, username]);
               }
                 else{
                    console.log(`User with email ${email} already exists`);
                    
                 }
    }

    async getUserByEmail(email){

      return new Promise((resolve, reject) => {
         connection.query(
           `SELECT * FROM ${table} WHERE email = ?`,
           [email],
           (err, results, fields) => {
             if (err) {
               reject(err);
             } else {
               resolve(results);
             }
           }
         );
       });
    }

    async getUserByID(user_ID){
      return new Promise((resolve, reject) => {
        connection.query(
          `SELECT * FROM ${table} WHERE ID = ?`,
          [user_ID],
          (err, results, fields) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      });
    }
}

//export an instance of the class
module.exports = new UsersRepository();
