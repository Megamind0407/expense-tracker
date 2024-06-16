import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GLobalStyle } from './styles/GlobalStyle';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GLobalStyle/>
    <App />
  </React.StrictMode>
);
