import * as React from 'react';
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
function CalendarPage(props) {
    return (
        <Paper>
            <Scheduler data={props.events}>
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

export default CalendarPage;
