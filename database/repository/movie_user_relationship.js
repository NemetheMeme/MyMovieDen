const connection = require('../database_connection');
const mur_table = 'movie_user_relationship';
const usersRepository = require('./users');
const moviesRepository = require('./movies');

class MovieUserRelationship{

    async add(movie,user){
        const movie_ID = movie.ID;
        const user_ID = user.ID;
        
        const relation_already_existent = exists(movie_ID, user_ID);

            if(!relation_already_existent){
            connection.query(
                `INSERT INTO ${mur_table}  (movie_ID, user_ID) values (?,?)`, [movie_ID, user_ID]);
               }
                 else{
                    console.log(`User with ID ${user_ID} already has movie with ID ${movie_ID} `);
                    
                 }
    }

    async addTest(request){

     const movie =  await moviesRepository.getMovieByName(request.name);
     const user =  await usersRepository.getUserByEmail(request.email);
 
     if(movie[0] === undefined || user[0] === undefined){
      console.log(`movie{${movie}} or user{${user}} does not exists`);
      return;
    }
     const movie_ID= movie[0].ID;
     const user_ID = user[0].ID;


      const relation_already_existent = await  this.exists(movie_ID, user_ID);

          if(relation_already_existent === false){
          connection.query(
              `INSERT INTO ${mur_table}  (movie_ID, user_ID) values (?,?)`, [movie_ID, user_ID]);

             }
               else{
                  console.log(`User with ID ${user_ID} already has movie with ID ${movie_ID} `);

               }
  }

    async exists(movie_ID, user_ID){ 

        return new Promise((resolve, reject) => {
         connection.query(
           `SELECT * FROM ${mur_table} WHERE movie_ID = ?  AND user_ID = ?`,
           [movie_ID, user_ID],
           (err, results, fields) => {
             if (err) {
               reject(err);
             } else {
               resolve(results.length > 0);
             }
           }
         );
       });

    }

    async getAllMoviesOfUser(user_ID){ // return list of movie Ids
        return new Promise((resolve, reject) => {
            connection.query(
              `SELECT movie_ID FROM ${mur_table} WHERE  user_ID = ?`,
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

module.exports = new MovieUserRelationship();