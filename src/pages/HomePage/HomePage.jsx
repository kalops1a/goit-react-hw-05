import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const API_KEY = 'a6ab354a73d4ec86c53289fa92511a9d';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: API_KEY
          }
        });
        setMovies(response.data.results);
      } catch (err) {
        setError('Failed to fetch popular movies');
        console.error('Error fetching popular movies:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPopularMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Popular Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;