import React from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import CalendarPage from './components/pages/CalendarPage';
import MapPage from './components/pages/MapPage';

function App() {
  return(
    //Landing, Calendar, and Map Page
    <Router>
      <div className="App">
        <Route exact path="/" component={LandingPage}/>    
        <Route path="/calendar" component={CalendarPage}/>
        <Route path="/map" component={MapPage}/>
        <div><Link to="/">Landing</Link></div>
        <div><Link to="/calendar">Calendar</Link></div>
        <div><Link to="/map">Map</Link></div>
      </div>
    </Router>
  );
}

export default App;