import React from "react";
import {Link, useLocation} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import { makeStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

const useStyles = makeStyles((theme) => ({
  normal : {
		background: 'white'
	},
	highlight : {
		background: indigo[100],
		'&:hover': {
			background: indigo[100],
		}
	},
}));


function NavigationBar() {
	const style = useStyles();
	const path = useLocation().pathname;

	return (
		<div style={{width:'100%'}}>
			<Button 
				className={path === '/map' ? style.highlight : style.normal} 
				variant='outlined' component={Link} to='/map'
			>
				<LocationOnIcon />
			</Button>
			<Button 
				className={path === '/calendar' ? style.highlight : style.normal} 
				variant='outlined' component={Link} to='/calendar'
			>
				<EventIcon />
			</Button>
			<Button variant='outlined' style={{float:'right'}} component={Link} to='/'>
				About
			</Button>
		</div>
	);
}

export default NavigationBar;