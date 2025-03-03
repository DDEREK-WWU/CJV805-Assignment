class MediaData {
    constructor() {
        this.movies = [];
        this.tvShows = [];
    }

    initialize() {
        const movieData = require("./db.json").movies;
        const tvShowData = require("./db.json").tvShows;

        return new Promise((resolve, reject) => {
            this.movies = movieData;
            this.tvShows = tvShowData;
            resolve("Media data has been initialized.");
        });
    }

    getAllMovies() {
        return new Promise((resolve, reject) => {
            resolve(this.movies);
        });
    }

    getMovieById(id) {
        return new Promise((resolve, reject) => {
            const movie = this.movies.find(m => m.id === parseInt(id));
            movie ? resolve(movie) : reject("Movie not found.");
        });
    }

    getAllTVShows() {
        return new Promise((resolve, reject) => {
            resolve(this.tvShows);
        });
    }

    getTVShowById(id) {
        return new Promise((resolve, reject) => {
            const show = this.tvShows.find(s => s.id === parseInt(id));
            show ? resolve(show) : reject("TV show not found.");
        });
    }
}

module.exports = MediaData;