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

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Search</h1>
        <p className="text-sm text-muted-foreground">
          Type to search by title. Results update 500ms after you stop typing.
        </p>
      </div>

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies by title..."
        autoFocus
      />

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      )}

      {error && <p className="text-destructive">Search failed: {error}</p>}

      {!loading && !error && debounced.trim() && results.length === 0 && (
        <p className="text-muted-foreground">No matches for "{debounced.trim()}".</p>
      )}

      {!loading && results.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {results.map((m) => (
            <MovieCard key={m._id} movie={m} />
          ))}
        </div>
      )}
    </div>
  )
}
