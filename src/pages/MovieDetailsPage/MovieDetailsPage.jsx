import { useEffect, useState } from 'react';
import { Link, Outlet, useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovieDetails() {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
        }
      });
      setMovie(response.data);
    }
    
    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(location.state?.from || '/movies');
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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