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

//example events REMOVE once the backend is connected
const exampleEvents = [
    { startDate: '2021-01-03T09:45', endDate: '2021-01-03T10:00', title: 'Cry and Code' },
    { startDate: '2021-01-27T12:00', endDate: '2021-01-29T13:30', title: 'Attend Andis Awesome Lecture' },
    { startDate: '2021-03-27T12:00', endDate: '2021-03-30T13:30', title: 'Get jacked' }
]

const useStyles = makeStyles(theme => ({
    hide: {
      display: 'none',
    },
  }));

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
	}, [eventList]);

	// Siderbar functions and variables
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
				<SideBar open={openDrawer} onClose={handleDrawerClose}></SideBar>
			</div>
			{/* Calendar */}
			<Paper>
				<Scheduler data={eventList}>
				<ViewState 
					defaultCurrentViewName="Month"
				/>
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
