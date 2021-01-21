import React, { Component } from "react";
//import { render } from "react-dom";
import BigCalendar from './components/BigCalendar'

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
      //sends the events from state to our BigCalendar
      <div className="container">
        <BigCalendar events={this.state.events} />
      </div>
    )
  }
}

export default App;
