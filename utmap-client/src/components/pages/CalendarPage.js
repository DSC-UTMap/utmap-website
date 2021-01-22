import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';

//Scheduler is the calendar, today, and taskbar components
class CalendarPage extends Component {
    //example events REMOVE once the backend is connected
    state = {
        events: [
            { startDate: '2021-01-03T09:45', endDate: '2021-01-03T10:00', title: 'Cry and Code' },
            { startDate: '2021-01-27T12:00', endDate: '2021-01-29T13:30', title: 'Attend Andis Awesome Lecture' },
            { startDate: '2021-03-27T12:00', endDate: '2021-03-30T13:30', title: 'Get jacked' }
        ]
    }

    render () {
        const { events } = this.state;
        return (
            <Paper>
                <Scheduler data={events}>
                <ViewState />
                <MonthView />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <Appointments />
                </Scheduler>
            </Paper>
        );
    }
    

    
}

export default CalendarPage;
