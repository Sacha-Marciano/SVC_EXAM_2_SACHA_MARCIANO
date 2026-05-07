import { useEffect, useState } from 'react'
import { MovieCard } from '@/components/MovieCard'
import { Skeleton } from '@/components/ui/skeleton'
import { API_URL } from '@/lib/api'
import type { Movie } from '@/types/movie'

export function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch(`${API_URL}/movies`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json() as Promise<Movie[]>
      })
      .then((data) => {
        if (!cancelled) setMovies(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  async function handleDelete(id: string) {
    const prev = movies
    setMovies((m) => m.filter((x) => x._id !== id))
    const res = await fetch(`${API_URL}/movies/${id}`, { method: 'DELETE' })
    if (!res.ok) setMovies(prev)
  }

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    )
  }

  if (error) {
    return <p className="text-destructive">Failed to load movies: {error}</p>
  }

  if (movies.length === 0) {
    return <p className="text-muted-foreground">No movies yet. Add one from the Add Movie page.</p>
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {movies.map((m) => (
        <MovieCard key={m._id} movie={m} onDelete={handleDelete} />
      ))}
    </div>
  )
}
