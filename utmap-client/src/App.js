import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import CalendarPage from './components/pages/CalendarPage';
import MapPage from './components/pages/MapPage';

function App() {
  return(
    <Router>
      <div className="App">
        <Route exact path="/" component={LandingPage}/>    
        <Route path="/calendar" component={CalendarPage}/>
        <Route path="/map" component={MapPage}/>
      </div>
    </Router>         
  );
}

export default App;