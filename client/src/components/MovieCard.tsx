import { Button } from '@/components/ui/button'
import type { Movie } from '@/types/movie'

interface Props {
  movie: Movie
  index?: number
  onDelete?: (id: string) => void
}

export function MovieCard({ movie, index, onDelete }: Props) {
  return (
    <article className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-8 border-b border-border/60 py-8 transition-colors hover:bg-card/40 sm:gap-12 sm:px-4">
      {/* index column */}
      <div className="flex flex-col items-end gap-1 self-start pt-2 font-mono text-[10px] uppercase tracking-marquee text-muted-foreground">
        <span className="text-primary">●</span>
        {typeof index === 'number' && (
          <span>{String(index + 1).padStart(2, '0')}</span>
        )}
      </div>

      {/* main content */}
      <div className="min-w-0 space-y-3">
        <div className="flex items-baseline gap-4">
          <h3 className="font-display text-3xl font-medium leading-tight text-foreground transition-colors group-hover:text-primary sm:text-4xl">
            {movie.title}
          </h3>
        </div>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-marquee text-primary">
          <span className="h-px w-8 bg-primary/60" />
          <span>{movie.genre}</span>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {movie.description || (
            <span className="italic opacity-60">— no description —</span>
          )}
        </p>
      </div>

      {/* action column */}
      <div className="flex items-center self-start pt-2">
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(movie._id)}
            className="text-[10px] uppercase tracking-marquee text-muted-foreground opacity-0 transition-all duration-300 hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
          >
            Delete Movie
          </Button>
        )}
      </div>
    </article>
  )
}
