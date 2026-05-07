export interface Movie {
  title: string
  genre: string
  description: string
  year?: number
  director?: string
  rating?: number
  watched?: boolean
}

export type MovieInput = Movie
