import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./MovieCard.jsx";
import SearchIcon from "./Search.svg";
const API_URL = "https://www.omdbapi.com/?apikey=7fe53e94";
const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async title => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        if (data.Search) {
            setMovies(data.Search);
        } else {
            setMovies([]);
        }
    };
    useEffect(() => {
        searchMovies("spider");
    }, []);
    return (
        <div className="app">
            <h1>Movie Land</h1>
            <h3>
                coding by <span className="my-name">NaingWin</span>
            </h3>
            <div className="search">
                <input
                    placeholder="search for Movies"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {movies.length > 0 ? (
                <div className="container">
                    {movies.map(movie => (
                        <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
};
export default App;
