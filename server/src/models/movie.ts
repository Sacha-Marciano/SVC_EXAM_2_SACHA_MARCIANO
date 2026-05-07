import { Schema, model } from 'mongoose'
import type { Movie } from '../types/movie.ts'

const movieSchema = new Schema<Movie>(
  {
    title: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    year: { type: Number, required: true },
    director: { type: String, required: true },
    rating: { type: Number, min: 0, max: 10, default: 0 },
    watched: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const MovieModel = model<Movie>('Movie', movieSchema)
