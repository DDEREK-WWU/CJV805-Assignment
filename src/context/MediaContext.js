import React, { createContext, useState, useEffect } from "react";

export const MediaContext = createContext();

// ✅ Dynamically set API URL
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api"
    : "https://cjv-805-assignment.vercel.app/api"; //

const MediaProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("📡 Fetching movies from:", `${API_BASE_URL}/movies`);
    fetch(`${API_BASE_URL}/movies`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("✅ Fetched Movies:", data);
        setMovies(data);
      })
      .catch(error => {
        console.error("❌ Error fetching movies:", error);
        setError(error.message);
      });

    console.log("📡 Fetching TV Shows from:", `${API_BASE_URL}/tvshows`);
    fetch(`${API_BASE_URL}/tvshows`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("✅ Fetched TV Shows:", data);
        setTvShows(data);
      })
      .catch(error => {
        console.error("❌ Error fetching TV Shows:", error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>❌ Error loading data: {error}</div>;
  }

  return (
    <MediaContext.Provider value={{ movies, tvShows }}>
      {children}
    </MediaContext.Provider>
  );
};

export default MediaProvider;