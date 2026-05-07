import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Movie } from '@/types/movie'

interface Props {
  movie: Movie
  onDelete?: (id: string) => void
}

export function MovieCard({ movie, onDelete }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle>{movie.title}</CardTitle>
            <CardDescription>
              {movie.director} · {movie.year}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="secondary">{movie.genre}</Badge>
            {movie.watched && <Badge>Watched</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{movie.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">⭐ {movie.rating.toFixed(1)}</span>
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(movie._id)}
            >
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
