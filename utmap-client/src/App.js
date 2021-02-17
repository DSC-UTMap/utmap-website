import React from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import CalendarPage from './components/pages/CalendarPage';
import MapPage from './components/pages/MapPage';
import EventListPage from './components/pages/EventListPage'

function App() {
  return(
    <Router>
      <div className="App">
        <Route exact path="/" component={LandingPage}/>    
        <Route path="/calendar" component={CalendarPage}/>
        <Route path="/map" component={MapPage}/>
        {/* event list example page. Remove route when added to sidebar */}
        <Route path="/eventlist" component={EventListPage}/>
    
        <div><Link to="/">Landing</Link></div>
        <div><Link to="/calendar">Calendar</Link></div>
        <div><Link to="/map">Map</Link></div>
        <div><Link to="/eventlist">Event List</Link></div>
      </div>
    </Router>         
  );
}

export default App;