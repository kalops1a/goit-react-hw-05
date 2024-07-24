import React, { useState } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: { query },
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
      }
    });
    setMovies(response.data.results);
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Enter movie title" 
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;