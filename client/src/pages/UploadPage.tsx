import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { API_URL } from '@/lib/api'

interface FormState {
  title: string
  genre: string
  description: string
  year: string
  director: string
  rating: string
  watched: boolean
}

const initial: FormState = {
  title: '',
  genre: '',
  description: '',
  year: '',
  director: '',
  rating: '',
  watched: false,
}

const currentYear = new Date().getFullYear()

function validate(values: FormState): Partial<Record<keyof FormState, string>> {
  const errors: Partial<Record<keyof FormState, string>> = {}
  if (!values.title.trim()) errors.title = 'Title is required'
  if (!values.genre.trim()) errors.genre = 'Genre is required'
  if (!values.director.trim()) errors.director = 'Director is required'

  const year = Number(values.year)
  if (!values.year.trim()) errors.year = 'Year is required'
  else if (!Number.isInteger(year) || year < 1888 || year > currentYear + 5)
    errors.year = `Year must be between 1888 and ${currentYear + 5}`

  const rating = Number(values.rating)
  if (!values.rating.trim()) errors.rating = 'Rating is required'
  else if (Number.isNaN(rating) || rating < 0 || rating > 10)
    errors.rating = 'Rating must be between 0 and 10'

  return errors
}

export function UploadPage() {
  const navigate = useNavigate()
  const [values, setValues] = useState<FormState>(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitting, setSubmitting] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const v = validate(values)
    setErrors(v)
    if (Object.keys(v).length > 0) return

    setSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: values.title.trim(),
          genre: values.genre.trim(),
          description: values.description.trim(),
          year: Number(values.year),
          director: values.director.trim(),
          rating: Number(values.rating),
          watched: values.watched,
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? `HTTP ${res.status}`)
      }
      toast.success('Movie added')
      navigate('/')
    } catch (err) {
      toast.error((err as Error).message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Add a movie</h1>
        <p className="text-sm text-muted-foreground">Fill in the details below.</p>
      </div>

      <Field label="Title" error={errors.title}>
        <Input
          value={values.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="Inception"
        />
      </Field>

      <Field label="Genre" error={errors.genre}>
        <Input
          value={values.genre}
          onChange={(e) => update('genre', e.target.value)}
          placeholder="Sci-Fi"
        />
      </Field>

      <Field label="Director" error={errors.director}>
        <Input
          value={values.director}
          onChange={(e) => update('director', e.target.value)}
          placeholder="Christopher Nolan"
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Year" error={errors.year}>
          <Input
            type="number"
            value={values.year}
            onChange={(e) => update('year', e.target.value)}
            placeholder="2010"
          />
        </Field>
        <Field label="Rating (0-10)" error={errors.rating}>
          <Input
            type="number"
            step="0.1"
            value={values.rating}
            onChange={(e) => update('rating', e.target.value)}
            placeholder="8.8"
          />
        </Field>
      </div>

      <Field label="Description" error={errors.description}>
        <Textarea
          value={values.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="A short summary..."
          rows={4}
        />
      </Field>

      <div className="flex items-center gap-2">
        <Checkbox
          id="watched"
          checked={values.watched}
          onCheckedChange={(c) => update('watched', c === true)}
        />
        <Label htmlFor="watched">Already watched</Label>
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : 'Add movie'}
      </Button>
    </form>
  )
}

interface FieldProps {
  label: string
  error?: string
  children: React.ReactNode
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
