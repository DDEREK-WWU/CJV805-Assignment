import React, { createContext, useState, useEffect } from 'react';

export const MediaContext = createContext();



const MediaProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/movies`)
      .then(response => response.json())
      .then(data => setMovies(data));

    fetch(`http://localhost:3001/tvshows`)
      .then(response => response.json())
      .then(data => setTvShows(data));
  }, []);

  return (
    <MediaContext.Provider value={{ movies, tvShows }}>
      {children}
    </MediaContext.Provider>
  );
};

export default MediaProvider;