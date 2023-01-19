import React from 'react'
import ReactDOM from 'react-dom/client'
import {AppContainer} from './components/app-container'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>,
)
