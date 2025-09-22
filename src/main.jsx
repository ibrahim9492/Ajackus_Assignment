import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
ReactDOM.createRoot(document.getElementById('root')).render(
 <ThemeProvider>
      <UserProvider>
        <Router>
    <App />

    </Router>
      </UserProvider>
    </ThemeProvider>
);