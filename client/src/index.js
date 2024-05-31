// src/index.js

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals'; // Assurez-vous que ce fichier existe

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Si vous utilisez reportWebVitals, assurez-vous qu'il est bien configuré
reportWebVitals();