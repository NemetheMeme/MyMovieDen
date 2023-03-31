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
const onMovieSelect = async (movie, summaryElement) => {
 
       const response = await axios.get('http://www.omdbapi.com/', 
 {
    params: {
        apikey: '44510f6',
        i: movie.imdbID
    }
 });
        summaryElement.innerHTML = movieTemplate(response.data);
};

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

const movieTemplate = (movieDetail)=>{
    console.log(movieDetail);
    return `

        <div id="poster-wrapper">
        <img id="poster-wrapper-image" src="${movieDetail.Poster}">
       ${renderGenres(movieDetail.Genre)}
        </div>

        <div id ="about-wrapper">
        <p class ="movie-title">${movieDetail.Title}</p>
        <div class="label">${movieDetail.Released} | ${movieDetail.Runtime}<img class="item-poster" src = "pictures/time2.png"></div>
        <p>${movieDetail.Plot}</p>
        <div class ="rating-wrapper"><span class="rating"><b>${movieDetail.imdbRating}</b></span>/10  with ${movieDetail.imdbVotes} Votes</div>
        ${renderMetascore(movieDetail.Metascore)}
        ${renderAwards(movieDetail.Awards)}
        </div>
            `;
};

function renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return`
    <img class= "item-poster" src = "${imgSrc}"/>
    <span class="item-title">
    ${movie.Title}
    (${movie.Year})
    </span>
    `;
}

const renderGenres = (genres)=>{
const allGenres = genres.split(',');
let genreWrapper = document.createElement('div');
for(let i = 0; i < allGenres.length; i++){
    let element = document.createElement('span');
    element.classList.add('genre');
    element.innerHTML = allGenres[i];
    genreWrapper.appendChild(element);
}

return `<div class = "genre-wrapper">${genreWrapper.innerHTML}</div>`;
};

const renderAwards = (awards) =>{

    return `
    <div class="awards-wrapper">
    <div class="awards-figure"></div>
        <div class="awards-text-wrapper">
        <span class="awards-title">Awards</span>
        <span class="awards">${awards}</span>
        </div>
    </div>
    `;
};

const renderMetascore = (metascore)=>{
    let wrapperBorderColor;
    let wrapper = document.createElement('div');
    wrapper.classList.add('metascore-wrapper');

    let metascoreNumberWrapper = document.createElement('span');
    metascoreNumberWrapper.classList.add('metascore');
    metascoreNumberWrapper.innerText = `${metascore}`;

    let metascoreTextWrapper = document.createElement('span');
    metascoreTextWrapper.classList.add('metascore-text');
    metascoreTextWrapper.innerText = 'Metascore';


    let color;
    const metascore_parsed = parseInt(metascore);

        if (metascore_parsed < 50){
                color = 'rgb(255,0,0)';
                wrapperBorderColor = 'metascore-border-red';
                metascoreNumberWrapper.style.backgroundColor = color;
            }
        
        
            else if(metascore_parsed >=50 && metascore_parsed < 75){
                color = 'rgb(255,255,0)';
                wrapperBorderColor = 'metascore-border-yellow';
                metascoreNumberWrapper.style.backgroundColor = color;
            }
            
            else if(metascore_parsed >= 75){
                color = 'rgb(0,255,0)';
                wrapperBorderColor = 'metascore-border-green';
                metascoreNumberWrapper.style.backgroundColor = color;
                
            }

            else{
                color = 'rgb(241,104,76)';
                wrapperBorderColor = 'metascore-border-default';
                metascoreNumberWrapper.style.backgroundColor = color;
            }
        
        wrapper.appendChild(metascoreNumberWrapper);
        wrapper.appendChild(metascoreTextWrapper);

            return `<div class="metascore-wrapper ${wrapperBorderColor}">${wrapper.innerHTML}</div>`;
};
