const debounce = (func, delay = 1000) => { 
    let timeoutId;
    return (...args) => {
        if(timeoutId){clearTimeout(timeoutId)};
        timeoutId = setTimeout(()=>{
            func.apply(null,args);
        }, delay)
 };
}; // returnează o funcție cu delay
// Debounce este o tehnică care funcționează prin aplicarea unui delay la execuția unei funcții

const onMovieSelect = async (movie, path) => {
  const response = await axios.get('http://www.omdbapi.com/', {
    params: {
      apikey: '44510f6',
      i: movie.imdbID
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


  // Send movieData to the backend using axios.post
  try {
     // const responseFromBackend = await axios.post('/update_favorite?id=' + movie.id);

    const responseFromBackend = await axios.post(path, movieData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
  // Redirect to /movie_preview with the movieData as query parameters
  window.location.href = path + '?' + new URLSearchParams(movieData);
};


async function refreshMovieTemplate() {
  const movieTitle = document.querySelector('.postcard__title').innerText;
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
    actors: movieResponseData.Actors,
    director: movieResponseData.Director,
    writer: movieResponseData.Writer,
    rated: movieResponseData.Rated,
    language: movieResponseData.Language,
    type: movieResponseData.Type,
  };
  try {

  await axios.post('/update_favorite', movieData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
  // Redirect to /movie_preview with the updated movieData as query parameters
  window.location.href = '/movie_preview?' + new URLSearchParams(movieData);
}

async function fetchData(searchTerm) {
    const response = await axios.get('http://www.omdbapi.com/',  {
        params : {
            apikey: '44510f6',
            s: searchTerm 
        }
    })

    if(response.data.Error){
        return [];
    }
    return response.data.Search;
};





