import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';
function MovieList({ movies }) {
  const location = useLocation();
  
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;