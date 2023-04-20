const connection = require('../database_connection');
const table = 'movies';
const utils = require('../dbutils');

class MoviesRepository{
    async add(movie){
        const {name, IDBM_ID} = movie;
         const randomGeneratedID = utils.randomId();
         const results = await this.getMovieByName(name);

            if(results.length === 0 ){
            connection.query(
                `INSERT INTO ${table}  (ID, name, IDBM_ID) values (?,?,?)`, [randomGeneratedID, name, IDBM_ID]);
               }
                 else{
                    console.log(`Movie with name ${name} already exists`);
                    
                 }
    }

    async getMovieByName(name){

      return new Promise((resolve, reject) => {
         connection.query(
           `SELECT * FROM ${table} WHERE name = ?`,
           [name],
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

    async getMovieByID(movie_ID){
       
        return new Promise((resolve, reject) => {
          connection.query(
            `SELECT * FROM ${table} WHERE ID = ?`,
            [movie_ID],
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

    async getAllMovies(movieIDs){
        return new Promise((resolve, reject) => {
            connection.query(
              `SELECT * FROM ${table} WHERE ID IN (?)`,
              [movieIDs],
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

module.exports = new MoviesRepository();