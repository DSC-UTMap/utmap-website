import React, {useState} from "react";
import Paper from '@material-ui/core/Paper';
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

//example events REMOVE once the backend is connected
const exampleEvents = [
    { startDate: '2021-01-03T09:45', endDate: '2021-01-03T10:00', title: 'Cry and Code' },
    { startDate: '2021-01-27T12:00', endDate: '2021-01-29T13:30', title: 'Attend Andis Awesome Lecture' },
    { startDate: '2021-03-27T12:00', endDate: '2021-03-30T13:30', title: 'Get jacked' }
]


//Scheduler is the calendar, today, and taskbar components
function CalendarPage() { 
	const [openEventInfo, setOpenEventInfo] = useState(false);

	const handleOpenEventInfo = () => {
		setOpenEventInfo(true);
	}
	const handleCloseEventInfo = () => {
		setOpenEventInfo(false);
	}

	const CustomActionAppointment = (props) => {
		return (
			<Appointments.Appointment
				{...props}
				onClick={handleOpenEventInfo}
			/>
		);
	}

	return (
		<>
			<Paper>
			  <Scheduler data={exampleEvents}>
			  <ViewState />
			  <MonthView />
			  <Toolbar />
			  <DateNavigator />
			  <TodayButton />
			  <Appointments
					appointmentComponent={CustomActionAppointment}
				/>
			  </Scheduler>
			</Paper>
			{/* Popup box for event info */}
			<Dialog open={openEventInfo} onClose={handleCloseEventInfo}>
				{/* Placeholder for event popup box*/}
				<Paper>
					<p>Event information here</p>
				</Paper>
			</Dialog>
		</>
	);    
}

export default CalendarPage;
