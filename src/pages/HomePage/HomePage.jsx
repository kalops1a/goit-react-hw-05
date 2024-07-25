import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPopularMovies() {
      setLoading(true);
      setError('');

      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: API_KEY,
            language: 'en-US', 
            page: 1, 
          },
        });
        setMovies(response.data.results);
      } catch (err) {
        setError('Error fetching popular movies.');
        console.error('Error fetching popular movies:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPopularMovies();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Popular Movies</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;