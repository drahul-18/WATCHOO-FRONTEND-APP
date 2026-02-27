import { getImageUrl } from '../api/tmdb';
import './Hero.css';

export default function Hero({ featured }) {
  if (!featured) return null;

  const title = featured.title || featured.name;
  const mediaType = featured.media_type === 'tv' ? 'SERIES' : 'MOVIE';
  const backdropUrl = getImageUrl(featured.backdrop_path, 'w1280');
  const rating = featured.vote_average?.toFixed(1) || 'N/A';
  const streams = featured.vote_count
    ? featured.vote_count >= 1000000
      ? `${(featured.vote_count / 1000000).toFixed(1)}M+ Streams`
      : `${Math.max(1, Math.floor(featured.vote_count / 1000))}K+ Streams`
    : '';

  const words = title?.split(' ') || [];
  const lastWord = words.pop();
  const titleFirst = words.join(' ');
  const titleLast = lastWord || '';

  return (
    <section
      className="hero"
      style={{
        backgroundImage: backdropUrl
          ? `linear-gradient(to right, rgba(20,20,20,0.95) 0%, rgba(20,20,20,0.6) 50%, transparent 100%), url(${backdropUrl})`
          : 'linear-gradient(to right, #141414 0%, #181818 100%)',
      }}
    >
      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-netflix-n">N</span>
          <span>{mediaType}</span>
        </div>
        <h1 className="hero-title">
          {titleFirst && <span className="hero-title-first">{titleFirst} </span>}
          {titleLast && (
            <span className="hero-title-highlight">{titleLast}</span>
          )}
        </h1>
        <div className="hero-meta">
          {rating && (
            <span className="hero-rating">IMDb {rating}/10</span>
          )}
          {streams && (
            <span className="hero-streams">{streams}</span>
          )}
        </div>
        <div className="hero-actions">
          <button className="hero-btn hero-btn-play">Play</button>
          <button className="hero-btn hero-btn-trailer">Watch Trailer</button>
        </div>
      </div>
    </section>
  );
}
