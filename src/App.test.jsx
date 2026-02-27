import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

vi.mock('./hooks/useTmdbData', () => ({
  useTmdbData: vi.fn(),
}));

import { useTmdbData } from './hooks/useTmdbData';

describe('App', () => {
  beforeEach(() => {
    vi.mocked(useTmdbData).mockReturnValue({
      featured: { id: 1, title: 'Featured', backdrop_path: '/b.jpg', vote_average: 8, vote_count: 100 },
      newThisWeek: [{ id: 2, title: 'New', poster_path: '/p.jpg' }],
      trendingNow: [{ id: 3, title: 'Trending', poster_path: '/p2.jpg' }],
      loading: false,
      error: null,
    });
  });

  it('renders sidebar', () => {
    render(<App />);
    expect(screen.getByTitle('Home')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    vi.mocked(useTmdbData).mockReturnValue({
      featured: null,
      newThisWeek: [],
      trendingNow: [],
      loading: true,
      error: null,
    });
    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    vi.mocked(useTmdbData).mockReturnValue({
      featured: null,
      newThisWeek: [],
      trendingNow: [],
      loading: false,
      error: 'Failed to fetch',
    });
    render(<App />);
    expect(screen.getByText('Error loading data')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
  });

  it('renders Hero and Carousels when loaded', () => {
    render(<App />);
    expect(screen.getByText('Featured')).toBeInTheDocument();
    expect(screen.getByText('New this week')).toBeInTheDocument();
    expect(screen.getByText('Trending Now')).toBeInTheDocument();
  });
});
