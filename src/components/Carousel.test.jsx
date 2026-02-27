import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Carousel from './Carousel';

describe('Carousel', () => {
  it('returns null when items is empty', () => {
    const { container } = render(<Carousel title="Test" items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when items is undefined', () => {
    const { container } = render(<Carousel title="Test" />);
    expect(container.firstChild).toBeNull();
  });

  it('renders title and movie cards', () => {
    const items = [
      { id: 1, title: 'Movie 1', poster_path: '/p1.jpg', release_date: '2024-01-15' },
      { id: 2, title: 'Movie 2', poster_path: '/p2.jpg' },
    ];
    render(<Carousel title="New this week" items={items} />);
    expect(screen.getByText('New this week')).toBeInTheDocument();
    expect(screen.getByAltText('Movie 1')).toBeInTheDocument();
    expect(screen.getByAltText('Movie 2')).toBeInTheDocument();
  });

  it('handles TV shows with name instead of title', () => {
    const items = [{ id: 1, name: 'TV Show', poster_path: '/p1.jpg' }];
    render(<Carousel title="Trending" items={items} />);
    expect(screen.getByAltText('TV Show')).toBeInTheDocument();
  });
});
