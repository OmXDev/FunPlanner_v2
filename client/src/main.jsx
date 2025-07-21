import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js';
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster
  position="top-right"
  toastOptions={{
    duration: 4000,
    style: {
      background: '#ffffff', 
      color: '#111827',    
      border: '1px solid #e5e7eb', 
      padding: '12px 16px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', 
    },
    success: {
      iconTheme: {
        primary: '#22c55e', 
        secondary: '#ffffff',
      },
    },
    error: {
      iconTheme: {
        primary: '#ef4444',
        secondary: '#ffffff',
      },
    },
  }}
/>

    </Provider>
  </StrictMode>,
)
