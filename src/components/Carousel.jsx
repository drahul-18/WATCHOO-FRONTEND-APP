import MovieCard from './MovieCard';
import './Carousel.css';

export default function Carousel({ title, items }) {
  if (!items?.length) return null;

  return (
    <section className="carousel-section">
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel">
        {items.map((item) => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
