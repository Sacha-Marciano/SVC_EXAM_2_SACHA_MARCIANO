import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { MovieCard } from '@/components/MovieCard'
import { useDebounce } from '@/hooks/useDebounce'
import { API_URL } from '@/lib/api'
import type { Movie } from '@/types/movie'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const debounced = useDebounce(query, 500)
  const [results, setResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const name = debounced.trim()
    if (!name) {
      setResults([])
      setLoading(false)
      setError(null)
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch(`${API_URL}/movies/search?name=${encodeURIComponent(name)}`, {
      signal: controller.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json() as Promise<Movie[]>
      })
      .then((data) => setResults(data))
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [debounced])

  const trimmed = debounced.trim()
  const isPending = query !== debounced && query.trim().length > 0

  return (
    <div className="space-y-12">
      {/* Big editorial header + input */}
      <header className="space-y-8 border-b border-border/60 pb-12">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-marquee text-muted-foreground">
          <span className="font-mono">03 / Index</span>
          <span className="h-px w-8 bg-border" />
          <span>Live Search</span>
        </div>
        <h1 className="font-display text-6xl font-light leading-[0.95] tracking-tight lg:text-8xl">
          Search <span className="italic text-primary">Movies</span>
        </h1>

        <div className="relative">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-marquee text-muted-foreground">
            ⌕
          </span>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a title…"
            autoFocus
            className="!h-20 border-0 border-b-2 border-border bg-transparent pl-8 pr-32 font-display !text-4xl tracking-tight !shadow-none placeholder:font-display placeholder:text-muted-foreground/30 focus-visible:border-primary focus-visible:ring-0 lg:!text-5xl"
          />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-marquee text-muted-foreground">
            {isPending ? (
              <span className="animate-pulse text-primary">— typing —</span>
            ) : trimmed ? (
              <span>
                <span className="text-primary">{results.length}</span> result
                {results.length === 1 ? '' : 's'}
              </span>
            ) : (
              <span>500ms debounce</span>
            )}
          </div>
        </div>
      </header>

      {loading && (
        <div className="space-y-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-12 border-b border-border/60 py-8"
            >
              <Skeleton className="h-3 w-6" />
              <div className="space-y-3">
                <Skeleton className="h-9 w-2/5" />
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div />
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="border-l-2 border-destructive/60 bg-destructive/5 px-6 py-5 text-sm text-destructive">
          Search failed — {error}
        </div>
      )}

      {!loading && !error && trimmed && results.length === 0 && (
        <div className="border border-dashed border-border/80 px-12 py-20 text-center">
          <p className="font-display text-2xl italic text-muted-foreground">
            Nothing in the index for &ldquo;{trimmed}&rdquo;.
          </p>
          <p className="mt-3 text-[10px] uppercase tracking-marquee text-muted-foreground">
            Try a different keyword
          </p>
        </div>
      )}

      {!loading && !error && !trimmed && (
        <div className="border-l-2 border-primary/40 px-6 py-4 text-[10px] uppercase tracking-marquee text-muted-foreground">
          Start typing to search the catalog by title.
        </div>
      )}

      {!loading && results.length > 0 && (
        <section>
          {results.map((m, i) => (
            <div
              key={m._id}
              className="fade-up"
              style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
            >
              <MovieCard movie={m} index={i} />
            </div>
          ))}
        </section>
      )}
    </div>
  )
}
