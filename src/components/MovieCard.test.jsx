import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MovieCard from './MovieCard';

describe('MovieCard', () => {
  it('renders poster image when poster_path exists', () => {
    const item = {
      id: 1,
      title: 'Test Movie',
      poster_path: '/poster.jpg',
      release_date: '2024-05-12',
    };
    render(<MovieCard item={item} />);
    const img = screen.getByRole('img', { name: 'Test Movie' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', expect.stringContaining('poster.jpg'));
    expect(screen.getByText('MAY 12')).toBeInTheDocument();
  });

  it('renders placeholder when no poster_path', () => {
    const item = { id: 2, title: 'No Poster Movie' };
    render(<MovieCard item={item} />);
    expect(screen.getByText('N')).toBeInTheDocument();
  });

  it('handles TV show with name and first_air_date', () => {
    const item = {
      id: 3,
      name: 'TV Series',
      poster_path: '/tv.jpg',
      first_air_date: '2023-08-19',
    };
    render(<MovieCard item={item} />);
    expect(screen.getByAltText('TV Series')).toBeInTheDocument();
    expect(screen.getByText('AUG 19')).toBeInTheDocument();
  });
});
