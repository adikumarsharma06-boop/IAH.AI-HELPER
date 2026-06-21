import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Register Progressive Web App Service Worker for client-side caching & offline installs
if ('serviceWorker' in navigator && (import.meta as any).env?.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('[IAH.AI PWA] Tactical offline overlay service worker registered successfully:', registration.scope);
      })
      .catch((error) => {
        console.error('[IAH.AI PWA] Service worker deployment fault:', error);
      });
  });
}

