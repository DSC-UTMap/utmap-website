import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideBar from "./SideBar";
import clsx from 'clsx';
import Map from '../Map.js'
import {getAllEvents} from '../../requests';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    hide: {
      display: 'none',
    },
    centerBox: {
      height: '50em', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }));

const convertEvent = event => { //Server => Map
  return {
    _id: event._id,
    title: event.name,
    organizer: event.organizer,
    startDate: event.startTime,
    endDate: event.endTime,
    location: event.building.name,
    sublocation: event.room,
    description: event.description
  };
};

const sortEvents = (events) => {
	events.sort((a, b) => {
		//sort by startDate, earliest to latest
		return (Date.parse(a.startDate) < Date.parse(b.startDate)) ? -1 : 1; 
	});
	return events; //Kind of wacky to return an array that was sorted in place
};

function MapPage() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [eventsList, setEventsList] = useState([]);
  const [gotEvents, setGotEvents] = useState(false);
  const [openSnackBar500, setOpenSnackBar500] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
		getAllEvents().then(events => {
			const tempEvents = events.map(convertEvent); //temp fix
			setEventsList(sortEvents(tempEvents));
      setGotEvents(true);
		}, err => handleOpenSnackBar500());
	}, []);

  const handleOpenSnackBar500 = () => {
		setOpenSnackBar500(true);
	};
	
	const handleCloseSnackBar500 = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpenSnackBar500(false);
	};
  
  return (
    <>
      {/* Siderbar */}
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
        <SideBar open={openDrawer} onClose={handleDrawerClose} events={eventsList}/>
      </div>

      {/* Map */}
      {(gotEvents && <Map events={eventsList}/>) || <div className={classes.centerBox}> <CircularProgress />  </div>}
      
      <Snackbar open={openSnackBar500} autoHideDuration={3000} onClose={handleCloseSnackBar500}>
        <Alert elevation={6} variant="filled"  onClose={handleCloseSnackBar500} severity="error">
					500 ERROR: Try again later!
				</Alert>
      </Snackbar>
    </>
  )
}

export default MapPage;
