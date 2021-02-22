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
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideBar from "./SideBar";
import clsx from 'clsx';
import SingleEventPage from './SingleEventPage';
import exampleEvents from '../data/EventData'; //Temporary dummy data


const useStyles = makeStyles(theme => ({
	hide: {
    	display: 'none',
	},
}));

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
		{});
	const [eventList, setEventList] = useState(exampleEvents); //uses dummy data

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

	//Siderbar functions and variables
	const classes = useStyles();
	const [openDrawer, setOpenDrawer] = useState(false);
	
	const handleDrawerOpen = () => {
		setOpenDrawer(true);
	};	
	const handleDrawerClose = () => {
		setOpenDrawer(false);
	};

	return (
		<>
			{/* Sidebar */}
			<div align="right">
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="end"
					onClick={handleDrawerOpen}
					className={clsx(openDrawer && classes.hide)}
					alignment="right"
					>
					<MenuIcon />
				</IconButton>
				<SideBar open={openDrawer} onClose={handleDrawerClose} events={eventList}/>
			</div>

			{/* Calendar */}
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
			<Dialog 
				open={openEventForm} 
				onClose={handleOpenEventForm}
				disableBackdropClick
      	disableEscapeKeyDown>
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
