import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { API_URL } from '@/lib/api'

export function UploadPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [generating, setGenerating] = useState(false)

  function getError(): string | null {
    if (title.length < 1) return 'Title is required (at least 1 character).'
    if (title.length > 20) return 'Title must be at most 20 characters.'
    if (genre.length < 1) return 'Genre is required (at least 1 character).'
    if (description.length > 200) return 'Description must be at most 200 characters.'
    return null
  }

  async function handleGenerate() {
    if (!title.trim() || !genre.trim()) {
      alert('Please fill in title and genre first.')
      return
    }
    setGenerating(true)
    try {
      const res = await fetch(`${API_URL}/movies/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, genre }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? `HTTP ${res.status}`)
      }
      const data = (await res.json()) as { description: string }
      setDescription(data.description)
    } catch (err) {
      alert((err as Error).message)
    } finally {
      setGenerating(false)
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const error = getError()
    if (error) {
      alert(error)
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, genre, description }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? `HTTP ${res.status}`)
      }
      navigate('/all-movies')
    } catch (err) {
      alert((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
      {/* Left: editorial heading column */}
      <aside className="space-y-6 lg:sticky lg:top-12 lg:self-start">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-marquee text-muted-foreground">
          <span className="font-mono">02 / Submission</span>
        </div>
        <h1 className="font-display text-6xl font-light leading-[0.95] tracking-tight text-foreground lg:text-7xl">
          Add a <span className="italic text-primary">movie</span>
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Submit a new title to the collection. Title and genre are required;
          description can be drafted by hand or generated for you.
        </p>
        <div className="space-y-2 border-t border-border/60 pt-6 text-[10px] uppercase tracking-marquee text-muted-foreground">
          <div className="flex justify-between">
            <span>Title</span>
            <span className="font-mono">1—20 chars</span>
          </div>
          <div className="flex justify-between">
            <span>Genre</span>
            <span className="font-mono">≥ 1 char</span>
          </div>
          <div className="flex justify-between">
            <span>Description</span>
            <span className="font-mono">≤ 200 chars</span>
          </div>
        </div>
      </aside>

      {/* Right: form */}
      <form onSubmit={handleSubmit} className="space-y-10">
        <FieldRow
          label="Title"
          counter={`${title.length}/20`}
          warn={title.length > 20}
        >
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Stalker"
            className="!h-14 border-0 border-b border-border bg-transparent px-0 font-display !text-3xl tracking-tight !shadow-none placeholder:text-muted-foreground/40 focus-visible:border-primary focus-visible:ring-0"
          />
        </FieldRow>

        <FieldRow label="Genre" counter={genre ? '✓' : ''}>
          <Input
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="e.g. Science Fiction"
            className="!h-12 border-0 border-b border-border bg-transparent px-0 !text-lg !shadow-none placeholder:text-muted-foreground/40 focus-visible:border-primary focus-visible:ring-0"
          />
        </FieldRow>

        <FieldRow
          label="Description"
          counter={`${description.length}/200`}
          warn={description.length > 200}
        >
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short logline, or generate one →"
            className="!h-12 border-0 border-b border-border bg-transparent px-0 !text-base !shadow-none placeholder:text-muted-foreground/40 focus-visible:border-primary focus-visible:ring-0"
          />
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-marquee text-primary transition-opacity hover:opacity-70 disabled:opacity-40"
          >
            <span className={generating ? 'animate-pulse' : ''}>✦</span>
            <span>{generating ? 'Generating…' : 'Generate with AI'}</span>
          </button>
        </FieldRow>

        <div className="flex items-center gap-6 border-t border-border/60 pt-8">
          <Button
            type="submit"
            disabled={submitting}
            className="h-12 rounded-none px-10 text-[11px] uppercase tracking-marquee"
          >
            {submitting ? 'Submitting…' : 'Add Movie'}
          </Button>
          <span className="text-[10px] uppercase tracking-marquee text-muted-foreground">
            Press to file in the catalog
          </span>
        </div>
      </form>
    </div>
  )
}

interface FieldRowProps {
  label: string
  counter?: string
  warn?: boolean
  children: React.ReactNode
}

function FieldRow({ label, counter, warn, children }: FieldRowProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label className="text-[10px] uppercase tracking-marquee text-muted-foreground">
          {label}
        </label>
        {counter && (
          <span
            className={
              warn
                ? 'font-mono text-[10px] text-destructive'
                : 'font-mono text-[10px] text-muted-foreground'
            }
          >
            {counter}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
