import { render } from 'preact'
import { App } from './app'
import '@picocss/pico/css/pico.min.css'
import './index.css'

render(<App />, document.getElementById('app')!)
