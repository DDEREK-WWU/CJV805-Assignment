const express = require("express");
const MediaData = require("./mediaData");

const app = express();
const mediaData = new MediaData();
const PORT = process.env.PORT || 3001;

// Middleware to initialize data before handling requests
app.use((req, res, next) => {
    mediaData.initialize()
        .then(() => next())
        .catch(err => console.log(err));
});

// Get all movies
app.get("/api/movies", (req, res) => {
    mediaData.getAllMovies()
        .then(movies => res.json(movies))
        .catch(err => res.status(500).send(err));
});

// Get movie by ID
app.get("/api/movies/:id", (req, res) => {
    mediaData.getMovieById(req.params.id)
        .then(movie => res.json(movie))
        .catch(err => res.status(404).send(err));
});

// Get all TV Shows
app.get("/api/tvShows", (req, res) => {
    mediaData.getAllTVShows()
        .then(tvShows => res.json(tvShows))
        .catch(err => res.status(500).send(err));
});

// Get TV Show by ID
app.get("/api/tvShows/:id", (req, res) => {
    mediaData.getTVShowById(req.params.id)
        .then(tvShow => res.json(tvShow))
        .catch(err => res.status(404).send(err));
});

// Default route
app.get("/api", (req, res) => {
    res.send("Media API is running.");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});