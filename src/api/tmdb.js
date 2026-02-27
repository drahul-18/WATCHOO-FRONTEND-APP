const API_BASE = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p';

const getApiKey = () => import.meta.env.VITE_TMDB_API_KEY;

export function getImageUrl(path, size = 'w500') {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
}

async function fetchTmdb(endpoint) {
  const url = `${API_BASE}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${getApiKey()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  return res.json();
}

export async function getTrending(timeWindow = 'day') {
  const data = await fetchTmdb(`/trending/all/${timeWindow}?language=en-US`);
  return data.results || [];
}

export async function getPopular(page = 1) {
  const data = await fetchTmdb(`/movie/popular?language=en-US&page=${page}`);
  return data.results || [];
}

export async function getNowPlaying(page = 1) {
  const data = await fetchTmdb(`/movie/now_playing?language=en-US&page=${page}`);
  return data.results || [];
}
