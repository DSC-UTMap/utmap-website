import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SideBar from "./SideBar";
import clsx from 'clsx';
import exampleEvents from '../data/EventData'; //Temporary dummy data
import Map from '../Map.js'
import {getAllEvents} from '../../requests';


const useStyles = makeStyles(theme => ({
    hide: {
      display: 'none',
    },
  }));


const convertEvent = event => { //Server => Calendar
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
			//Note: calendarEvents has its own useEffect to update
		});
	}, []);

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
      <Map events={eventsList}/>
    </>
  )
}

export default MapPage;
