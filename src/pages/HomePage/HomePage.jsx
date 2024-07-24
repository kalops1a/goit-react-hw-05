import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchPopularMovies() {
      const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
        }
      });
      setMovies(response.data.results);
    }
    
    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;