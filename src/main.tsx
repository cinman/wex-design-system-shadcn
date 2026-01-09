import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@wex/design-tokens'
import './index.css'
import App from './App.tsx'
import { initializeTheme } from '@/docs/utils/theme'

// Initialize theme before rendering to prevent flash
initializeTheme()

const basePath = import.meta.env.VITE_BASE_PATH || ''

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basePath}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
