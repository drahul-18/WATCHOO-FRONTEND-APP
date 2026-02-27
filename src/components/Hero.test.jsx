import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  it('returns null when featured is not provided', () => {
    const { container } = render(<Hero featured={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders movie title and badge for movie type', () => {
    const featured = {
      id: 1,
      title: 'Test Movie',
      media_type: 'movie',
      backdrop_path: '/backdrop.jpg',
      vote_average: 8.5,
      vote_count: 1000,
    };
    render(<Hero featured={featured} />);
    expect(screen.getByText('MOVIE')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Movie')).toBeInTheDocument();
    expect(screen.getByText(/IMDb 8\.5\/10/)).toBeInTheDocument();
    expect(screen.getByText('1K+ Streams')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Watch Trailer' })).toBeInTheDocument();
  });

  it('renders SERIES badge for tv type', () => {
    const featured = {
      id: 2,
      name: 'Test Series',
      media_type: 'tv',
      vote_average: 7.2,
      vote_count: 500,
    };
    render(<Hero featured={featured} />);
    expect(screen.getByText('SERIES')).toBeInTheDocument();
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Series')).toBeInTheDocument();
  });

  it('formats streams as M+ for large vote counts', () => {
    const featured = {
      id: 3,
      title: 'Big Movie',
      media_type: 'movie',
      vote_average: 9,
      vote_count: 2500000,
    };
    render(<Hero featured={featured} />);
    expect(screen.getByText('2.5M+ Streams')).toBeInTheDocument();
  });
});
