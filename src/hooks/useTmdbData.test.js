import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useTmdbData } from './useTmdbData';

vi.mock('../api/tmdb', () => ({
  getTrending: vi.fn(),
  getNowPlaying: vi.fn(),
  getPopular: vi.fn(),
}));

import { getTrending, getNowPlaying, getPopular } from '../api/tmdb';

describe('useTmdbData', () => {
  const mockTrending = [
    {
      id: 1,
      title: 'Trending Movie',
      poster_path: '/p1.jpg',
      backdrop_path: '/b1.jpg',
      vote_average: 8,
      vote_count: 1000,
      adult: false,
    },
  ];
  const mockNowPlaying = [
    {
      id: 2,
      title: 'Now Playing',
      poster_path: '/p2.jpg',
      adult: false,
    },
  ];
  const mockPopular = [
    {
      id: 3,
      title: 'Popular Movie',
      poster_path: '/p3.jpg',
      adult: false,
    },
  ];

  beforeEach(() => {
    vi.mocked(getTrending).mockResolvedValue(mockTrending);
    vi.mocked(getNowPlaying).mockResolvedValue(mockNowPlaying);
    vi.mocked(getPopular).mockResolvedValue(mockPopular);
  });

  it('returns loading true initially', () => {
    vi.mocked(getTrending).mockImplementation(() => new Promise(() => {}));
    vi.mocked(getNowPlaying).mockImplementation(() => new Promise(() => {}));
    vi.mocked(getPopular).mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useTmdbData());
    expect(result.current.loading).toBe(true);
  });

  it('fetches data and populates state', async () => {
    const { result } = renderHook(() => useTmdbData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.featured).toEqual(mockTrending[0]);
    expect(result.current.trendingNow).toEqual(mockTrending);
    expect(result.current.newThisWeek).toEqual(mockNowPlaying);
    expect(result.current.error).toBeNull();
  });

  it('sets error on API failure', async () => {
    vi.mocked(getTrending).mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useTmdbData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Network error');
    expect(result.current.featured).toBeNull();
  });

  it('filters out adult content', async () => {
    vi.mocked(getTrending).mockResolvedValue([
      ...mockTrending,
      { id: 99, title: 'Adult', poster_path: '/x.jpg', adult: true },
    ]);

    const { result } = renderHook(() => useTmdbData());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.trendingNow).toHaveLength(1);
    expect(result.current.trendingNow[0].adult).toBeFalsy();
  });
});
