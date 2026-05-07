export interface Movie {
  _id: string
  title: string
  genre: string
  description: string
  year: number
  director: string
  rating: number
  watched: boolean
  createdAt?: string
  updatedAt?: string
}
