import React, {useState, useCallback} from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SearchBar from './SearchBar';
import EventList from './EventList';
import NavigationBar from './NavigationBar';

function SideBarContent({events}) {
	const sortedEvents = events.sort((a, b) => {
		//sort by startDate, earliest to latest
		return (Date.parse(a.startDate) < Date.parse(b.startDate)) ? -1 : 1; 
	});
	
	const [eventList, setEventList] = useState(sortedEvents);

	const filterEvents = useCallback((searchTerm) => {
		const filteredEvents = sortedEvents.filter(event => 
			event.title.toLowerCase().includes(searchTerm)
		);
		setEventList(filteredEvents);
	},[sortedEvents]);

	return (
		<List>
			{/* Filter search bar section */}
			<ListItem>
				<Typography variant='h5'>Search</Typography>
			</ListItem>
			<ListItem>
				<SearchBar filterEvents={filterEvents}/>
			</ListItem>
			{/* Event list section */}
			<EventList eventList={eventList}/>
			<Divider/>
			<ListItem>
				<NavigationBar/>
			</ListItem>
		</List>
	);
}

export default SideBarContent;