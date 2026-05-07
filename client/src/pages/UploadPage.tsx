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
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold">Add Movie</h1>

      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Movie title"
      />

      <Input
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Genre"
      />

      <div className="space-y-2">
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleGenerate}
          disabled={generating}
        >
          {generating ? 'Generating...' : '✨ Generate description with AI'}
        </Button>
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Adding...' : 'Add Movie'}
      </Button>
    </form>
  )
}
