import React, { Component } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-CA");
const localizer = momentLocalizer(moment);

class CalendarPage extends Component {
    getStyle = () => {
        return {
            height: 700, //needs a strict height or flexbox to show month calendar
            padding: '20px',
        }
    }
    render() {
        return (
            <div style={this.getStyle()}>
                <Calendar 
                    localizer={localizer} 
                    defaultView='month'
                    step={60}
                    events={this.props.events} 
                    startAccessor="start" 
                    endAccessor="end" 
                    showMultiDayTimes  
                />
            </div>
        );
    }
}

export default CalendarPage;
