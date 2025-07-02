import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './styles/index.css'
import SparkBallButton from "./components/SparkBallButton";

function AppRoot() {
  return (
    <>
      <App />
      <SparkBallButton />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppRoot />); 