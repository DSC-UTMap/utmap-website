import React, {useCallback, useState} from "react";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import CreateEventPage from './CreateEventPage';

//example events REMOVE once the backend is connected
const exampleEvents = [
    { startDate: '2021-01-03T09:45', endDate: '2021-01-03T10:00', title: 'Cry and Code' },
    { startDate: '2021-01-27T12:00', endDate: '2021-01-29T13:30', title: 'Attend Andis Awesome Lecture' },
    { startDate: '2021-03-27T12:00', endDate: '2021-03-30T13:30', title: 'Get jacked' }
]

//Scheduler is the calendar, today, and taskbar components
function CalendarPage() {
	const [openEventForm, setOpenEventForm] = useState(false);
	const [eventList, setEventList] = useState(exampleEvents);
	
	const handleCloseEventForm = () => {
		setOpenEventForm(false);
	}
	const handleOpenEventForm = () => {
		setOpenEventForm(true);
	}
	const addEvent = useCallback((eventData) => {
		setEventList([...eventList, eventData]);
		console.table(eventList);
	}, [eventList]);

	return (
		<>
		  <Paper>
		    <Scheduler data={eventList}>
		    <ViewState />
		    <MonthView />
		    <Toolbar />
		    <DateNavigator />
		    <TodayButton />
		    <Appointments />
		    </Scheduler>
		  </Paper>
			{/* Add event button */}
			<Button
				variant='contained' 
				color='primary'
				startIcon={<AddIcon/>}
				onClick={handleOpenEventForm}
			>
				Create
			</Button>
			<Dialog open={openEventForm} onClose={handleCloseEventForm}>
				<CreateEventPage onClose={handleCloseEventForm} addEvent={addEvent}/>
			</Dialog>
		</>
  );    
}

export default CalendarPage;
