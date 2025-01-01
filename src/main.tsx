import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);

if (import.meta.env.PROD) {
  // Prepare MSW in a Service Worker
  import('../mocks/browser')
    .then(({ worker }) => {
      worker.start();
    })
    // Launched mock server, and then start client React app
    .then(() => root.render(<App />));
} else {
  // Production
  root.render(<App />);
}
