async function onFavoriteMovieSelect(movieTitle){

    const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '44510f6',
      t: movieTitle
    }
  });

const movieResponseData = response.data;
  const movieData = {
    id: movieResponseData.imdbID,
    title: movieResponseData.Title,
    genres: movieResponseData.Genre,
    poster: movieResponseData.Poster,
    runtime: movieResponseData.Runtime,
    plot: movieResponseData.Plot,
    rating: movieResponseData.imdbRating,
    votes: movieResponseData.imdbVotes,
    metascore: movieResponseData.Metascore,
    awards: movieResponseData.Awards,
    year: movieResponseData.Year,
    released: movieResponseData.Released,
    actors : movieResponseData.Actors,
    director : movieResponseData.Director,
    writer :  movieResponseData.Writer,
    rated :  movieResponseData.Rated,
    language : movieResponseData.Language,
    type : movieResponseData.Type,
  };
  
  window.location.href = '/movie_preview?' + new URLSearchParams(movieData);

}

const all_cards = document.querySelectorAll('.article-card');

all_cards.forEach(element => {
    const titleElement = element.querySelector('.favorite-movie-title');
    const title = titleElement.innerText;
    element.addEventListener('click', () => {
        onFavoriteMovieSelect(title);
    });
});

