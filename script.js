const searchForm = document.querySelector('#search-form');
const movie = document.querySelector('#movies');

function apiSearch(e) {
    e.preventDefault();
    const searchText = document.querySelector('.form-control').value;
    const server = 'https://api.themoviedb.org/3/search/multi?api_key=2913b93c3b9bf9d4b092a13f3caf1044&language=ru&query=' + searchText;
    requestApi('GET', server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(method, url) {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.send();

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;
        if (request.status !== 200) {
            console.log('error: ' + request.status)
            return;
        };

        const output = JSON.parse(request.responseText);
        let inner = '';
        output.results.forEach(item => {
            let nameItem = item.name || item.title;
            let imgItem = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path || item.profile_path}`;
            if (item.poster_path == null && item.profile_path == null) {
                imgItem = 'https://apps3.awi.de/YPP/png/no-image.png';
            }
            let firstEpItem = item.first_air_date || item.release_date || '';
            inner += `
                <div class="col-12 col-md-6 col-xl-4 mb-5 d-flex flex-column align-items-center">
                    <h5 class="mb-auto text-primary">${nameItem}</h5>
                    <span class="mb-auto text-danger">${firstEpItem}</span>
                    <a class="mt-2 bg-light d-flex align-items-center justify-content-center" style="width: 300px; height: 450px" href="https://www.themoviedb.org/${item.media_type}/${item.id}${item.original_name}?language=ru-RU" target="_blank">
                        <img src="${imgItem}" alt="${nameItem}">
                    </a>
                </div>
            `;
        })
        
        if(inner == '') {
            movie.innerHTML = `<img class="mx-auto" src="https://img.icons8.com/color/160/nothing-found.png">`;
        } else {
            movie.innerHTML = inner;
        }
    });
}