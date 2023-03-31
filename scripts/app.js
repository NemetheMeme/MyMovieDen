const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const itemWrapper = document.querySelector('.dropdown-content');
const mainWrapper = document.querySelector('#detail-wrapper');

const onInput = async event => {
    const items = await fetchData(event.target.value);

    if(!items.length){
        dropdown.classList.add('is-inactive');
        return;
    }

    itemWrapper.innerHTML = '';
    dropdown.classList.remove('is-inactive');

    for(let item of items){

        const option = document.createElement('a');

        option.classList.add('dropdown-item');
        option.innerHTML = renderOption(item);

        option.addEventListener('click', () => {
            dropdown.classList.add('is-inactive');
            input.value = item.Title;
            onMovieSelect(item, mainWrapper);
            
        });

        itemWrapper.appendChild(option);
        };
};

input.addEventListener('input', debounce(onInput, 500));


document.addEventListener('click', event => { 
    if(document.querySelector('body').contains(event.target)){
        dropdown.classList.add('is-inactive');
    }
});

