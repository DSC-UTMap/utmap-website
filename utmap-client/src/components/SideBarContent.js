import React, {useState, useCallback, useEffect} from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import SearchBar from './SearchBar';
import EventList from './EventList';
import NavigationBar from './NavigationBar';


function SideBarContent({events}) {	
	const [eventList, setEventList] = useState(events);

	const filterEvents = useCallback((searchTerm) => {
		const filteredEvents = events.filter(event => {
			const lowerCaseTags = event.tags.map(tag => tag.toLowerCase());
			return (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			lowerCaseTags.includes(searchTerm.toLowerCase()));
		});
		setEventList(filteredEvents);
	},[events]);

	useEffect(() => {
		setEventList(events);
	}, [events]);

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
			<ListItem>
				<Typography variant="h5">Upcoming Events</Typography>
			</ListItem>
			<EventList eventList={eventList}/>
			<Divider/>
			<ListItem>
				<NavigationBar/>
			</ListItem>
		</List>
	);
}

export default SideBarContent;