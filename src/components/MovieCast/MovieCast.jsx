import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCast() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
          }
        });
        setCast(response.data.cast);
      } catch (err) {
        setError('Failed to fetch cast');
        console.error('Error fetching cast:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.castContainer}>
      <h3>Cast</h3>
      <ul>
        {cast.length > 0 ? (
          cast.map(actor => (
            <li key={actor.cast_id}>
              {actor.name} as {actor.character}
            </li>
          ))
        ) : (
          <li>No cast information available</li>
        )}
      </ul>
    </div>
  );
}

export default MovieCast;