import { Schema, model } from 'mongoose'
import type { Movie } from '../types/movie.ts'

const movieSchema = new Schema<Movie>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 20,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
    },
    description: {
      type: String,
      default: '',
      maxlength: 200,
    },
    year: { type: Number },
    director: { type: String },
    rating: { type: Number, min: 0, max: 10 },
    watched: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const MovieModel = model<Movie>('Movie', movieSchema)
