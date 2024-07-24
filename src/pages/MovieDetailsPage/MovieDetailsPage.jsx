import { useEffect, useState } from 'react';
import { Link, Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          params: {
            api_key: API_KEY,
            language: 'en-US', 
          },
        });
        setMovie(response.data);
      } catch (err) {
        setError('Error fetching movie details.');
        console.error('Error fetching movie details:', err);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(location.state?.from || '/movies');
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack}>Go back</button>
      <h1>{movie.title}</h1>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      <nav>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;