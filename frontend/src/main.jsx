import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserContextProvider } from './context/UserContext.jsx'
import { OnlineStaffContextProvider } from './context/OnlineStaffContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <OnlineStaffContextProvider>
        <App />
      </OnlineStaffContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
