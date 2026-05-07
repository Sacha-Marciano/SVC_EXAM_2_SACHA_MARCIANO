import { Router, type Request, type Response } from 'express'
import { MovieModel } from '../models/movie.ts'
import type { MovieInput } from '../types/movie.ts'

const router = Router()

// GET /movies/search?name=...
router.get('/search', async (req: Request, res: Response) => {
  const name = String(req.query.name ?? '').trim()
  if (!name) {
    return res.status(400).json({ error: 'name query is required' })
  }
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const movies = await MovieModel.find({ title: { $regex: escaped, $options: 'i' } })
  res.json(movies)
})

// GET /movies
router.get('/', async (_req: Request, res: Response) => {
  const movies = await MovieModel.find().sort({ createdAt: -1 })
  res.json(movies)
})

// POST /movies
router.post('/', async (req: Request<unknown, unknown, MovieInput>, res: Response) => {
  try {
    const movie = await MovieModel.create(req.body)
    res.status(201).json(movie)
  } catch (err) {
    res.status(400).json({ error: (err as Error).message })
  }
})

// DELETE /movies/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const deleted = await MovieModel.findByIdAndDelete(req.params.id)
  if (!deleted) return res.status(404).json({ error: 'movie not found' })
  res.json({ ok: true })
})

export default router
