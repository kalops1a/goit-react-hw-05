import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const API_KEY = 'a6ab354a73d4ec86c53289fa92511a9d';

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const query = searchParams.get('query') || '';

  useEffect(() => {
    async function fetchMovies() {
      if (!query) return;
      setLoading(true);
      setError('');

      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`
          },
          params: {
            query,
            include_adult: false,
            language: 'en-US',
            page: 1
          }
        });
        setMovies(response.data.results);
      } catch (err) {
        setError('Failed to fetch movies');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.search.value;
    setSearchParams({ query: searchQuery });
  };

  return (
    <div className={styles.moviesPage}>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 ? <MovieList movies={movies} /> : <p>No movies found</p>}
    </div>
  );
}

export default MoviesPage;