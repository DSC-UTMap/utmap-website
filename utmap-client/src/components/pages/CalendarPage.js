import React, {useCallback, useState, useEffect} from "react";
import {isSameDay, addMinutes} from 'date-fns';
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
import EventList from '../EventList';

import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import EventIcon from '@material-ui/icons/Event';
import clsx from 'clsx';
import exampleEvents from '../data/EventData'; //Temporary dummy data


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
				//Don't do anything if event is grouped
				onClick={() => {openEventInfo(props.data)}}
				style={{
					backgroundColor: "#4f83cc"
				}}
			/>
		);
	});
}

const convertToCalendarEvent = (event) => {
	return ({
		title: event.name,
		startDate: event.startTime,
		endDate: event.endTime,
		id: event._id,
		building: event.building,
		room: event.room,
		description: event.description,
		organizer: event.organizer
	})
}

const convertToUTMapEvent = (event) => {
	return ({
		name: event.title,
		startTime: event.startDate,
		endTime: event.endDate,
		id: event._id,
		building: event.building,
		room: event.room,
		description: event.description,
		organizer: event.organizer
	})
}

const sortEvents = (events) => {
	events.sort((a, b) => {
		//sort by startTime, earliest to latest
		return (Date.parse(a.startTime) < Date.parse(b.startTime)) ? -1 : 1; 
	});
	return events; //Kind of wacky to return an array that was sorted in place
};

const groupEvents = (eventsList) => {
	//Groups events on the same day together if there are more than 3
	let count = 0;
	return eventsList.reduce((newList, event) => {
		event = convertToCalendarEvent(event);
		let lastElem = newList[newList.length - 1];
		if(newList.length === 0 || 
			!isSameDay(Date.parse(event.startDate), Date.parse(lastElem.startDate))) {
			newList.push(event);
			count = 1;
		} else if(count > 2) {//Turn the third event into a group
			let endDate = addMinutes(Date.parse(lastElem.startDate), 1);
			let group = lastElem.group ? lastElem.group : [lastElem];
			lastElem = { 
				title: `${count - 1}+ events`,
				startDate: lastElem.startDate,
				endDate: endDate.toLocaleString('en-US', { timeZone: 'America/New_York' }),
				isGroup: true,
				group:[...group, event],
			}
			newList[newList.length - 1] = lastElem;
			count++;
		} else {
			newList.push(event);
			count++;
		}
		return newList;
	}, []);	
}

//Init list outside component to prevent function calls every time it renders
const initEventsList = sortEvents(exampleEvents);
const initCalendarEvents = groupEvents(initEventsList);


//Scheduler is the calendar, today, and taskbar components
function CalendarPage() { 
	const [openEventForm, setOpenEventForm] = useState(false);
	const [openEventInfo, setOpenEventInfo] = useState(false);
	const [eventInfo, setEventInfo] = useState({});
	const [eventsList, setEventsList] = useState(initEventsList); //uses dummy data
	const [calendarEvents, setCalendarEvents] = useState(initCalendarEvents);
	const [groupedEvent, setGroupedEvent] = useState([]);
	const [openGroupedList, setOpenGroupedList] = useState(false);

	const handleOpenEventInfo = (data) => {
		//set data that will be passed into the event popup
		if(data.isGroup) {
			//Open a popup designed to display grouped events
			setGroupedEvent(data.group.map((event) => (
				convertToUTMapEvent(event)
			)));
			setOpenGroupedList(true);
		} else {
			//Singular event info popup
			setEventInfo({...data, organizer:(data.organizer ? data.organizer : 'Unknown')});
			setOpenEventInfo(true);
		}
	}
	const handleCloseEventInfo = () => {
		setOpenEventInfo(false);
	}

	const handleCloseGroupedList = () => {
		setOpenGroupedList(false);
	}

	const handleOpenEventForm = () => {
		setOpenEventForm(!openEventForm);
	}

	const addEvent = useCallback(eventData => {
		setEventsList(sortEvents([...eventsList, eventData]));
	}, [eventsList]);

	useEffect(() => {
		//Update calendarEvents whenever eventsList is updated
		setCalendarEvents(groupEvents(eventsList));
	}, [eventsList]);

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

			<Box p={2} bgcolor="background"/>

			<SideBar open={openDrawer} onClose={handleDrawerClose} events={eventsList}/>

			{/* Calendar */}
			<Paper className={classes.paper} elevation='3'>
				<Scheduler data={calendarEvents}>
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
					name={eventInfo.title}
					startTime={eventInfo.startDate}
					endTime={eventInfo.endDate}
					description={eventInfo.description}
					building={eventInfo.building}
					room={eventInfo.room}
					organizer={eventInfo.organizer}
					closePopup={handleCloseEventInfo}
				/>
			</Dialog>

			{/* Popup box for grouped event info */}
			<Dialog open={openGroupedList} onClose={handleCloseGroupedList}>
				<EventList eventList={groupedEvent}/>
			</Dialog>
		</>
	);    
}

export default CalendarPage;
