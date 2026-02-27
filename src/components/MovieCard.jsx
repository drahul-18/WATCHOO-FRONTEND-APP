import { getImageUrl } from '../api/tmdb';
import './MovieCard.css';

export default function MovieCard({ item }) {
  const title = item.title || item.name;
  const posterUrl = getImageUrl(item.poster_path);
  const releaseDate = item.release_date || item.first_air_date;

  return (
    <div className="movie-card">
      <div className="movie-card-poster">
        {posterUrl ? (
          <img src={posterUrl} alt={title} loading="lazy" />
        ) : (
          <div className="movie-card-placeholder">
            <span>{title?.[0] || '?'}</span>
          </div>
        )}
      </div>
      {releaseDate && (
        <span className="movie-card-date">
          {new Date(releaseDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }).toUpperCase()}
        </span>
      )}
    </div>
  );
}
