/**
 * End-to-end verification script: Tests TMDB API connectivity and data structure.
 * Run with: node scripts/verify-tmdb.js
 */
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

function loadEnv() {
  try {
    const envPath = join(rootDir, '.env');
    const content = readFileSync(envPath, 'utf-8');
    const env = {};
    content.split('\n').forEach((line) => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) env[match[1].trim()] = match[2].trim();
    });
    return env;
  } catch {
    return {};
  }
}

const env = loadEnv();
const API_KEY = env.VITE_TMDB_API_KEY || process.env.VITE_TMDB_API_KEY;

const API_BASE = 'https://api.themoviedb.org/3';

async function fetchTmdb(endpoint) {
  const url = `${API_BASE}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB API error: ${res.status} ${res.statusText}`);
  return res.json();
}

async function runVerification() {
  const results = { passed: 0, failed: 0, errors: [] };

  console.log('=== TMDB End-to-End Verification ===\n');

  if (!API_KEY) {
    console.error('FAIL: VITE_TMDB_API_KEY not found in .env or environment');
    process.exit(1);
  }
  console.log('PASS: API key loaded\n');

  try {
    const trending = await fetchTmdb('/trending/all/day?language=en-US');
    if (!trending.results || !Array.isArray(trending.results)) {
      throw new Error('Invalid trending response structure');
    }
    const first = trending.results[0];
    if (!first || (!first.title && !first.name)) {
      throw new Error('Trending results missing title/name');
    }
    console.log('PASS: /trending/all/day returns valid data');
    console.log(`      Sample: ${first.title || first.name} (${first.media_type})\n`);
    results.passed++;
  } catch (e) {
    console.error('FAIL: /trending/all/day -', e.message);
    results.failed++;
    results.errors.push(e.message);
  }

  try {
    const popular = await fetchTmdb('/movie/popular?language=en-US&page=1');
    if (!popular.results || !Array.isArray(popular.results)) {
      throw new Error('Invalid popular response structure');
    }
    console.log('PASS: /movie/popular returns valid data');
    console.log(`      Count: ${popular.results.length} movies\n`);
    results.passed++;
  } catch (e) {
    console.error('FAIL: /movie/popular -', e.message);
    results.failed++;
    results.errors.push(e.message);
  }

  try {
    const nowPlaying = await fetchTmdb('/movie/now_playing?language=en-US&page=1');
    if (!nowPlaying.results || !Array.isArray(nowPlaying.results)) {
      throw new Error('Invalid now_playing response structure');
    }
    console.log('PASS: /movie/now_playing returns valid data');
    console.log(`      Count: ${nowPlaying.results.length} movies\n`);
    results.passed++;
  } catch (e) {
    console.error('FAIL: /movie/now_playing -', e.message);
    results.failed++;
    results.errors.push(e.message);
  }

  try {
    const posterPath = '/sojEzvfxR2DBcDSJyAisX8TWjov.jpg';
    const imgUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
    const imgRes = await fetch(imgUrl, { method: 'HEAD' });
    if (!imgRes.ok) throw new Error(`Image URL returned ${imgRes.status}`);
    console.log('PASS: TMDB image CDN accessible\n');
    results.passed++;
  } catch (e) {
    console.error('FAIL: Image CDN -', e.message);
    results.failed++;
    results.errors.push(e.message);
  }

  console.log('=== Summary ===');
  console.log(`Passed: ${results.passed}, Failed: ${results.failed}`);
  if (results.errors.length) {
    console.log('\nErrors:', results.errors);
  }
  process.exit(results.failed > 0 ? 1 : 0);
}

runVerification();
