import React from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import CalendarPage from './components/pages/CalendarPage';
import MapPage from './components/pages/MapPage';
import CreateEventPage from './components/pages/CreateEventPage';
import SingleEventPage from "./components/pages/SingleEventPage";

//example event for single event page. REMOVE once single event connected to calendar
const exampleEvents =
  { startDate: '2021-01-03T09:45', 
    endDate: '2021-01-03T10:00', 
    title: 'Cry and Code',  
    description: `Ever feel so overwhelmed that you wanna break down. Well in this event, 
    you can do that and more. We rent our couches so you can cry on a comfortable surface. 
    It's okay if you just want to chill and cry with friends or use this time to improve
    your CS skills. As a pro-coder and crier, I use this event everyday. Sometimes we allow
    students to book their own room in advanced so if you wanted to blast Comftoratably
    Numb, we got you! Maybe your dog died or your partner broke up with you but you got an
    Assignment due in 12 hours. Don't worry we got professional yellers to motivate you!
    They will come into your private room and yell at you while you cry.`,
    location: 'Davis',
    sublocation: 'Spiegal Hall',
    organizer: 'Qianqian Feng'
  }

function App() {
  return(
    //Landing, Calendar, and Map Page
    <Router>
      <div className="App">
        <Route exact path="/" component={LandingPage}/>    
        <Route path="/calendar" component={CalendarPage}/>
        <Route path="/map" component={MapPage}/>
        <Route path="/createEvent" component={CreateEventPage}/>
        {/* single event. REMOVE route when conncted to calendar */}
        <Route 
          path="/singleEvent" 
          render={props => (
            <React.Fragment>
              <SingleEventPage 
              startDate={exampleEvents.startDate} 
              endDate={exampleEvents.endDate} 
              title ={exampleEvents.title} 
              description={exampleEvents.description}
              location={exampleEvents.location}
              sublocation={exampleEvents.sublocation}
              organizer={exampleEvents.organizer}
              />
            </React.Fragment>
          )}/> 
        <div><Link to="/">Landing</Link></div>
        <div><Link to="/calendar">Calendar</Link></div>
        <div><Link to="/map">Map</Link></div>
        <div><Link to="/createEvent">Create an Event</Link></div>
        <div><Link to="/singleEvent">Single Event</Link></div>
      </div>
    </Router>
  );
}

export default App;