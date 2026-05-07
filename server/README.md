# Server

Express + MongoDB + TypeScript backend for the movie watchlist.

## Setup

```bash
npm install
```

Create a `.env` file with your MongoDB connection string:

```
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/SVC_EXAM?appName=Cluster0
PORT=4000
```

## Run

```bash
npm run dev    # start with watch (tsx)
npm start      # start once
npm run seed   # wipe the movies collection and insert sample data
```

## Endpoints

- `GET /movies` — list all movies
- `GET /movies/search?name=...` — case-insensitive title search
- `POST /movies` — create a movie
- `DELETE /movies/:id` — delete a movie

## Movie shape

`title`, `genre`, `description` are the spec-required fields. `year`, `director`, `rating`, `watched` are optional extras kept on the model.
