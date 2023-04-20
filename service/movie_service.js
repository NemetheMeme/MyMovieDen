const movieRepository = require('../database/repository/movies');

class MovieService{
async addMovieRequest(movie_info){
    console.log('new movie request processing...')
    await movieRepository.add(movie_info);
    console.log('new movie added.')
}

}

module.exports = new MovieService();