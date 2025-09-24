import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryProvider } from './app/providers/QueryProvider'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/routes/router'
import LoadingSpinner from './components/layout/LoadingSpinner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryProvider>
  </StrictMode>,
)
