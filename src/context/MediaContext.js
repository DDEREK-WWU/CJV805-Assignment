import React, { createContext, useState, useEffect } from "react";

export const MediaContext = createContext();

// Dynamically set API URL
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api"
    : "https://cjv805-backend.onrender.com/api"; //

const MediaProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("📡 Fetching movies from:", `${API_BASE_URL}/media/movies`);
    fetch(`${API_BASE_URL}/media/movies`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched Movies:", data);
        setMovies(data);
      })
      .catch(error => {
        console.error("Error fetching movies:", error);
        setError(error.message);
      });

    console.log("Fetching TV Shows from:", `${API_BASE_URL}/media/tv`);
    fetch(`${API_BASE_URL}/media/tv`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Fetched TV Shows:", data);
        setTvShows(data);
      })
      .catch(error => {
        console.error("Error fetching TV Shows:", error);
        setError(error.message);
      });
  }, []);


  return (
    <MediaContext.Provider value={{ movies, tvShows }}>
      {children}
    </MediaContext.Provider>
  );
};

export default MediaProvider;