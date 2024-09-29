import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GlobalProvider, UserProvider, CalendarProvider } from './context';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CalendarProvider>
      <GlobalProvider>
        <UserProvider>
          <Router>
            <App />
          </Router>
        </UserProvider>
      </GlobalProvider>
    </CalendarProvider>
  </React.StrictMode>
);
