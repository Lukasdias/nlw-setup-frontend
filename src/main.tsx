import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppContainer } from './components/app-container';
import { Routes } from './components/routes';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);
