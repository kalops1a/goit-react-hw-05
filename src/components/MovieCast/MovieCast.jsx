import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';

const API_KEY = 'a6ab354a73d4ec86c53289fa92511a9d';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchCast() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          params: {
            api_key: API_KEY
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
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className={styles.actorImage}
              />
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