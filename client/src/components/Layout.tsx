import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
    isActive
      ? 'bg-primary text-primary-foreground'
      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
  )

export function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <nav className="mx-auto flex max-w-5xl items-center gap-2 p-4">
          <span className="mr-4 text-lg font-semibold">Watchlist</span>
          <NavLink to="/all-movies" className={navLinkClass}>
            All Movies
          </NavLink>
          <NavLink to="/add-movie" className={navLinkClass}>
            Add Movie
          </NavLink>
          <NavLink to="/search-movies" className={navLinkClass}>
            Search Movies
          </NavLink>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl p-6">
        <Outlet />
      </main>
    </div>
  )
}
