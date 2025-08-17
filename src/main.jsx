import React from 'react'
import ReactDOM from 'react-dom/client'

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

// Removed isAdminRoute logic

async function bootstrap() {
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

bootstrap() 