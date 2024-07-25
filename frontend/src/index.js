import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GLobalStyle } from './styles/GlobalStyle';
import { GlobalProvider } from './context/globalContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GLobalStyle/>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
