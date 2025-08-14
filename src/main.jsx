import React from 'react'
import ReactDOM from 'react-dom/client'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

function isAdminRoute() {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '/')
  const path = window.location.pathname
  const normalized = path.endsWith('/') ? path : path + '/'
  const adminPath = `${base}admin/`
  return normalized.endsWith('/admin/') || normalized.endsWith(adminPath)
}

async function bootstrap() {
  if (isAdminRoute()) {
    await import('./styles/admin-body.css')
    await import('./styles/Admin.css')
    const { default: Admin } = await import('./components/Admin')
    root.render(<Admin />)
  } else {
    await import('./styles/index.css')
    const { default: App } = await import('./components/App')
    const { default: SparkBallButton } = await import('./components/SparkBallButton')

    function AppRoot() {
      return (
        <>
          <App />
          <SparkBallButton />
        </>
      )
    }

    root.render(<AppRoot />)
  }
}

bootstrap() 