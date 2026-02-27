import { useState, useEffect } from 'react';
import { getTrending, getNowPlaying, getPopular } from '../api/tmdb';

export function useTmdbData() {
  const [featured, setFeatured] = useState(null);
  const [newThisWeek, setNewThisWeek] = useState([]);
  const [trendingNow, setTrendingNow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [trendingDay, nowPlaying, popular] = await Promise.all([
          getTrending('day'),
          getNowPlaying(),
          getPopular(),
        ]);

        const filteredTrending = (trendingDay || []).filter(
          (item) => !item.adult && item.poster_path && (item.title || item.name)
        );
        const filteredNowPlaying = (nowPlaying || []).filter(
          (item) => !item.adult && item.poster_path && item.title
        );
        const filteredPopular = (popular || []).filter(
          (item) => !item.adult && item.poster_path && item.title
        );

        const heroCandidate =
          filteredTrending.find((i) => i.backdrop_path) ||
          filteredPopular.find((i) => i.backdrop_path) ||
          filteredTrending[0] ||
          filteredPopular[0];
        setFeatured(heroCandidate || null);
        setNewThisWeek(filteredNowPlaying.length ? filteredNowPlaying : filteredPopular.slice(0, 10));
        setTrendingNow(filteredTrending.length ? filteredTrending : filteredPopular);
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { featured, newThisWeek, trendingNow, loading, error };
}
