import React, { Component } from "react";
//import { render } from "react-dom";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import CalendarPage from './components/pages/CalendarPage';
import MapPage from './components/pages/MapPage';


class App extends Component{
  //example events REMOVE once the backend is connected
  state = {
    events: [
      {
        id: 0,
        title: 'First Event',
        start: new Date('2021-01-23 00:00'),
        end: new Date('2021-01-23 01:00'),
      },
      {
        id: 1,
        title: 'Second Event',
        start: new Date('2021-01-30 00:00'),
        end: new Date('2021-01-31 01:00'),
      },
      {
        id: 2,
        title: 'Third Event',
        start: new Date('2021-03-01 00:00'),
        end: new Date('2021-03-01 15:00'),
      }
    ]
  }

  render(){
    return(
      <Router>
        <div className="App">
          <Route exact path="/" component={LandingPage}/>
          <Route 
            path="/calendar" 
            render={props => (
              <CalendarPage {...props} events={this.state.events} />
            )} 
          />
          <Route path="/map" component={MapPage}/>
          <div><Link to="/">Landing</Link></div>
          <div><Link to="/calendar">Calendar</Link></div>
          <div><Link to="/map">Map</Link></div>
        </div>
     </Router>
      //sends the events from state to our BigCalendar
    )
  }
}

export default App;

