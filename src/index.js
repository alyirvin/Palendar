import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GlobalProvider } from './context';
import { UserProvider } from './context';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    </GlobalProvider>
  </React.StrictMode>
);
