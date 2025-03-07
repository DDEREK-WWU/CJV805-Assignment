const express = require("express");
const cors = require("cors"); // ✅ Import CORS

const MediaData = require("./mediaData");

const app = express();
const mediaData = new MediaData();
const PORT = process.env.PORT || 3001;

// Enable CORS for frontend (React at http://localhost:3000)
app.use(cors());

// Middleware to initialize data before handling requests
app.use((req, res, next) => {
    mediaData.initialize()
        .then(() => next())
        .catch(err => console.log(err));
});

// API routes
app.get("/api/movies", (req, res) => {
    mediaData.getAllMovies()
        .then(movies => res.json(movies))
        .catch(err => res.status(500).send(err));
});

app.get("/api/tvshows", (req, res) => {
    mediaData.getAllTVShows()
        .then(tvShows => res.json(tvShows))
        .catch(err => res.status(500).send(err));
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Backend running at http://localhost:${PORT}`);
});