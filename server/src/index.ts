import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './db.ts'
import moviesRouter from './routes/movies.ts'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/movies', moviesRouter)

const PORT = Number(process.env.PORT ?? 4000)
const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  console.error('MONGO_URI is not set in .env')
  process.exit(1)
}

connectDB(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err)
    process.exit(1)
  })
