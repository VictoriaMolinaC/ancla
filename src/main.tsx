import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ensureFirstUsedDate } from './db/init'
import { seedDatabaseIfEmpty } from './db/seed'

Promise.all([seedDatabaseIfEmpty(), ensureFirstUsedDate()]).finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
