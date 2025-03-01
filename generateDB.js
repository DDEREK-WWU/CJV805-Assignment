const fs = require('fs');

const API_KEY = '9d8f7698fcea19d1c0fb8fdbd7c541ea';
const MOVIE_GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
const TV_GENRE_URL = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`;
const MOVIE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`;
const TV_URL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US`;

const PAGES_TO_FETCH = 5;
const FALLBACK_POSTER = 'https://via.placeholder.com/500x750?text=No+Poster';
const FALLBACK_BANNER = 'https://via.placeholder.com/1920x800?text=No+Banner';

// Function to fetch genres and create a mapping object
const fetchGenres = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const genreMap = {};
    
    data.genres.forEach(genre => {
      genreMap[genre.id] = genre.name;
    });

    return genreMap;
  } catch (error) {
    console.error("❌ Error fetching genres:", error);
    return {};
  }
};

function getRandomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to fetch multiple pages of movies
const fetchMovies = async (genreMap) => {
  let allMovies = [];

  for (let page = 1; page <= PAGES_TO_FETCH; page++) {
    console.log(`📥 Fetching movies from page ${page}...`);
    const response = await fetch(`${MOVIE_URL}&page=${page}`);
    const data = await response.json();
    
    if (data.results) {
      const movies = data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown',
        genre: movie.genre_ids.map(id => genreMap[id] || "Unknown").join(', '), // ✅ Map genre names
        rating: movie.vote_average,
        overview: movie.overview,
        buy: getRandomPrice(15, 25)-0.01,
        rent: getRandomPrice(1, 5)-0.01,
        poster: movie.poster_path 
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
          : FALLBACK_POSTER,
        banner: movie.backdrop_path 
          ? `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}` 
          : FALLBACK_BANNER
      }));

      allMovies = [...allMovies, ...movies];
    }
  }

  return allMovies;
};

// Function to fetch multiple pages of TV shows
const fetchTvShows = async (genreMap) => {
  let allTvShows = [];

  for (let page = 1; page <= PAGES_TO_FETCH; page++) {
    console.log(`📥 Fetching TV shows from page ${page}...`);
    const response = await fetch(`${TV_URL}&page=${page}`);
    const data = await response.json();

    if (data.results) {
      const tvShows = data.results.map(tvShow => ({
        id: tvShow.id,
        title: tvShow.name,
        year: tvShow.first_air_date ? new Date(tvShow.first_air_date).getFullYear() : 'Unknown',
        genre: tvShow.genre_ids.map(id => genreMap[id] || "Unknown").join(', '), // ✅ Map genre names
        rating: tvShow.vote_average,
        overview: tvShow.overview,
                buy: getRandomPrice(15, 25)-0.01,
        rent: getRandomPrice(1, 5)-0.01,
        poster: tvShow.poster_path 
          ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` 
          : FALLBACK_POSTER,
        banner: tvShow.backdrop_path 
          ? `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces${tvShow.backdrop_path}` 
          : FALLBACK_BANNER
      }));

      allTvShows = [...allTvShows, ...tvShows];
    }
  }

  return allTvShows;
};

// Main function to generate the database JSON file
const generateDbJson = async () => {
  console.log("⏳ Fetching genre lists...");
  
  const movieGenreMap = await fetchGenres(MOVIE_GENRE_URL);
  const tvGenreMap = await fetchGenres(TV_GENRE_URL);

  console.log("✅ Movie Genres:", movieGenreMap);
  console.log("✅ TV Show Genres:", tvGenreMap);

  console.log("⏳ Fetching movies and TV shows...");
  
  const movies = await fetchMovies(movieGenreMap);
  const tvShows = await fetchTvShows(tvGenreMap);

  const db = { movies, tvShows };

  fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
  
  console.log(`✅ db.json file has been generated with ${movies.length} movies and ${tvShows.length} TV shows.`);
};

generateDbJson();