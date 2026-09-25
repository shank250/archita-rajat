import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GuestProvider } from './context/GuestContext';
import { AudioProvider } from './context/AudioContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GuestProvider>
      <AudioProvider>
        <App />
      </AudioProvider>
    </GuestProvider>
  </React.StrictMode>
);
