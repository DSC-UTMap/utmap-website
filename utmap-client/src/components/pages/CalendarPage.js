import React, { Component } from "react";
//import React from 'react'
import BigCalendar from '../BigCalendar'
//import ReactDOM from "react-dom"

class CalendarPage extends Component {
    render() {
        //const params = ReactDOM.findDOMNode(this.props.events);
        //const { events, match: {props} } = this.events;
        //console.log(params)
        return (
            //<p>Calendar</p>
            <div className="container">
                <BigCalendar events={this.props.events} />
            </div>
           
        )
    }
}

export default CalendarPage;
