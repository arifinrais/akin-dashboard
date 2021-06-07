//import logo from './logo.svg';
import '../css/App.css';
import Navbar from './Navbar';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Nav } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Navbar/>
    </Router>
  );
}

export default App;
