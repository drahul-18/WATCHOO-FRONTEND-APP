import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    env: {
      VITE_TMDB_API_KEY: 'test-api-key',
    },
    pool: 'forks',
    fileParallelism: false,
  },
})
