import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import './bio.css'
import BioPage from './BioPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode><BioPage /></StrictMode>,
)
