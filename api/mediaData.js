class MediaData {
    constructor() {
        this.movies = [];
        this.tvShows = [];
    }

    initialize() {
        const movieData = require("./db.json").movies;
        const tvShowData = require("./db.json").tvShows;

        return new Promise((resolve) => {
            // Force `id` to always be a string
            this.movies = movieData.map(movie => ({
                ...movie,
                id: String(movie.id) // Convert ID to string
            }));

            this.tvShows = tvShowData.map(tvShow => ({
                ...tvShow,
                id: String(tvShow.id) // Convert ID to string
            }));

            resolve("Media data has been initialized.");
        });
    }

    getAllMovies() {
        return new Promise((resolve) => {
            resolve(this.movies);
        });
    }

    getAllTVShows() {
        return new Promise((resolve) => {
            resolve(this.tvShows);
        });
    }
}

module.exports = MediaData;