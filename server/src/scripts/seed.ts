import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from '../db.ts'
import { MovieModel } from '../models/movie.ts'
import type { MovieInput } from '../types/movie.ts'

const movies: MovieInput[] = [
  {
    title: 'The Matrix',
    genre: 'Sci-Fi',
    description: 'A hacker discovers reality is a simulation.',
    year: 1999,
    director: 'The Wachowskis',
    rating: 8.7,
    watched: true,
  },
  {
    title: 'Inception',
    genre: 'Sci-Fi',
    description: 'A thief enters dreams to plant ideas.',
    year: 2010,
    director: 'Christopher Nolan',
    rating: 8.8,
    watched: true,
  },
  {
    title: 'Spirited Away',
    genre: 'Animation',
    description: 'A girl wanders into a world ruled by spirits.',
    year: 2001,
    director: 'Hayao Miyazaki',
    rating: 8.6,
    watched: false,
  },
  {
    title: 'Parasite',
    genre: 'Thriller',
    description: 'A poor family schemes their way into a rich household.',
    year: 2019,
    director: 'Bong Joon-ho',
    rating: 8.5,
    watched: false,
  },
  {
    title: 'Whiplash',
    genre: 'Drama',
    description: 'A young drummer faces a brutal music instructor.',
    year: 2014,
    director: 'Damien Chazelle',
    rating: 8.5,
    watched: true,
  },
]

async function run() {
  const uri = process.env.MONGO_URI
  if (!uri) {
    console.error('MONGO_URI is not set in .env')
    process.exit(1)
  }
  await connectDB(uri)
  await MovieModel.deleteMany({})
  const inserted = await MovieModel.insertMany(movies)
  console.log(`Seeded ${inserted.length} movies`)
  await mongoose.disconnect()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
