import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom' // <-- Importez BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Enveloppez votre application avec BrowserRouter */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)