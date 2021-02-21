import React, {useCallback, useState} from "react";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
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
import CreateEventPage from './CreateEventPage';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideBar from "./SideBar";
import clsx from 'clsx';
import SingleEventPage from './SingleEventPage';

import EventView from '../EventView';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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

const ExternalViewSwitcher = ({
	currentViewName,
	onChange,
  }) => (
	<RadioGroup
	  aria-label="Views"
	  style={{ flexDirection: 'row' }}
	  name="views"
	  value={currentViewName}
	  onChange={onChange}
	>
	  <FormControlLabel value="Week" control={<Radio />} label="Week" />
	  <FormControlLabel value="Month" control={<Radio />} label="Month" />
	  <FormControlLabel value="Events" control={<Radio />} label="Events" /> 
	  <FormControlLabel value="Day" control={<Radio />} label="Day" />
	</RadioGroup>
  );

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

	const [currentViewName, setCurrentViewName] = useState('Month');
	const currentViewNameChange = (e) => {
		setCurrentViewName(e.target.value);
	}
	console.log(currentViewName);
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
				<SideBar open={openDrawer} onClose={handleDrawerClose}></SideBar>
			</div>
			<ExternalViewSwitcher
				currentViewName={currentViewName}
				onChange={currentViewNameChange}
       		 />
			{/* Calendar */}
			<Paper>
				<Scheduler data={eventList}>
				<ViewState currentViewName={currentViewName}/>
				<Toolbar />
				<MonthView />
				<WeekView 
					startDayHour={7}
					endDayHour={21}
					cellDuration={60}
				/>
				<EventView 
					name="Events"
				/>
				<DayView 
					startDayHour={7}
					endDayHour={21}
					cellDuration={60}
				/>

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
