import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getImageUrl, getTrending, getPopular, getNowPlaying } from './tmdb';

describe('getImageUrl', () => {
  it('returns correct URL for poster path', () => {
    expect(getImageUrl('/abc123.jpg')).toBe('https://image.tmdb.org/t/p/w500/abc123.jpg');
  });

  it('returns correct URL with custom size', () => {
    expect(getImageUrl('/backdrop.jpg', 'w1280')).toBe(
      'https://image.tmdb.org/t/p/w1280/backdrop.jpg'
    );
  });

  it('returns null for empty path', () => {
    expect(getImageUrl(null)).toBe(null);
    expect(getImageUrl('')).toBe(null);
  });
});

describe('TMDB API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('getTrending fetches and returns results', async () => {
    const mockResults = [{ id: 1, title: 'Movie 1' }];
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: mockResults }),
      })
    );

    const results = await getTrending('day');
    expect(results).toEqual(mockResults);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/trending/all/day')
    );
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('api_key='));
  });

  it('getPopular fetches and returns results', async () => {
    const mockResults = [{ id: 2, title: 'Popular Movie' }];
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: mockResults }),
      })
    );

    const results = await getPopular(1);
    expect(results).toEqual(mockResults);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/movie/popular')
    );
  });

  it('getNowPlaying fetches and returns results', async () => {
    const mockResults = [{ id: 3, title: 'Now Playing' }];
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: mockResults }),
      })
    );

    const results = await getNowPlaying(1);
    expect(results).toEqual(mockResults);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/movie/now_playing')
    );
  });

  it('throws on API error', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: false, status: 401 })
    );

    await expect(getTrending('day')).rejects.toThrow('TMDB API error: 401');
  });

  it('returns empty array when results is missing', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    const results = await getTrending('day');
    expect(results).toEqual([]);
  });
});
