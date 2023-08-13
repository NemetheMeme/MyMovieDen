function renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return`
    <img class= "option-poster" src = "${imgSrc}"/>
    <span class="item-title">
    ${movie.Title}
    (${movie.Year})
    </span>
    `;
    }

//function renderFavorite(movie_id) {
//    axios.get('http://www.omdbapi.com/', {
//        params: {
//            apikey: '44510f6',
//            i: movie_id
//        }
//    }).then(response => {
//        const movieResponseData = response.data;
//        const html = `
//            <div class="article-card">
//                <div class="content">
//                    <p class="date">${movieResponseData.Year}</p>
//                    <p class="title">${movieResponseData.Title}</p>
//                </div>
//                <img src="${movieResponseData.Poster}" alt="article-cover" />
//            </div>
//        `;
//
//        document.querySelector('#movie-template-background').insertAdjacentHTML('beforeend', html);
//    }).catch(error => {
//        console.error(error);
//    });
//}


//        // JavaScript to fetch movie details and update placeholders
//        async function renderFavorite(movie_id) {
//            try {
//                const response = await axios.get('http://www.omdbapi.com/', {
//                    params: {
//                        apikey: '44510f6',
//                        i: movie_id
//                    }
//                });
//
//                const movieResponseData = response.data;
//
//                // Update the placeholders with the retrieved movie details
//                const movieCard = document.querySelector(`[data-movie-id='${movie_id}']`);
//                movieCard.querySelector('.date').textContent = movieResponseData.Year;
//                movieCard.querySelector('.title').textContent = movieResponseData.Title;
//                movieCard.querySelector('img').src = movieResponseData.Poster;
//            } catch (error) {
//                console.error(error);
//            }
//        }




