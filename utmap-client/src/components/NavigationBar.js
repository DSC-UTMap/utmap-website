import React from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import CalendarPage from './pages/CalendarPage';
import MapPage from './pages/MapPage';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';


function NavigationBar() {
	return (
		<>
			<Button variant='outlined'>
				<LocationOnIcon />
			</Button>
			<Button variant='outlined'>
				<EventIcon />
			</Button>
			<Button variant='outlined'>
				About
			</Button>
		</>
	);
}

export default NavigationBar;