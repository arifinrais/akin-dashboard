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

/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
  <React.StrictMode>
    <Tes />
  </React.StrictMode>,
  document.getElementById('tes')
)*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
