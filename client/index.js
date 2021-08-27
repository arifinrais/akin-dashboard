import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Navbar from './components/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Rankings from './components/rankings/Rankings';

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
  </React.StrictMode>,
  document.getElementById('navbar')
);

var element = document.getElementById('dashboard');
if(typeof(element) != 'undefined' && element != null){
  ReactDOM.render(
    <React.StrictMode>
      <Dashboard />
    </React.StrictMode>,
    element
  );
}

element = document.getElementById('rankings');
if(typeof(element) != 'undefined' && element != null){
  ReactDOM.render(
    <React.StrictMode>
      <Rankings />
    </React.StrictMode>,
    element
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
