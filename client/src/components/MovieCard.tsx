import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
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
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-none text-[10px] uppercase tracking-marquee text-muted-foreground opacity-0 transition-all duration-300 hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
              >
                Delete Movie
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-none border border-border bg-popover p-0 ring-0 sm:max-w-lg">
              <div className="film-strip h-1 w-full opacity-50" />
              <div className="space-y-6 px-8 pt-7 pb-2">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-marquee text-muted-foreground">
                  <span className="font-mono">No. {typeof index === 'number' ? String(index + 1).padStart(3, '0') : '—'}</span>
                  <span className="text-destructive">Delete · confirm</span>
                </div>
                <AlertDialogHeader className="space-y-4">
                  <AlertDialogTitle asChild>
                    <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-foreground sm:text-4xl">
                      Remove{' '}
                      <span className="italic text-primary">
                        &ldquo;{movie.title}&rdquo;
                      </span>
                      ?
                    </h2>
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm leading-relaxed text-muted-foreground">
                    This entry will be permanently struck from the catalog.
                    The reel cannot be rewound.
                  </AlertDialogDescription>
                </AlertDialogHeader>
              </div>
              <AlertDialogFooter className="m-0 flex-row items-stretch gap-0 rounded-none border-t border-border bg-transparent p-0">
                <AlertDialogCancel className="m-0 flex-1 rounded-none border-0 border-r border-border bg-transparent text-[11px] uppercase tracking-marquee text-muted-foreground hover:bg-muted/50 hover:text-foreground">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={() => onDelete(movie._id)}
                  className="m-0 flex-1 rounded-none bg-transparent text-[11px] uppercase tracking-marquee text-destructive hover:bg-destructive hover:text-foreground"
                >
                  Confirm Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </article>
  )
}
