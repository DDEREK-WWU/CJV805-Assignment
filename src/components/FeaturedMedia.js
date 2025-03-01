import React, { useContext } from 'react';
import { MediaContext } from '../context/MediaContext';

const FeaturedMedia = () => {
    const { movies = [] , tvShows = [] } = useContext(MediaContext);
    const featuredMovies = movies.filter(movie => movie.genre && movie.genre.toLowerCase().includes("animation"));
    const featuredTvShows = tvShows.filter(tvShow => tvShow.genre && tvShow.genre.toLowerCase().includes("family"));

    const getRandomMovies =  (moviesArray, num) => {
        const randomMovies = [...moviesArray].sort(() => 0.5 - Math.random());
        return randomMovies.slice(0, num);  
    }

    const getRandomTvShows =  (TvShowsArray, num) => {
        const randomTvShows = [...TvShowsArray].sort(() => 0.5 - Math.random());
        return randomTvShows.slice(0, num);  
    }

    const displayMovies = getRandomMovies(featuredMovies, 6);
    const displayTvShows = getRandomTvShows(featuredTvShows, 6);

    return (
    <div className="featured-section">
        <div className="media-category">
          <h2>Featured Movies</h2>
          <div className="movie-list">
            {displayMovies.map(movie => (
              <div key={movie.id} className="movie-card">
                <img src={movie.poster} alt={movie.title} className="movie-poster" />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
    
        <div className="media-category">
          <h2>Featured TV Shows</h2>
          <div className="TvShows-list">
            {displayTvShows.map(tvShow => (
              <div key={tvShow.id} className="TvShows-card">
                <img src={tvShow.poster} alt={tvShow.title} className="TvShows-poster" />
                <p>{tvShow.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default FeaturedMedia;