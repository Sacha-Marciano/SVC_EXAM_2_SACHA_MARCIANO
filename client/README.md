# Client

React + Vite + TypeScript + Tailwind v4 + shadcn/ui frontend for the movie watchlist.

## Setup

```bash
npm install
```

Create a `.env` file (or copy from `.env.example`):

```
VITE_API_URL=http://localhost:4000
```

If `VITE_API_URL` is not set, the app falls back to `http://localhost:4000`.

## Run

```bash
npm run dev      # start dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Pages

- `/all-movies` — list of all movies with delete
- `/add-movie` — form to add a new movie
- `/search-movies` — debounced (500ms) search by title
