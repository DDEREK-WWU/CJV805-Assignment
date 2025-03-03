import React, { createContext, useState, useEffect } from 'react';

export const MediaContext = createContext();


const API_BASE_URL = "../api"; // Now points to the Vercel serverless function

const MediaProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    fetch(`https://cjv-805-assignment-git-main-dderek-wwus-projects.vercel.app/api/movies`)
      .then(response => response.json())
      .then(data => setMovies(data));

    fetch(`https://cjv-805-assignment-git-main-dderek-wwus-projects.vercel.app/api/tvShows`)
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