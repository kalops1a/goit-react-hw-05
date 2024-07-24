import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchCast() {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
        }
      });
      setCast(response.data.cast);
    }
    
    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      <ul>
        {cast.map(actor => (
          <li key={actor.cast_id}>{actor.name} as {actor.character}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;