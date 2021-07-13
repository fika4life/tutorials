
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const searchEl = document.getElementById('search');

async function getMovies(url){
    const response = await fetch(url)
    const data = await response.json()
    console.log(data.results)
    showMovies(data.results);
    
}

function showMovies(movies){

    //clears the page in case needs to be repopulated on search 
    main.innerHTML = '';

   movies.forEach((movie) => {
    const { title, poster_path, overview, vote_average } = movie

    //creates div to hold each movie
   const movieDiv = document.createElement('div');

   //adds classname to div
   movieDiv.className = 'movie';

    const movieContent = `
        <img src="${IMG_PATH + poster_path}" alt="${title} poster" class="image">
        <div id="movie-info">
            <h3>${title}</h3>
            <span class="${getRatingColor(vote_average)}">${vote_average}</span>
        </div>
        <div id="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
    `;
     //adds moviecontent to movie div 
    movieDiv.innerHTML = movieContent;
 
     //adds movie div to main
    main.appendChild(movieDiv)

   }) 

}

function getRatingColor(rating){
 
    if (rating > 8){
        return 'green';
    }
    else if (rating > 5) return 'orange';
    else return 'red';
}

function search(e){

        e.preventDefault();
    
        let searchText = searchEl.value 
        
        console.log(SEARCH_API + searchText + '"');

        getMovies(SEARCH_API + searchText + '"');

        searchText = '';
}


getMovies('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1');



document.getElementById('form').addEventListener('submit', search );


