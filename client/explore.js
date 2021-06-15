import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Navbar from './components/Navbar';
import Dashboard from './components/dashboard/Dashboard';

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
  </React.StrictMode>,
  document.getElementById('navbar')
);

ReactDOM.render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>,
  document.getElementById('dashboard')
);