import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './MovieReviews.module.css';

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
        }
      });
      setReviews(response.data.results);
    }
    
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h3>Reviews</h3>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <h4>{review.author}</h4>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieReviews;