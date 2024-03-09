export const API_KEY = 'a59696eafcb73313abcb68438810dedd';
export const language = 'language=pt-BR';

const movieContainer = document.querySelector('.contentMovieResult')
const moviePoster = document.querySelector('.movie-poster')
const movieTitle = document.querySelector('.movie-title')
const movieDescription = document.querySelector('.movie-description')
const getRandomMovieBtn = document.querySelector('.find-movie')

getRandomMovieBtn.addEventListener('click', async () => {
  const randomId = Math.floor(Math.random() * 500)
  try {
    const movieData = await getMovie(randomId)
    renderMovie(movieData)
  } catch (error) {
    console.error("Erro ao buscar filme:", error)
    displayErrorMessage()
  }
})

// Retorna as informações solicitadas dos filmes
async function getMovie(randomId) {
  const movie = await fetch(`https://api.themoviedb.org/3/movie/${randomId}?api_key=${API_KEY}&${language}`)
  if (!movie.ok) {
    throw new Error('Erro ao buscar filme: ' + movie.statusText)
  }
  return movie.json()
}

// Muda as informações do filme
function renderMovie(movieData) {
  movieContainer.style.display = 'flex'
  moviePoster.src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
  movieTitle.textContent = movieData.title
  movieDescription.textContent = movieData.overview
}

// Exibe a mensagem de erro
function displayErrorMessage() {
  movieContainer.style.display = 'flex'
  moviePoster.src = './assets/errorPoster.png' // muda a img para a do erro
  movieTitle.textContent = "Ops, hoje não é dia de assistir filme."
  movieDescription.textContent = "Bora codar! 🚀"
}
