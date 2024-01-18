import { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './search.svg'
import MovieCard from "./MoviecCard";

const API_URL = 'https://www.omdbapi.com?apikey=12ed2c73';

const movie1 = {
        "Title": "The Batman",
        "Year": "2022",
        "imdbID": "tt1877830",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const respose = await fetch(`${API_URL}&s=${title}`);
        const data = await respose.json();

        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies('batman');
    }, []);

    return (
        <div className="app">
            <h1>MoviesWorld</h1>

            <div className="search">
                <input 
                placeholder="Search for the Movies"
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <img
                src={SearchIcon}
                alt="search"
                onClick={()=>searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                  ? (
                     <div className="container">
                     {movies.map((movie) => (
                        <MovieCard movie={movie} />
                     ))}
                    </div>
                   ) : (
                        <div className="empty">
                            <h2>No Movies found</h2>
                        </div>
                   )
                    
            }

        </div>
    )
}

export default App;

