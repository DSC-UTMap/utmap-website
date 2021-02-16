import React from "react";
import ListItem from '@material-ui/core/ListItem';

function EventList({events}) {
	return (
		<>
			{events.map((event) => {
				return <SingleEvent event={event}/>
			})}
		</>
	);
}

//temp component
function SingleEvent({event}) {
	return (
		<ListItem variant='outlined'>
			<h5>{event.title}</h5>
			<br/>
			<p>{event.startDate} to {event.endDate}</p>
		</ListItem>
	);
}

export default EventList;