import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative px-1 py-2 text-[11px] uppercase tracking-marquee transition-colors duration-300',
    isActive
      ? 'text-primary'
      : 'text-muted-foreground hover:text-foreground'
  )

export function Layout() {
  return (
    <div className="min-h-screen text-foreground">
      <header className="relative border-b border-border/60">
        <div className="film-strip h-1.5 w-full opacity-50" />
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-6">
          <NavLink to="/all-movies" className="group flex items-baseline gap-2">
            <span className="font-display text-2xl font-light italic text-foreground transition-colors group-hover:text-primary">
              Sacha&rsquo;s
            </span>
            <span className="font-display text-2xl font-medium text-foreground transition-colors group-hover:text-primary">
              Watchlist
            </span>
          </NavLink>
          <div className="flex items-center gap-10">
            <NavLink to="/all-movies" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span className="font-mono">01</span>
                  <span className="ml-2">All Movies</span>
                  {isActive && (
                    <span className="absolute -bottom-px left-0 h-px w-full bg-primary" />
                  )}
                </>
              )}
            </NavLink>
            <NavLink to="/add-movie" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span className="font-mono">02</span>
                  <span className="ml-2">Add Movie</span>
                  {isActive && (
                    <span className="absolute -bottom-px left-0 h-px w-full bg-primary" />
                  )}
                </>
              )}
            </NavLink>
            <NavLink to="/search-movies" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  <span className="font-mono">03</span>
                  <span className="ml-2">Search Movies</span>
                  {isActive && (
                    <span className="absolute -bottom-px left-0 h-px w-full bg-primary" />
                  )}
                </>
              )}
            </NavLink>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-[1400px] px-8 py-16">
        <Outlet />
      </main>
      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 text-[10px] uppercase tracking-marquee text-muted-foreground">
          <span>Est. 2026</span>
          <span className="font-mono normal-case tracking-normal">— a sacha marciano production —</span>
          <span>No. 001</span>
        </div>
      </footer>
    </div>
  )
}
