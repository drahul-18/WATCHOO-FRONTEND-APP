# WATCHOO - Netflix-Style Movie App

A React frontend that fetches movie and TV data from [TMDB](https://www.themoviedb.org/) and displays it in a Netflix-style landing page.

## Setup

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root (copy from `.env.example`):

```
VITE_TMDB_API_KEY=your_api_key_here
```

Get your free API key at [TMDB Settings](https://www.themoviedb.org/settings/api).

3. Run locally:

```bash
npm run dev
```

## Deploy to Vercel

### First-time setup

1. Push your code to GitHub and connect the repo to [Vercel](https://vercel.com).
2. In Vercel, go to your project → **Settings** → **Environment Variables**.
3. Add:
   - **Name:** `VITE_TMDB_API_KEY`
   - **Value:** Your TMDB API key
   - **Environments:** Production, Preview, Development (check all)
4. Click **Save**.

### Redeploy after adding env var

1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Open your **WATCHOO-FRONTEND-APP** project.
3. Go to the **Deployments** tab.
4. Find the latest deployment and click the **⋮** (three dots) menu.
5. Click **Redeploy**.
6. Confirm with **Redeploy** again.

Vercel will rebuild and deploy with the new environment variable.

### Redeploy after code changes

Push to GitHub and Vercel will auto-deploy:

```bash
git add .
git commit -m "Your message"
git push origin master
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests |
| `npm run verify` | Run tests + build |
