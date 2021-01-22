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
      { startDate: '2021-01-03T09:45', endDate: '2021-01-03T10:00', title: 'Cry and Code' },
      { startDate: '2021-01-27T12:00', endDate: '2021-01-29T13:30', title: 'Attend Andis Awesome Lecture' },
      { startDate: '2021-03-27T12:00', endDate: '2021-03-30T13:30', title: 'Get jacked' }
    ]
  }

  render(){
    return(
      //Landing, Calendar, and Map Page
      <Router>
        <div className="App">
          <Route exact path="/" component={LandingPage}/>    
          <Route 
            path="/calendar" 
            render={props => (
              <React.Fragment>
                <CalendarPage events={this.state.events} />
              </React.Fragment>
            )} 
          />
          <Route path="/map" component={MapPage}/>
          <div><Link to="/">Landing</Link></div>
          <div><Link to="/calendar">Calendar</Link></div>
          <div><Link to="/map">Map</Link></div>
        </div>
     </Router>
    )
  }
}

export default App;

