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
import SingleEventPage from './SingleEventPage';

//example events REMOVE once the backend is connected
const exampleEvents = [
	{ startDate: '2021-01-03T09:45', 
	endDate: '2021-01-03T10:00', 
	title: 'Cry and Code',  
	description: `Ever feel so overwhelmed that you wanna break down. Well in this event, 
	you can do that and more. We rent our couches so you can cry on a comfortable surface. 
	It's okay if you just want to chill and cry with friends or use this time to improve
	your CS skills. As a pro-coder and crier, I use this event everyday. Sometimes we allow
	students to book their own room in advanced so if you wanted to blast Comfortably
	Numb, we got you! Maybe your dog died or your partner broke up with you but you got an
	Assignment due in 12 hours. Don't worry we got professional yellers to motivate you!
	They will come into your private room and yell at you while you cry.`,
	location: 'Davis',
	sublocation: 'Spiegal Hall',
	organizer: 'Qianqian Feng'
	},
	{ startDate: '2021-01-27T12:00', endDate: '2021-01-29T13:30', title: 'Attend Andis Awesome Lecture' },
	{ startDate: '2021-03-27T12:00', endDate: '2021-03-30T13:30', title: 'Get jacked' }
]

function provideCustomAppointment(openEventInfo) {
	//Curried component which overrides default event info popup
	return ((props) => {
		return (
			<Appointments.Appointment
				{...props}
				onClick={() => openEventInfo(props.data)}
			/>
		);
	});
}

//Scheduler is the calendar, today, and taskbar components
function CalendarPage() { 
	const [openEventForm, setOpenEventForm] = useState(false);
	const [openEventInfo, setOpenEventInfo] = useState(false);
	const [eventInfo, setEventInfo] = useState(
		{ startDate: '2021-01-03T09:45', endDate: '2021-01-03T10:00', title: 'Blank' });
	const [eventList, setEventList] = useState(exampleEvents);

	const handleOpenEventInfo = (data) => {
		//set data that will be passed into the event popup
		setEventInfo({...data, organizer:(data.organizer ? data.organizer : 'Unknown')});
		setOpenEventInfo(true);
	}
	const handleCloseEventInfo = () => {
		setOpenEventInfo(false);
	}
	const handleOpenEventForm = () => {
		setOpenEventForm(!openEventForm);
	}

	const addEvent = useCallback((eventData) => {
		setEventList([...eventList, eventData]);
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
			  <Appointments
					appointmentComponent={provideCustomAppointment(handleOpenEventInfo)}
				/>
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
			
			{/* Popup box for event form */}
			<Dialog open={openEventForm} onClose={handleOpenEventForm}>
				<CreateEventPage onClose={handleOpenEventForm} addEvent={addEvent}/>
			</Dialog>

			{/* Popup box for event info */}
			<Dialog open={openEventInfo} onClose={handleCloseEventInfo}>
				<SingleEventPage
					title={eventInfo.title}
					startDate={eventInfo.startDate}
					endDate={eventInfo.endDate}
					description={eventInfo.description}
					location={eventInfo.location}
					sublocation={eventInfo.sublocation}
					organizer={eventInfo.organizer}
					closePopup={handleCloseEventInfo}
				/>
			</Dialog>
		</>
	);    
}

export default CalendarPage;
