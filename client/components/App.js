//import logo from './logo.svg';
import '../css/App.css';
import AkinNavbar from './AkinNavbar';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <AkinNavbar/>
    </Router>
  );
}

export default App;
