import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import ReactApp from './app'
import '@picocss/pico/css/pico.min.css'
import './index.css'

const root = document.getElementById('root')
if (!root) throw new Error('No HTMl-root for mounting react app detected.')
ReactDOM.createRoot(root).render(
  <StrictMode>
    <ReactApp />
  </StrictMode>
)
