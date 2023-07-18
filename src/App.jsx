import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes, routes } from './routes'
import Layout from './layout'
import { JWTProvider } from './contexts/JWTContext'

function App() {
  return (
    <BrowserRouter>
      <JWTProvider>
        <Layout children={renderRoutes(routes)} />
      </JWTProvider>
    </BrowserRouter>
  )
}

export default App
