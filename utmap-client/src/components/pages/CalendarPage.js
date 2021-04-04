import React, {useCallback, useState, useEffect} from "react";
import {isSameDay, addMinutes, startOfToday} from 'date-fns';
import AddIcon from '@material-ui/icons/Add';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
	DayView,
	WeekView,
	ViewSwitcher,
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
	Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import SingleEventPage from './SingleEventPage';
import EventFormPage from './EventFormPage';
import SideBar from "./SideBar";
import EventList from '../EventList';

import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import EventIcon from '@material-ui/icons/Event';
import clsx from 'clsx';
import {getAllEvents} from '../../requests';
import { deleteEvent } from '../../requests'

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
  
const convertEvent = event => { //Server => Calendar
	return {
		_id: event._id,
		title: event.name,
		organizer: event.organizer,
		startDate: event.startTime,
		endDate: event.endTime,
		location: event.building.name,
		sublocation: event.room,
		description: event.description,
		tags: event.tags,
	};
};

const sortEvents = (events) => {
	events.sort((a, b) => {
		//sort by startDate, earliest to latest
		return (Date.parse(a.startDate) < Date.parse(b.startDate)) ? -1 : 1; 
	});
	return events; //Kind of wacky to return an array that was sorted in place
};

const groupEvents = (eventsList) => {
	//Groups events on the same day together if there are more than 3
	let count = 0;
	return eventsList.reduce((newList, event) => {
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

function filterPastEvents(events, date=startOfToday()) {
	//Filters out events that end before {date}
	return events.filter(event => {
		return Date.parse(event.endDate) >= Date.parse(date);
	});
}

//Scheduler is the calendar, today, and taskbar components
function CalendarPage() { 
	const [openEventForm, setOpenEventForm] = useState(false);
	const [openEventInfo, setOpenEventInfo] = useState(false);
	const [eventInfo, setEventInfo] = useState({});
	const [editingEvent, setEditingEvent] = useState({});
	const [eventsList, setEventsList] = useState([]);
	const [calendarEvents, setCalendarEvents] = useState([]);
	const [sidebarEvents, setSidebarEvents] = useState([]);
	const [groupedEvent, setGroupedEvent] = useState([]);
	const [openGroupedList, setOpenGroupedList] = useState(false);
	const [openSnackBar500, setOpenSnackBar500] = useState(false);
	const [openSnackBar400, setOpenSnackBar400] = useState(false);

	//Get the list of events
	useEffect(() => {
		getAllEvents().then(events => {
			const tempEvents = events.map(convertEvent);
			setEventsList(sortEvents(tempEvents));
			//Note: calendarEvents has its own useEffect to update
		}, err => handleOpenSnackBar500());
	}, []);

	const handleOpenEventInfo = (data) => {
		//set data that will be passed into the event popup
		if(data.isGroup) {
			//Open a popup designed to display grouped events
			setGroupedEvent(data.group);
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
		setOpenEventForm(true);
	}

	const handleCloseEventForm = () => {
		setOpenEventForm(false);
		setEditingEvent({});
	}

	const handleEditEventForm = (event) => {
		setEditingEvent(event);
		setOpenEventInfo(false);
		setOpenEventForm(true);
	}

	const refreshEvents = () => {
		window.location.reload();
	}

	useEffect(() => {
		//Update separate events lists whenever eventsList is updated
		setCalendarEvents(groupEvents(eventsList));
		setSidebarEvents(filterPastEvents(eventsList));
	}, [eventsList]);

	const editEvent = useCallback(editedEvent => {
		const withoutEdited = eventsList.filter(event => 
			event._id !== editedEvent._id);
		setEventsList([...withoutEdited, editedEvent]);
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

	function handleOpenSnackBar400() {
		setOpenSnackBar400(true);
	};
	
	function handleCloseSnackBar400(reason) {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackBar400(false);
	};
	
	const handleOpenSnackBar500 = () => {
		setOpenSnackBar500(true);
	};
	
	const handleCloseSnackBar500 = (reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackBar500(false);
	};

	async function handleDelete(id) {
		try {
			deleteEvent(id).then(
				res => { refreshEvents(); }, 
				err => {
					if (err >= 500) { handleOpenSnackBar500(); }
					else if (err >= 400 && err < 500) { handleOpenSnackBar400(); }
				});
			} 
		catch(e) {
			console.log(e);
		}
	}

	const errorCallback = useCallback((err) => {
		if (err >= 500) { handleOpenSnackBar500(); }
		else if (err >= 400 && err < 500) { handleOpenSnackBar400(); }
	},[]);

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

			<SideBar open={openDrawer} onClose={handleDrawerClose} events={sidebarEvents}/>

			{/* Calendar */}
			<Paper className={classes.paper} elevation={3}>
				<Scheduler data={calendarEvents}>
				<ViewState defaultCurrentViewName="Month"/>
				<MonthView />
				<Toolbar />
				<MonthView />
				<WeekView 
					startDayHour={7}
					endDayHour={21}
					cellDuration={60}
				/>
				<DayView 
					startDayHour={7}
					endDayHour={21}
					cellDuration={60}
				/>
				<ViewSwitcher />
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
				onClose={handleCloseEventForm}
				disableBackdropClick
      			disableEscapeKeyDown>
				<EventFormPage 
					onClose={handleCloseEventForm} 
					refreshEvents={refreshEvents}
					editEvent={editEvent}
					event={editingEvent}
					errorCallback={errorCallback}
				/>
			</Dialog>

			{/* Popup box for event info */}
			<Dialog open={openEventInfo} onClose={handleCloseEventInfo}>
				<SingleEventPage
					event={eventInfo}
					closePopup={handleCloseEventInfo}
					handleEdit={handleEditEventForm}
					handleDelete={handleDelete}
				/>
			</Dialog>

			{/* Popup box for grouped event info */}
			<Dialog open={openGroupedList} onClose={handleCloseGroupedList}>
				<EventList eventList={groupedEvent}/>
			</Dialog>

			{/* Error Handling snackbars */}
			<Snackbar open={openSnackBar500} autoHideDuration={4000} onClose={handleCloseSnackBar500}>
        		<Alert elevation={6} variant="filled"  onClose={handleCloseSnackBar500} severity="error">
					500 ERROR: Try again later!
				</Alert>
      		</Snackbar>

			<Snackbar open={openSnackBar400} autoHideDuration={4000} onClose={handleCloseSnackBar400}>
        		<Alert elevation={6} variant="filled"  onClose={handleCloseSnackBar400} severity="error">
          			400 ERROR: Missing values! Change Form.
				</Alert>
      		</Snackbar>
		</>
	);    
}

export default CalendarPage;
