import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { HelmetProvider } from 'react-helmet-async'
import { Suspense } from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
      <Suspense>
        <App />
      </Suspense>
  </HelmetProvider>,
)
