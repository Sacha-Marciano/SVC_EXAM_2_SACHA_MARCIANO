const fromEnv = import.meta.env.VITE_API_URL

export const API_URL: string = fromEnv ?? 'http://localhost:4000'
