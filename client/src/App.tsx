import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { MoviesPage } from '@/pages/MoviesPage'
import { UploadPage } from '@/pages/UploadPage'
import { SearchPage } from '@/pages/SearchPage'
import { Toaster } from '@/components/ui/sonner'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<MoviesPage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
