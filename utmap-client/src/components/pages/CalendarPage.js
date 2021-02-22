import React, {useCallback, useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
	Scheduler,
	MonthView,
	Toolbar,
	DateNavigator,
	Appointments,
	TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import ToolbarMaterial from '@material-ui/core/Toolbar';
import {
	Paper,
	Button,
	Dialog,
	Box,
	IconButton,
	AppBar,
	Typography,
} from '@material-ui/core';

import SingleEventPage from './SingleEventPage';
import CreateEventPage from './CreateEventPage';
import SideBar from "./SideBar";

import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import EventIcon from '@material-ui/icons/Event';
import clsx from 'clsx';

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

const useStyles = makeStyles(theme => ({
	spacing: 8,
	title:{
		flexGrow:1,
	},
	hide: {
		visibility: 'hidden'
	},
	buttonShape: {
		margin: theme.spacing(5),
		borderRadius: '5em',
	},
	paper: {
		marginLeft: theme.spacing(5),
		marginRight: theme.spacing(5),
		display: 'flex',
	},
}));

function provideCustomAppointment(openEventInfo) {
	//Curried component which overrides default event info popup
	return ((props) => {
		return (
			<Appointments.Appointment
				{...props}
				onClick={() => openEventInfo(props.data)}
				style={{
					backgroundColor: "#4f83cc"
				}}
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
			<AppBar position="relative" elevation={4} color='primary'>
				<ToolbarMaterial>
					<IconButton>
						<EventIcon style={{ color: '#ffffff' }} />
					</IconButton>
					<Typography variant="h6" className={classes.title} edge="start">
						Calendar
					</Typography>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						className={clsx(openDrawer && classes.hide)}
						>
						<MenuIcon />
					</IconButton>
				</ToolbarMaterial>
			</AppBar>
			<SideBar open={openDrawer} onClose={handleDrawerClose}></SideBar>


			<Box p={2} bgcolor="background"/>


			{/* Calendar */}
			<Paper className={classes.paper} elevation='3'>
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
				className={classes.buttonShape}
				variant='contained' 
				color='secondary'
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
