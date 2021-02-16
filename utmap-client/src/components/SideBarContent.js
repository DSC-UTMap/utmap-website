import React, {useState, useCallback} from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import SearchBar from './SearchBar';
import EventList from './EventList';


function SideBarContent({events}) {
	//const [searchTerm, setSearchTerm] = useState('');
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
		console.table(filteredEvents);
	},[sortedEvents]);

	return (
		<List>
			{/* Filter search bar section */}
			<ListItem>
				<h3>Search</h3>
			</ListItem>
			<ListItem>
				<SearchBar filterEvents={filterEvents}/>
			</ListItem>
			{/* Event list section */}
			<ListItem>
				<h3>Upcoming Events</h3>
			</ListItem>
			<EventList events={eventList}/>
		</List>
	);
}

export default SideBarContent;