import React, { createContext, useState, useEffect } from 'react';

export const MediaContext = createContext();


const API_BASE_URL = "/api"; // Now points to the Vercel serverless function

const MediaProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/movies`)
      .then(response => response.json())
      .then(data => setMovies(data));

    fetch(`${API_BASE_URL}/tvShows`)
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