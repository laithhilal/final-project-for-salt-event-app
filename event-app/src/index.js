import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
      <Auth0Provider
        domain="dev-5kgys1rrk754w7tp.eu.auth0.com"
        clientId="Kk2dETmKzcU3gDhkaxZpfmLGUCc8KXym"
        redirectUri={window.location.origin}
        cacheLocation="localstorage"
      >
      <App />
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
