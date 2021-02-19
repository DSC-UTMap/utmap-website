import React from "react";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import CalendarPage from './pages/CalendarPage';
import MapPage from './pages/MapPage';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';


function NavigationBar() {
	return (
		<div style={{width:'100%'}}>
			<Button variant='outlined'>
				<LocationOnIcon />
			</Button>
			<Button variant='outlined'>
				<EventIcon />
			</Button>
			<Button variant='outlined' style={{float:'right'}}>
				About
			</Button>
		</div>
	);
}

export default NavigationBar;