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

  return (
    <div className="space-y-12">
      <PageHeader count={movies.length} loading={loading} />

      {loading && (
        <div className="space-y-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-12 border-b border-border/60 py-8"
            >
              <Skeleton className="h-3 w-6" />
              <div className="space-y-3">
                <Skeleton className="h-9 w-3/5" />
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <Skeleton className="h-8 w-24" />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="border-l-2 border-destructive/60 bg-destructive/5 px-6 py-5 text-sm text-destructive">
          Failed to load — {error}
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="border border-dashed border-border/80 px-12 py-20 text-center">
          <p className="font-display text-2xl italic text-muted-foreground">
            The reel is empty.
          </p>
          <p className="mt-3 text-[10px] uppercase tracking-marquee text-muted-foreground">
            Add your first feature from the Add Movie tab
          </p>
        </div>
      )}

      {!loading && movies.length > 0 && (
        <section className="border-t border-border/60">
          {movies.map((m, i) => (
            <div
              key={m._id}
              className="fade-up"
              style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
            >
              <MovieCard movie={m} index={i} onDelete={handleDelete} />
            </div>
          ))}
        </section>
      )}
    </div>
  )
}

function PageHeader({ count, loading }: { count: number; loading: boolean }) {
  return (
    <header className="grid grid-cols-1 gap-6 border-b border-border/60 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-marquee text-muted-foreground">
          <span className="font-mono">Vol. I</span>
          <span className="h-px w-8 bg-border" />
          <span>The Collection</span>
        </div>
        <h1 className="font-display text-6xl font-light leading-[0.95] tracking-tight text-foreground lg:text-8xl">
          All <span className="italic text-primary">Movies</span>
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          A running catalog of every title in rotation. Curated, indexed, and ready for the
          projector.
        </p>
      </div>
      <div className="flex flex-col items-start gap-1 lg:items-end">
        <span className="text-[10px] uppercase tracking-marquee text-muted-foreground">
          Total Entries
        </span>
        <span className="font-display text-5xl font-light tabular-nums text-primary">
          {loading ? '—' : String(count).padStart(2, '0')}
        </span>
      </div>
    </header>
  )
}
