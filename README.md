# Movie Watchlist

A simple full-stack movie watchlist app: list all your movies, add new ones, and search them by title.

## Stack

- **Frontend** (`client/`) — Vite + React + TypeScript + Tailwind v4 + shadcn/ui, deployed to Vercel.
- **Backend** (`server/`) — Express + MongoDB (Mongoose) + TypeScript, deployed to Render.

## Structure

```
.
├── client/   # React frontend
├── server/   # Express + Mongo backend
└── README.md
```

See `client/README.md` and `server/README.md` for setup steps in each.

## Pages

- `/all-movies` — all movies, with a delete button per card.
- `/add-movie` — form with title / genre / description and basic validation.
- `/search-movies` — debounced search by title (500ms, no button).

## Deployment

- **Frontend → Vercel**: import the repo, set the project root to `client`. Add an env var `VITE_API_URL` pointing at the Render backend URL.
- **Backend → Render**: new web service, project root `server`, build `npm install`, start `npm start`. Add env var `MONGO_URI`. Render injects `PORT`.

## How AI helped

This project was built with the help of an AI assistant (Claude Code). I had already set up a few rules and skills on my machine from previous projects — preferences around commit style, code conventions, and a couple of best-practice guides — and those gave the assistant a solid baseline so it knew how I like things done without me having to repeat myself.

Beyond that, the assistant was just following the instructions I gave it: which stack to use, which features to build, what the spec was, and when to commit. The structure, the page specs, the validation rules, the route names — all of that came from me. The AI handled the typing-out part and pointed out tradeoffs along the way (e.g. that Express doesn't run as-is on Vercel, so we'd need Render for the backend).
