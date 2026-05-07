import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
        <CardTitle>{movie.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm font-medium">{movie.genre}</p>
        <p className="text-sm text-muted-foreground">{movie.description}</p>
        {onDelete && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(movie._id)}
          >
            Delete Movie
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
