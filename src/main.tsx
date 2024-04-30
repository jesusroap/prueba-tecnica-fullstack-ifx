// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { HelmetProvider } from 'react-helmet-async'
// import { BrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    {/* <BrowserRouter> */}
      <Suspense>
        <App />
      </Suspense>
    {/* </BrowserRouter> */}
  </HelmetProvider>,
)
