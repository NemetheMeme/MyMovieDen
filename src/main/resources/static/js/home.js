const input = document.querySelector('#movieInput');
const itemWrapper = document.querySelector('.dropdown-menu');
//const mainWrapper = document.querySelector('.full-page-container');

const onInput = async event => {
    const items = await fetchData(event.target.value);

    if(!items.length){
        return;
    }

    itemWrapper.innerHTML = '';

    for(let item of items){

        const option = document.createElement('li');
        option.classList.add('dropdown-item');
        option.innerHTML = renderOption(item);

        option.addEventListener('click', () => {
            input.value = item.Title;
            onMovieSelect(item, '/movie_preview');
            
        });
        itemWrapper.appendChild(option);
        };
};

input.addEventListener('input', debounce(onInput, 500));

const handleCheckboxChange = async () => {
  await refreshMovieTemplate();
};

function submitFavoriteForm() {
  document.getElementById('favoriteForm').submit();
}


